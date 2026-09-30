import Image from "next/image";
import { ArrowRight, Award, Check, Clock } from "lucide-react";
import { courses } from "@/lib/mock";
import { ScrollLink } from "@/components/marketing/ScrollLink";

const Courses = () => {
  return (
    <section id="courses" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-red-800 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Nationally Recognised Courses
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              First Aid & CPR Certification
            </h2>
          </div>
          <p className="text-slate-600 md:max-w-md">
            Same-day certification, hands-on practice and small classes led by
            practising clinicians.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div
              key={c.id}
              className="card-lift bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_30px_-15px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-red-700" />
                  {c.code}
                </div>
                <div className="absolute top-4 right-4 bg-red-700 text-white font-display font-bold text-xl px-4 py-2 rounded-full shadow-lg">
                  ${c.price}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {c.duration}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>In-person · Brisbane</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {c.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {c.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-red-700 mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ScrollLink
                  targetId="book"
                  className="mt-7 self-start bg-slate-900 hover:bg-red-800 text-white rounded-full px-6 group"
                >
                  Book This Course
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </ScrollLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
