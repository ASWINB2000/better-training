import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { PullQuote } from "@/components/site/PullQuote";
import { CTABand } from "@/components/site/CTABand";
import { features, philosophy, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Better Training was founded by a registered nurse to give every student a safe, comforting place to learn first aid.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Who we are"
        intro="Better Training is a first aid training organisation founded by a registered nurse."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-2 gap-14">
        <div className="space-y-5 text-lg text-slate-700 leading-relaxed max-w-xl">
          <p>
            We built Better Training around a safe and comforting environment where every
            student can be trained, and where confidence in new skills grows as fast as the
            skills themselves.
          </p>
          <p>
            Our instructors bring extensive healthcare sector experience to every session,
            from first aid and CPR to the specialist clinical workshops care workers ask for
            most.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-6 self-start">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-5xl font-bold text-red-800">{s.value}</dt>
              <dd className="mt-2 text-sm text-slate-600">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
            What you get
          </h2>
          <ul className="mt-8 grid md:grid-cols-3 gap-10">
            {features.map((f) => (
              <li key={f.title}>
                <h3 className="font-display text-xl font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <PullQuote
          tone="light"
          caption="All of the trainers at Better Training are highly skilled professionals with many years of experience."
        >
          {philosophy.quote}
        </PullQuote>
      </section>

      <CTABand />
    </>
  );
}
