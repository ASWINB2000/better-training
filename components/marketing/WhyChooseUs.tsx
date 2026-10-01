import { Award, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react";
import { features, stats } from "@/lib/content";
import type { FeatureIcon } from "@/lib/types";

const iconMap: Record<FeatureIcon, LucideIcon> = {
  Map: Award,
  Users: GraduationCap,
  MessageCircle: Stethoscope,
};

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-rose-100/50 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-800">
            Why choose us
          </div>
          <h2 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            Training that actually sticks.
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Every course we run is built around real workplace scenarios, small group
            practice and trainers who have done the job.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <div
                key={f.title}
                className="card-lift group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)]"
              >
                <div className="absolute right-6 top-4 font-display text-7xl font-bold text-slate-100 transition-colors group-hover:text-red-50">
                  0{i + 1}
                </div>
                <div className="relative mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-red-500 to-red-800 shadow-lg shadow-red-500/25">
                  <Icon className="h-7 w-7 text-white" strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="relative mb-3 font-display text-2xl font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="relative leading-relaxed text-slate-600">{f.desc}</p>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-red-500 to-red-800 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-slate-100 pt-12 text-center sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-5xl font-bold text-red-800">{s.value}</dt>
              <dd className="mt-2 text-sm text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default WhyChooseUs;
