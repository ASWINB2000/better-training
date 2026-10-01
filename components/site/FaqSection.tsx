import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

/** Native <details> accordion (works without JS) with FAQPage structured data. */
export function FaqSection({
  title = "Frequently asked questions",
  items,
  tone = "light",
}: {
  title?: string;
  items: Faq[];
  tone?: "light" | "muted";
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className={tone === "muted" ? "bg-slate-50 py-16 lg:py-24" : "py-16 lg:py-24"}>
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {items.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold text-slate-900 transition-colors hover:text-red-800 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-5 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
