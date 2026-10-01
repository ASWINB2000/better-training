import type { NextConfig } from "next";

// Old bettertrainingbrisbane.com.au URLs -> new routes. Some old slugs did not
// match their content (e.g. /mental-health-awareness/ is Certificate IV in Mental Health).
const legacy: [string, string][] = [
  ["/who-we-are", "/about"],
  ["/get-in-touch", "/contact"],
  ["/schedule-a-class-or-session", "/book"],
  ["/payment-page", "/book"],
  ["/payment-page-2", "/book"],
  ["/mental-health-awareness", "/courses/certificate-iv-mental-health"],
  ["/first-aid-in-education-and-care-settings", "/courses/certificate-iii-individual-support"],
  ["/first-aid-asthma-anaphylaxis-for-schools", "/courses/certificate-iv-disability"],
  ["/education-and-care-first-aid", "/courses/education-and-care-first-aid"],
  ["/provide-first-aid", "/courses/provide-first-aid"],
  ["/cpr-training", "/courses/cpr-training"],
  ["/safe-manual-handling", "/courses/safe-manual-handling"],
  ["/anaphylaxis-management", "/courses/anaphylaxis-management"],
  ["/asthma-management", "/courses/asthma-management"],
  ["/diabetes-management-workshop", "/workshops/diabetes-management"],
  ["/manual-handling-workshop", "/workshops/manual-handling"],
  ["/idc-spc-management-workshop", "/workshops/idc-spc-management"],
  ["/peg-tube-management-workshop", "/workshops/peg-tube-management"],
  ["/medication-management-workshop", "/workshops/medication-management"],
  ["/bowel-management-workshop", "/workshops/bowel-management"],
  ["/stoma-ostomy-management-workshop", "/workshops/stoma-ostomy-management"],
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return legacy.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
