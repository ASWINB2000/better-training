import Link from "next/link";
import { Phone } from "lucide-react";
import { siteInfo } from "@/lib/content";

export function CTABand({
  title = "Ready to train with us?",
  text = "Book online, or call and talk to a real person about the right course for you or your team.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-red-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">{title}</h2>
          <p className="mt-3 text-red-50/90">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book"
            className="inline-flex items-center h-12 px-7 rounded-full bg-white text-red-900 font-semibold hover:bg-red-50 transition-colors"
          >
            Book now
          </Link>
          <a
            href={siteInfo.phoneHref}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/50 font-semibold hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" /> {siteInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
