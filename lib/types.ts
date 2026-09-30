export interface SiteInfo {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
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
  id: string;
  title: string;
  code: string;
  price: number;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface Workshop {
  id: string;
  title: string;
  image: string;
  duration: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Philosophy {
  quote: string;
}
