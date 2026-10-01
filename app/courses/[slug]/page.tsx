import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/site/DetailLayout";
import { courses, formatPrice, getCourse } from "@/lib/content";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  return course ? { title: course.title, description: course.summary } : {};
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const facts = [
    ...(course.code ? [{ label: "Course code", value: course.code }] : []),
    ...(course.duration ? [{ label: "Duration", value: course.duration }] : []),
    { label: "Delivery", value: course.delivery },
    ...(course.renewal ? [{ label: "Certificate renewal", value: course.renewal }] : []),
  ];

  const sections = [
    { title: "Who it is for", body: <p>{course.audience}</p> },
    { title: "Prerequisites", body: <p>{course.prerequisites}</p> },
    { title: "Assessment", body: <p>{course.assessment}</p> },
    ...(course.inclusions
      ? [
          {
            title: "What is included",
            body: (
              <ul className="list-disc pl-5 space-y-1">
                {course.inclusions.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <DetailLayout
      backHref="/courses"
      backLabel="All courses"
      title={course.title}
      intro={course.summary}
      price={course.price === null ? "Contact us for pricing" : formatPrice(course.price)}
      facts={facts}
      bookHref={`/book?service=${course.slug}`}
      outcomesTitle="What you will learn"
      outcomes={course.outcomes}
      sections={sections}
    />
  );
}
