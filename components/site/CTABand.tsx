import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteInfo } from "@/lib/content";

const steps = ["Choose a service", "Pick a date and time", "Add your details", "Confirm"];

export function CTABand({
  title = "Ready to train with us?",
  text = "Book your course in 60 seconds.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-red-800 text-white">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:items-center">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-balance">{title}</h2>
          <p className="mt-3 font-display text-2xl md:text-3xl font-semibold text-red-100">
            {text}
          </p>
          <ol className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-red-50">
            {steps.map((label, i) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 text-xs font-bold ring-1 ring-white/30">
                  {i + 1}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch lg:max-w-xs lg:ml-auto lg:w-full">
          <Link
            href="/book"
            className="group inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white text-red-900 font-semibold shadow-lg shadow-red-950/20 hover:bg-red-50 transition-colors"
          >
            Book now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={siteInfo.phoneHref}
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/50 font-semibold hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" /> {siteInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
