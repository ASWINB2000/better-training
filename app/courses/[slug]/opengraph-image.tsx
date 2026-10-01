import { notFound } from "next/navigation";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getCourse, siteInfo } from "@/lib/content";

export const alt = "Better Training course";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return renderOgImage({
    eyebrow: "Course",
    title: course.title,
    footer: `${course.duration ?? course.delivery} · ${siteInfo.location}`,
    image: course.image,
  });
}
