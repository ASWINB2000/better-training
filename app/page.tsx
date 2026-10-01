import Link from "next/link";
import { Award, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react";
import Hero from "@/components/marketing/Hero";
import { CourseList, WorkshopList } from "@/components/site/ServiceList";
import { CTABand } from "@/components/site/CTABand";
import { courses, features, philosophy, workshops } from "@/lib/content";

const featureIcons: Record<string, LucideIcon> = {
  Map: Award,
  Users: GraduationCap,
  MessageCircle: Stethoscope,
};

export default function Home() {
  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f) => {
            const Icon = featureIcons[f.icon];
            return (
              <div key={f.title}>
                <Icon className="w-7 h-7 text-red-800" aria-hidden="true" />
                <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900">
                  {f.title}
                </h2>
                <p className="mt-2 text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              Courses
            </h2>
            <Link href="/courses" className="link-underline font-semibold text-red-800">
              View all {courses.length} courses
            </Link>
          </div>
          <CourseList items={courses.slice(0, 4)} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
              Workshops
            </h2>
            <Link href="/workshops" className="link-underline font-semibold text-red-800">
              View all {workshops.length} workshops
            </Link>
          </div>
          <WorkshopList items={workshops.slice(0, 3)} />
        </div>
      </section>

      <section className="bg-slate-950 text-white py-20 lg:py-28">
        <figure className="max-w-4xl mx-auto px-6 lg:px-10">
          <blockquote className="font-display text-3xl md:text-5xl font-semibold leading-tight text-balance">
            {philosophy.quote}
          </blockquote>
          <figcaption className="mt-8 text-slate-400">
            The teaching philosophy behind every Better Training class.{" "}
            <Link href="/about" className="text-white underline underline-offset-4">
              About us
            </Link>
          </figcaption>
        </figure>
      </section>

      <CTABand />
    </>
  );
}
