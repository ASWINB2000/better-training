# Website Bucket List

Ideas to improve how the site looks and works. Nothing here is committed work. Pick items up when needed.

Suggested starting order: **#1 (real contact form), #3 (analytics), #5 (OG images)**. They are small and protect leads.

Status key: `[ ]` not started, `[x]` done.

## Function (highest impact)

- [ ] **1. Real contact form delivery**
  - Today `components/marketing/ContactForm.tsx` uses a `mailto:` link, which fails for visitors without a mail client and loses leads silently.
  - Replace with a Next.js server action or API route using Resend, Postmark, or Formspree.
  - Include a spam honeypot, a success/error message, and an email notification to the business.

- [ ] **2. Real booking flow**
  - `/book` appears to only collect interest.
  - Options: embed Calendly or Cal.com; add real course dates with seats remaining; take a payment or deposit via Stripe.

- [ ] **3. Analytics**
  - Plausible, Vercel Analytics, or GA4 to see which courses get views and where visitors drop off.
  - Add a cookie notice if the chosen tool needs one.

- [ ] **4. Local SEO and structured data**
  - Add `LocalBusiness` and `Course` JSON-LD on each course page. About already has JSON-LD, so extend that pattern.
  - Set up and link a Google Business Profile (Brisbane local search).

- [ ] **5. Open Graph images**
  - Add `opengraph-image.tsx` (per course where possible) so links shared on WhatsApp, Facebook and LinkedIn show a preview card.

## Look and feel

- [ ] **6. Testimonials / Google reviews** — rotating carousel with star ratings and real names.
- [ ] **7. Course filter and search** on `/courses` — by category, duration, price.
- [ ] **8. Sticky mobile "Book now" bar** and a floating WhatsApp / call button.
- [ ] **9. FAQ accordion** on course pages and home (fewer enquiry emails, better SEO).
- [ ] **10. Subtle scroll animations** — fade/slide in, stat count-up. Respect `prefers-reduced-motion`.
- [ ] **11. Small extras**
  - Training photo gallery
  - Downloadable course brochure PDF
  - Newsletter signup
  - Cookie notice (if analytics added)

## Quality checks

- [ ] Run a Lighthouse audit (performance, accessibility, SEO). Watch LCP on image-heavy pages.
- [ ] Check colour contrast on red buttons and keyboard focus states.
