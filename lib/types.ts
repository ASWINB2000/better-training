export interface SiteInfo {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  mapQuery: string;
  hours: { days: string; time: string }[];
}

export interface NavLink {
  label: string;
  href: string;
}

export type FeatureIcon = "Map" | "Users" | "MessageCircle";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  desc: string;
}

export interface Course {
  slug: string;
  image: string;
  title: string;
  /** Unit or qualification code, when the reference site publishes one. */
  code: string | null;
  /** AUD. `null` means "contact us for pricing". */
  price: number | null;
  duration: string | null;
  delivery: string;
  summary: string;
  audience: string;
  outcomes: string[];
  prerequisites: string;
  assessment: string;
  renewal: string | null;
  inclusions?: string[];
}

export interface Workshop {
  slug: string;
  image: string;
  title: string;
  duration: string | null;
  summary: string;
  audience: string;
  outcomes: string[];
  format: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ServiceOption {
  slug: string;
  name: string;
  price: number | null;
  duration: string | null;
  group: "Courses" | "Workshops";
}
