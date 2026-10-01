import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ChevronLeft, Phone } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { CTABand } from "./CTABand";
import { siteInfo } from "@/lib/content";

export interface Fact {
  label: string;
  value: string;
}

export function DetailLayout({
  backHref,
  backLabel,
  title,
  intro,
  image,
  facts,
  price,
  bookHref,
  sections,
  outcomesTitle,
  outcomes,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  intro: string;
  image: string;
  facts: Fact[];
  price?: string;
  bookHref: string;
  sections: { title: string; body: ReactNode }[];
  outcomesTitle: string;
  outcomes: string[];
}) {
  return (
    <>
      <PageHeader title={title} intro={intro}>
        <Link
          href={backHref}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> {backLabel}
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-14 lg:pt-10 lg:pb-20 grid lg:grid-cols-[1fr_22rem] gap-14">
        <div className="space-y-12 max-w-2xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 1024px) 672px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900">
              {outcomesTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-slate-700 leading-relaxed">
                  <Check className="w-5 h-5 mt-0.5 text-red-700 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </section>
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900">
                {s.title}
              </h2>
              <div className="mt-4 text-slate-700 leading-relaxed">{s.body}</div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 self-start rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          {price && (
            <div className="font-display text-4xl font-bold text-red-800">{price}</div>
          )}
          <dl className="mt-5 divide-y divide-slate-100 text-sm">
            {facts.map((f) => (
              <div key={f.label} className="py-3">
                <dt className="text-slate-500">{f.label}</dt>
                <dd className="mt-0.5 font-medium text-slate-900">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={bookHref}
            className="mt-4 flex items-center justify-center h-12 rounded-full bg-red-800 hover:bg-red-900 text-white font-semibold transition-colors"
          >
            Book now
          </Link>
          <a
            href={siteInfo.phoneHref}
            className="mt-3 flex items-center justify-center gap-2 h-12 rounded-full border border-slate-300 text-slate-800 font-semibold hover:border-red-700 hover:text-red-800 transition-colors"
          >
            <Phone className="w-4 h-4" /> {siteInfo.phone}
          </a>
        </aside>
      </div>
      <CTABand />
    </>
  );
}
