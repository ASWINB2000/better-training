import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { PulseLine } from "@/components/site/PulseLine";
import { siteInfo } from "@/lib/content";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1.35fr_1fr] gap-14 items-center">
        <div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-[4rem] xl:text-[4rem] font-bold leading-[1.06] text-slate-900 text-balance">
            First Aid &amp; Emergency Training,{" "}
            <span className="text-red-800">Delivered by Clinicians.</span>
          </h1>
          <PulseLine className="mt-6 max-w-md h-10" />
          <p className="mt-6 font-display text-2xl md:text-3xl font-semibold text-slate-800 max-w-xl text-balance">
            Learn first aid from people who do it for a living.
          </p>
          <p className="mt-4 text-lg text-slate-600 max-w-xl leading-relaxed">
            First aid and emergency training provided by healthcare professionals,
            in a safe and comforting room where every student can build confidence
            in their skills.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 h-14 px-8 rounded-full bg-red-800 hover:bg-red-900 text-white font-semibold transition-colors"
            >
              Book today
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center h-14 px-8 rounded-full border border-slate-300 bg-white font-semibold text-slate-800 hover:border-red-700 hover:text-red-800 transition-colors"
            >
              See courses
            </Link>
          </div>
          <a
            href={siteInfo.phoneHref}
            className="mt-6 inline-flex items-center gap-2 text-slate-700 hover:text-red-800 font-medium transition-colors"
          >
            <Phone className="w-4 h-4" /> Prefer to talk? Call {siteInfo.phone}
          </a>
        </div>

        <div className="relative max-w-md w-full lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-red-950/10">
            <Image
              src="https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?auto=format&fit=crop&w=900&q=75"
              alt="Students practising CPR on manikins in a training class"
              fill
              sizes="(min-width: 1024px) 448px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute -right-3 top-8 sm:-right-8 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-rose-100">
              <ShieldCheck className="h-5 w-5 text-red-800" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">98% Pass Rate</div>
              <div className="text-xs text-slate-500">Across our courses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
