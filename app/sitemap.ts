import type { MetadataRoute } from "next";
import { courses, workshops } from "@/lib/content";

const base = "https://bettertrainingbrisbane.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/courses", "/workshops", "/contact", "/book"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...courses.map((c) => ({ url: `${base}/courses/${c.slug}` })),
    ...workshops.map((w) => ({ url: `${base}/workshops/${w.slug}` })),
  ];
}
