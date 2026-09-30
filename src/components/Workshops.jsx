import { ArrowUpRight, Clock } from "lucide-react";
import { workshops } from "../mock";

const Workshops = () => {
  return (
    <section id="workshops" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-red-800 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Specialist Workshops
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              Skill-building for carers & clinicians.
            </h2>
          </div>
          <p className="text-slate-600 md:max-w-md">
            Focused half-day workshops built for aged care, disability and
            community support workers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w, i) => (
            <a
              key={w.id}
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("book")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="card-lift group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> {w.duration}
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {w.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                <div className="mt-4 text-red-800 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book Workshop
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
