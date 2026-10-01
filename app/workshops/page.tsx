import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { WorkshopList } from "@/components/site/ServiceList";
import { CTABand } from "@/components/site/CTABand";
import { workshops } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Hands-on clinical skills workshops for care workers: diabetes, medication, PEG tube, stoma, bowel, catheter and manual handling.",
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHeader
        title="Workshops"
        intro="Small-group clinical skills workshops for care workers and organisations. We can deliver them on your site."
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-14 lg:pt-8 lg:pb-20">
        <WorkshopList items={workshops} />
        <p className="mt-8 text-slate-600">
          Contact us for corporate packages and pricing.
        </p>
      </div>
      <CTABand />
    </>
  );
}
