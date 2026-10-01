import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { siteInfo } from "@/lib/content";

export const alt = "Better Training | First Aid & Emergency Training, Brisbane";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "First aid and emergency training",
    title: "Training that actually sticks.",
    footer: siteInfo.location,
    image: "/images/course-first-aid.jpg",
  });
}
