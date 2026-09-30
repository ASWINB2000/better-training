import Image from "next/image";
import { ArrowRight, Award, Clock, ShieldCheck } from "lucide-react";
import { ScrollLink } from "@/components/marketing/ScrollLink";

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-red-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-rose-100/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-900 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4" />
            Nationally Accredited RTO
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-slate-900">
            First Aid & Emergency Training,{" "}
            <span className="text-red-800">Delivered by Clinicians.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            Learn from healthcare professionals with 20+ years of front-line
            experience. Small groups, real scenarios, same-day certification.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ScrollLink
              targetId="book"
              className="bg-red-700 hover:bg-red-800 text-white rounded-full px-7 py-6 text-base group"
            >
              Book a Course
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </ScrollLink>
            <ScrollLink
              targetId="courses"
              variant="outline"
              className="border-slate-300 hover:border-red-700 hover:text-red-800 rounded-full px-7 py-6 text-base bg-white/70"
            >
              Explore Courses
            </ScrollLink>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { icon: Award, text: "Nationally Recognised" },
              { icon: Clock, text: "Same-day Certificate" },
              { icon: ShieldCheck, text: "Small Class Sizes" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                <f.icon className="w-4 h-4 text-red-700" />
                <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-950/10 aspect-[4/5] max-w-md ml-auto">
            <Image
              src="https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6"
              alt="CPR training class"
              fill
              sizes="(min-width: 1024px) 448px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>

          <div className="hidden md:block absolute -left-8 bottom-10 bg-white rounded-2xl shadow-xl p-5 w-64 border border-slate-100">
            <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
              Next Available
            </div>
            <div className="font-display text-xl font-bold text-slate-900">
              Provide First Aid
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Sat, 9:00 AM · Brisbane CBD
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-red-800 font-bold">$129</span>
              <span className="text-xs bg-red-50 text-red-800 px-2 py-1 rounded-full font-medium">
                4 seats left
              </span>
            </div>
          </div>

          <div className="hidden md:flex absolute -right-4 top-10 bg-white rounded-2xl shadow-xl px-4 py-3 border border-slate-100 items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 grid place-items-center">
              <ShieldCheck className="w-5 h-5 text-red-800" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">98% Pass Rate</div>
              <div className="text-xs text-slate-500">Since 2010</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
