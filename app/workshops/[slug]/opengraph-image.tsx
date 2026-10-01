import { notFound } from "next/navigation";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getWorkshop, siteInfo } from "@/lib/content";

export const alt = "Better Training workshop";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) notFound();
  return renderOgImage({
    eyebrow: "Workshop",
    title: `${workshop.title} Workshop`,
    footer: workshop.duration ? `${workshop.duration} · ${siteInfo.location}` : siteInfo.location,
    image: workshop.image,
  });
}
