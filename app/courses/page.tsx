import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { CourseList } from "@/components/site/ServiceList";
import { CTABand } from "@/components/site/CTABand";
import { courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "First aid, CPR, anaphylaxis, asthma and nationally recognised qualifications delivered in Brisbane by healthcare professionals.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        intro="Nationally recognised first aid and care qualifications, taught face-to-face by healthcare professionals."
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-14 lg:pt-8 lg:pb-20">
        <CourseList items={courses} />
      </div>
      <CTABand />
    </>
  );
}
