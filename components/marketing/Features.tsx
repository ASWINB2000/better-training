import { Map, MessageCircle, Users } from "lucide-react";
import { features, stats } from "@/lib/mock";
import type { FeatureIcon } from "@/lib/types";

const iconMap: Record<FeatureIcon, typeof Map> = {
  Map,
  Users,
  MessageCircle,
};

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-red-800 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Why choose us
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
            Training that actually sticks.
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Every course we run is designed around real workplace scenarios,
            small group practice and clinicians who&apos;ve done the job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <div
                key={i}
                className="card-lift group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)]"
              >
                <div className="absolute top-8 right-8 text-6xl font-display font-bold text-slate-100 group-hover:text-red-50 transition-colors">
                  0{i + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-800 grid place-items-center shadow-lg shadow-red-500/25 mb-6 relative">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 relative">
                  {f.title}
                </h3>
                <p className="text-slate-600 leading-relaxed relative">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-100 pt-14">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl lg:text-5xl font-bold text-red-800">
                {s.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-slate-500 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
