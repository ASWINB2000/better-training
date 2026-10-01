import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  CalendarClock,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Stethoscope,
  Users,
} from "lucide-react";
import { PullQuote } from "@/components/site/PullQuote";
import { CTABand } from "@/components/site/CTABand";
import { audiences, classSteps, faqs, siteInfo, unitCodes } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Better Training was founded by a registered nurse and is taught by healthcare professionals in Salisbury, Brisbane. See how our classes work, who we train and the courses we deliver.",
};

const trust = [
  { icon: Award, title: "Nationally recognised", text: "Courses built around practical skills and industry knowledge" },
  { icon: Stethoscope, title: "20+ years in healthcare", text: "Trainers with post-graduate qualifications" },
  { icon: Users, title: "Small groups", text: "Individual attention in every session" },
  { icon: CalendarClock, title: "Open 7 days", text: "Late sessions Tuesday to Thursday" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const h2 = "font-display text-3xl md:text-4xl font-bold text-slate-900 text-balance";

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Intro */}
      <header className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-end">
          <div className="pb-4 lg:self-start lg:pb-0 lg:pt-2">
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.06] text-slate-900 text-balance">
              Founded by a registered nurse. <span className="text-red-800">Taught by healthcare professionals.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              Better Training exists to give every student a safe and comforting place to learn
              first aid, so they walk out confident in the skills they have practised.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center h-14 px-8 rounded-full bg-red-800 hover:bg-red-900 text-white font-semibold transition-colors"
              >
                Book today
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center h-14 px-8 rounded-full border border-slate-300 bg-white font-semibold text-slate-800 hover:border-red-700 hover:text-red-800 transition-colors"
              >
                See courses
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[5/6] w-full max-w-sm overflow-hidden rounded-t-[10rem] bg-rose-100 lg:max-w-none">
            <Image
              src="/images/about-first-aid.jpg"
              alt="An instructor and children practising rescue breathing on a manikin in a first aid class"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={90}
              className="object-cover object-[60%_50%]"
            />
          </div>
        </div>
      </header>

      {/* Trust strip */}
      <section aria-label="At a glance" className="border-y border-slate-200 bg-white">
        <ul className="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {trust.map((t) => (
            <li key={t.title} className="flex gap-4 py-6 sm:px-6 first:pl-0 last:pr-0">
              <t.icon className="h-7 w-7 shrink-0 text-red-800" aria-hidden="true" />
              <div>
                <div className="font-display text-lg font-semibold text-slate-900">{t.title}</div>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20">
        <h2 className={h2}>Why Better Training exists</h2>
        <div className="space-y-5 text-lg text-slate-700 leading-relaxed max-w-2xl">
          <p>
            Better Training was established by a passionate registered nurse to provide first aid
            training. The goal is simple: a safe and comforting environment where every student
            can be trained through knowledge and skills.
          </p>
          <p>
            All of our trainers are highly professional people with many years of experience in the
            health sector. They teach the way they work: calmly, practically, and with real
            scenarios you are likely to meet.
          </p>
          <p>
            That is why classes are small and hands-on. You practise on manikins and equipment,
            get feedback while you do it, and leave knowing you can act.
          </p>
        </div>
      </section>

      {/* How a class works */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className={h2}>How a class works</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            From booking to renewal, here is what to expect.
          </p>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {classSteps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-800 font-display text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  {i < classSteps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-slate-300 lg:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we train */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <h2 className={h2}>Who we train</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {audiences.map((a) => (
            <li key={a.title}>
              <Link
                href={a.href}
                className="card-lift group flex h-full items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-7"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-slate-900 group-hover:text-red-800 transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{a.body}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-400 group-hover:text-red-800 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Units */}
      <section className="bg-slate-950 py-16 lg:py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">
              The courses we deliver, by unit code
            </h2>
            <p className="mt-4 max-w-md text-slate-300 leading-relaxed">
              Each of these courses has a published unit or course code, so you can look up
              exactly what you are being trained and assessed on.
            </p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {unitCodes.map((u) => (
              <li key={u.code}>
                <Link
                  href={u.href}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 hover:bg-white/5 -mx-3 px-3 rounded-lg transition-colors"
                >
                  <span className="w-28 shrink-0 font-display text-lg font-semibold text-red-300">{u.code}</span>
                  <span className="flex-1 text-slate-100">{u.title}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 lg:py-28">
        <PullQuote
          tone="light"
          caption="The Better Training teaching philosophy"
        >
          If you teach a student, they may forget. If you show them a skill, they may remember.
          But if you involve them in the learning process, they will understand forever.
        </PullQuote>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <h2 className={h2}>Questions people ask before booking</h2>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-red-800 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className={h2}>Visit us in Salisbury</h2>
          <ul className="mt-8 space-y-5 text-lg">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-800" aria-hidden="true" />
              <address className="not-italic text-slate-800">{siteInfo.address}</address>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-red-800" aria-hidden="true" />
              <a href={siteInfo.phoneHref} className="font-semibold text-slate-800 hover:text-red-800">
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-red-800" aria-hidden="true" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-slate-800">
                {siteInfo.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt>{h.days}</dt>
                    <dd className="font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
        </div>
        <iframe
          title="Map of Better Training, Salisbury"
          src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.mapQuery)}&output=embed`}
          className="h-80 w-full rounded-2xl border border-slate-200"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <CTABand />
    </>
  );
}
