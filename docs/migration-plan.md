# Better Training — Next.js Migration & Bookings/Payments Platform Plan

**Status:** Draft for implementation
**Audience:** Engineer picking up this work
**Goal:** Migrate the current CRA marketing site to a fast, stable Next.js app, then extend it into a platform where customers can create an account, purchase a course, and watch its video content — with payments handled by Stripe.

---

## 1. Current State

The site currently lives at `better-training/` as a **Create React App** project (client-rendered SPA, no backend, no database). It was reconstructed from a live emergent.sh deployment, so it is functionally complete as a marketing site but has zero backend capability.

**Stack today:**
- React 18 + `react-scripts` (CRA) — **deprecated by the React team since 2023, no further updates**. This alone is reason enough to move off it regardless of the bookings feature.
- React Router v6 (client-side routing only)
- Tailwind CSS 3 + shadcn/ui component pattern (Radix UI primitives + `class-variance-authority` + `clsx` + `tailwind-merge`)
- `@tanstack/react-query` (installed, lightly used)
- `lucide-react` icons, `react-day-picker` for the booking date picker
- All content (courses, workshops, testimonials, contact info) is hardcoded in `src/mock.js` — no CMS, no DB, no API

**File map (for migration reference):**
```
src/
  App.js, App.css, index.js, index.css
  pages/Home.jsx
  components/
    Navbar.jsx, Hero.jsx, Features.jsx, Courses.jsx,
    Workshops.jsx, Testimonials.jsx, BookingSection.jsx, Footer.jsx
    ui/  (button, calendar, input, label, popover, select, textarea, toast, toaster)
  hooks/use-toast.js
  lib/utils.js
  mock.js   ← all course/workshop/testimonial content lives here today
```

**What's missing entirely today:** user accounts, a database, any server-side code, payments, video hosting/delivery, order/entitlement tracking.

---

## 2. Target Architecture

**Framework:** Next.js 15+ (App Router), TypeScript.

### Why Next.js specifically (not just "replace CRA with Vite")

The moment this site needs accounts + paid content + payments, it needs a backend no matter what frontend framework is chosen. The real decision is "one codebase with server + client colocated" vs. "SPA + separate API service." For a small team/single-repo project, Next.js wins here because:

- **Route Handlers** (`app/api/**/route.ts`) give us server endpoints (Stripe webhook receiver, checkout session creation, video URL signing) in the same repo/deploy as the frontend — no second service to run, deploy, or CORS-configure.
- **Middleware** can gate `/account/*` and `/courses/[slug]/watch` routes before they even render, redirecting unauthenticated or unentitled users.
- **Server Components + SSR/SSG** give the public marketing pages (home, course listing pages) real HTML on first response — better SEO and faster first paint than CRA's client-only render, which matters for a business that wants to show up in Google search for "first aid training Brisbane" type queries.
- Deploys cleanly to **Vercel** (zero-config for this stack) or any Node host if self-hosting is preferred later.

**Tradeoff to flag honestly:** Next.js has a steeper mental model than plain CRA (Server vs. Client Components, where code runs, App Router file conventions). Budget ramp-up time if whoever implements this hasn't used App Router before.

### Supporting stack decisions

| Concern | Choice | Why |
|---|---|---|
| Language | TypeScript | Payments/entitlement code is exactly the kind of logic where a typo-class bug (wrong price ID, unchecked `undefined`) costs real money. Worth the migration cost. |
| Styling | Keep Tailwind + shadcn/ui | Already in place, ports almost 1:1, no reason to change. |
| Database | Postgres (via **Supabase** or **Neon**) | Relational data (users, courses, orders, entitlements) fits relational modeling well; both have generous free tiers and Prisma support. Supabase additionally offers auth/storage if we want fewer moving parts (see below). |
| ORM | **Prisma** | Type-safe queries matching the TS choice, easy migrations, good Next.js docs/examples. |
| Auth | **Auth.js (NextAuth) v5** | First-party Next.js integration, supports both OAuth (Google) and email/password or magic-link, works with the Prisma adapter, session via JWT or DB-backed sessions. Alternative: if the team wants less to self-host, **Supabase Auth** or **Clerk** are both solid managed options — see Open Decisions (§8). |
| Payments | **Stripe Checkout** (hosted page) + webhooks | Industry-standard, PCI scope stays off our servers (Stripe hosts the card form), well-documented Next.js patterns. |
| Video hosting/delivery | **Mux** (or Cloudflare Stream as a cheaper alternative) | Do **not** self-host video files. Both handle transcoding/adaptive bitrate and issue **signed, time-limited playback URLs/tokens**, which is exactly the access-control primitive we need to gate a paid course video. |
| Hosting | **Vercel** | Native fit for Next.js (ISR, edge middleware, image optimization all work out of the box). |
| Error/monitoring | **Sentry** | Catch payment/webhook failures in production, not just build-time. |

---

## 3. Data Model

Minimum schema to support: accounts, course catalog, purchases, video entitlement.

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  createdAt     DateTime @default(now())
  purchases     Purchase[]
  accounts      Account[]   // Auth.js OAuth accounts
  sessions      Session[]   // Auth.js sessions
}

model Course {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  description  String
  priceCents    Int
  currency     String   @default("aud")
  stripePriceId String  // Stripe Price object for this course
  published    Boolean  @default(false)
  modules      Module[]
  purchases    Purchase[]
}

model Module {
  id          String  @id @default(cuid())
  courseId    String
  course      Course  @relation(fields: [courseId], references: [id])
  title       String
  order       Int
  muxAssetId  String   // Mux asset backing this lesson's video
  muxPlaybackId String  // Mux playback ID used to request a signed URL
  durationSec Int?
}

model Purchase {
  id                String   @id @default(cuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id])
  courseId          String
  course            Course   @relation(fields: [courseId], references: [id])
  stripeCheckoutId  String   @unique
  stripePaymentId   String?
  status            PurchaseStatus @default(PENDING)
  createdAt         DateTime @default(now())
}

enum PurchaseStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

`Purchase.status` is the entitlement source of truth: a user can watch `Module` videos for a `Course` only if a `Purchase` row exists with `status = PAID` for that `userId` + `courseId`. Never trust client-side state for this check — always re-verify server-side on every video URL request (see §5.4).

---

## 4. Target Folder Structure

```
app/
  layout.tsx                     # root layout (fonts, providers)
  page.tsx                       # home page (was pages/Home.jsx)
  courses/
    page.tsx                     # course catalog listing
    [slug]/
      page.tsx                   # public course detail/sales page
      watch/
        page.tsx                 # gated video player — middleware-protected
  account/
    page.tsx                     # "my courses" / purchase history
  checkout/
    success/page.tsx
    cancel/page.tsx
  api/
    auth/[...nextauth]/route.ts  # Auth.js handler
    checkout/route.ts            # POST — creates Stripe Checkout Session
    webhooks/stripe/route.ts     # POST — Stripe webhook receiver
    video/[moduleId]/route.ts    # GET — issues signed Mux playback token (entitlement-checked)
  middleware.ts                  # protects /account/* and /courses/*/watch

components/
  marketing/                     # Navbar, Hero, Features, Testimonials, Footer — ported ~1:1 from src/components
  courses/                       # Courses.jsx, Workshops.jsx → catalog cards, now DB-driven
  booking/                       # BookingSection.jsx → checkout entry point
  ui/                            # shadcn components — port unchanged
  player/                        # new: video player wrapper (Mux Player)

lib/
  prisma.ts                      # Prisma client singleton
  auth.ts                        # Auth.js config
  stripe.ts                      # Stripe client singleton
  mux.ts                         # Mux client + signed URL helper
  entitlements.ts                # hasAccess(userId, courseId) helper — single source of truth

prisma/
  schema.prisma
  migrations/
```

---

## 5. Migration Phases

Do these roughly in order; each phase should be a separate PR and independently deployable/verifiable.

### Phase 0 — Project setup
1. Scaffold a new Next.js 15 (App Router, TypeScript, Tailwind) app — either as a fresh `next` app in a new branch, or in-place per Vercel's official CRA→Next.js codemod guide.
2. Port `tailwind.config.js` theme tokens (already shadcn-flavored) and global CSS (`App.css`/`index.css` → `app/globals.css`) as-is.
3. Set up ESLint/Prettier, and CI (GitHub Actions: lint + build on every PR).

### Phase 1 — Port the static marketing site (no new features yet)
1. Move each component from `src/components/*.jsx` into `components/marketing/*.tsx`, converting to TypeScript (add prop types) but keeping markup/classNames/copy identical.
2. Rebuild `pages/Home.jsx` as `app/page.tsx`, composing the same components. This can be a Server Component since there's no client interactivity at the top level.
3. Anything using browser-only APIs or local state (the booking form's date picker, toasts, select dropdowns) gets a `"use client"` directive at the top of that specific component — keep the client boundary as low/small as possible, don't mark whole pages client-side.
4. Port all shadcn `components/ui/*` unchanged (they're framework-agnostic React).
5. **Goal check:** site is visually and functionally identical to today's CRA build, just on Next.js, with no DB/auth/payments yet. Deploy this to Vercel and diff against the live emergent.sh version.

### Phase 2 — Move content out of `mock.js` and into the database
1. Stand up Postgres (Supabase or Neon) + Prisma, apply the schema from §3.
2. Write a one-off seed script that takes the current `mock.js` content and inserts it as `Course`/`Module` rows (course metadata only for now — video assets don't exist yet, so `muxAssetId`/`muxPlaybackId` stay placeholder until Phase 4).
3. Course listing (`app/courses/page.tsx`) and course detail pages now fetch from Prisma instead of importing `mock.js`. Delete `mock.js` once nothing imports it.

### Phase 3 — Authentication
1. Add Auth.js v5, Prisma adapter, at least one OAuth provider (Google) plus email/magic-link if the business wants passwordless signup.
2. `app/account/page.tsx` — basic "my account" page, sign-in/out UI in the Navbar.
3. `middleware.ts` — redirect unauthenticated users away from `/account` and `/courses/*/watch`.

### Phase 4 — Video hosting
1. Create a Mux account, upload existing/produced course videos through the Mux dashboard or API, capture `muxAssetId`/`muxPlaybackId` per lesson, update the seeded `Module` rows.
2. Build `lib/mux.ts`: a helper that, given a `muxPlaybackId`, returns a **signed playback URL** with a short expiry (Mux supports signed URLs specifically for gated content — this is the mechanism that makes "paid users only" enforceable, not just UI-hidden).
3. Build the `player/` component using `@mux/mux-player-react`.

### Phase 5 — Payments & entitlements
1. Create Stripe `Product`/`Price` objects per course (or automate via a script from the `Course` table's `priceCents`), store `stripePriceId` on each `Course` row.
2. `app/api/checkout/route.ts` — authenticated POST that creates a Stripe Checkout Session (`mode: "payment"`) for the requested course, with `success_url`/`cancel_url` pointing at `app/checkout/success` and `/cancel`, and `metadata: { userId, courseId }` on the session so the webhook can attribute it.
3. `app/api/webhooks/stripe/route.ts` — receives `checkout.session.completed`, verifies the signature with `stripe.webhooks.constructEvent` using the **raw request body** (Next.js Route Handlers give you this directly — do not run the body through `.json()` before verification, or the signature check fails), then creates/updates the `Purchase` row to `status: PAID`.
   - This webhook endpoint is the **only** place that should ever mark a purchase as paid. Never set `PAID` from the client-side success-page redirect — that redirect is not proof of payment, it's just proof the browser was sent there. Users can hit `/checkout/success` without paying.
4. `lib/entitlements.ts` — `hasAccess(userId, courseId)` queries for a `PAID` `Purchase` row. Call this in `app/courses/[slug]/watch/page.tsx` (redirect to the sales page if false) **and** in `app/api/video/[moduleId]/route.ts` before ever issuing a signed Mux URL. Check it in both places — the page check is UX, the API check is the actual security boundary.
5. Local dev: use `stripe listen --forward-to localhost:3000/api/webhooks/stripe` (Stripe CLI) to test webhooks without deploying.

### Phase 6 — Polish, performance, stability
1. `app/courses/page.tsx` and course detail pages as static/ISR-revalidated where content doesn't change per-request (course catalog doesn't need to be dynamic per visitor).
2. `next/image` for all imagery (automatic optimization/lazy-loading) — replace any raw `<img>` carried over from the CRA port.
3. Metadata API (`generateMetadata`) for per-course SEO titles/descriptions/OG tags.
4. Sentry for error tracking (both client and the Route Handlers — a silently failing webhook is a customer who paid and got no access, so this matters more than typical error tracking).
5. Basic automated tests: unit tests for `entitlements.ts` and the webhook handler (the two places money/access logic lives), Playwright smoke test for the checkout flow using Stripe's test mode card numbers.

### Phase 7 — Cutover
1. Point DNS at the Vercel deployment once Phase 6 is verified in staging.
2. Decommission the emergent.sh preview deployment.

---

## 6. Security Checklist (non-negotiable before accepting real payments)

- [ ] Stripe webhook signature verified on every event (raw body, not parsed JSON)
- [ ] `Purchase.status = PAID` is set **only** by the webhook handler, never client-triggered
- [ ] Video signed URLs are short-lived and re-checked against `hasAccess()` server-side on every request — never cache "is entitled" client-side as the actual gate
- [ ] All Stripe/Mux/DB secrets live in environment variables, never committed, never exposed to the client bundle (only `NEXT_PUBLIC_*`-prefixed vars are client-visible in Next.js — audit that nothing sensitive accidentally gets that prefix)
- [ ] Rate-limit `app/api/checkout` to prevent abuse
- [ ] HTTPS-only cookies for session (Auth.js default, don't override)

---

## 7. Environment Variables (to provision before Phase 3+)

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_SIGNING_KEY_ID=
MUX_SIGNING_KEY_PRIVATE=
```

---

## 8. Open Decisions (need a call before Phase 3+)

1. **Auth provider:** Auth.js (self-hosted, more setup, no vendor lock-in/cost) vs. Clerk/Supabase Auth (managed, faster to ship, monthly cost at scale). Recommendation: Auth.js is fine for this scale unless the team wants to move faster and accept a managed-service bill.
2. **DB host:** Supabase vs. Neon vs. Vercel Postgres — any are fine; Supabase is worth a second look if we'd also want its Storage/Auth to reduce the number of services.
3. **Video host:** Mux vs. Cloudflare Stream — Mux has the more mature Next.js-specific tooling (`mux-player-react`, good signed-URL docs); Cloudflare Stream is typically cheaper at volume. Pick based on expected catalog size/viewer volume.
4. **Pricing model:** one-time purchase per course (as modeled in §3) vs. subscription access to all courses. This changes the Stripe integration mode (`payment` vs. `subscription`) and the entitlement model — confirm with the business before building Phase 5.
5. **Refund/access-revocation handling:** does a Stripe refund need to programmatically revoke video access? If yes, also handle the `charge.refunded` webhook event and flip `Purchase.status` to `REFUNDED`, and have `hasAccess()` check for that.

---

## 9. Rough Effort Estimate

| Phase | Effort |
|---|---|
| 0 — Setup | 0.5 day |
| 1 — Port marketing site | 2–3 days |
| 2 — DB + content migration | 1–2 days |
| 3 — Auth | 2 days |
| 4 — Video hosting | 2–3 days (plus time to actually produce/upload course videos, which is outside engineering scope) |
| 5 — Payments & entitlements | 3–4 days (this is the part to not rush — get the webhook/entitlement logic reviewed) |
| 6 — Polish/perf/monitoring/tests | 2–3 days |
| 7 — Cutover | 0.5 day |

**Total:** roughly 3–4 engineering weeks for one developer, excluding actual video production and legal/business setup for the payment account (Stripe account verification, refund policy, etc.).
