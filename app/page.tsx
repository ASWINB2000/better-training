import Link from "next/link";
import Hero from "@/components/marketing/Hero";
import WhyChooseUs from "@/components/marketing/WhyChooseUs";
import { CourseList, WorkshopList } from "@/components/site/ServiceList";
import { PullQuote } from "@/components/site/PullQuote";
import { CTABand } from "@/components/site/CTABand";
import { courses, philosophy, workshops } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <WhyChooseUs />

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
        <PullQuote
          caption={
            <>
              The Better Training philosophy.{" "}
              <Link href="/about" className="text-white underline underline-offset-4">
                About us
              </Link>
            </>
          }
        >
          {philosophy.quote}
        </PullQuote>
      </section>

      <CTABand />
    </>
  );
}
