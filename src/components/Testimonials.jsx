import { Quote, Star } from "lucide-react";
import { philosophy, testimonials } from "../mock";

const Testimonials = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-900 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {philosophy.map((p, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-10"
            >
              <Quote className="w-10 h-10 text-red-400 mb-6" />
              <p className="font-display text-2xl leading-relaxed text-white">
                {p.quote}
              </p>
              <div className="mt-6 text-red-300 text-xs font-semibold uppercase tracking-[0.2em]">
                — The Better Training Philosophy
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-red-300 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Learn from the best
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Trusted by carers across Brisbane.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-2xl shadow-red-950/30">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed">"{t.text}"</p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="font-display font-bold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
