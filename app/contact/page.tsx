import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import ContactForm from "@/components/marketing/ContactForm";
import { siteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Better Training in Salisbury, Brisbane: phone, email, address and opening hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Get in touch" intro="Questions about a course, a workshop or a group booking? We are happy to help." />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20 grid lg:grid-cols-2 gap-14">
        <div>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <MapPin className="w-6 h-6 mt-0.5 text-red-800 shrink-0" aria-hidden="true" />
              <address className="not-italic text-slate-800">{siteInfo.address}</address>
            </li>
            <li className="flex gap-4">
              <Phone className="w-6 h-6 mt-0.5 text-red-800 shrink-0" aria-hidden="true" />
              <a href={siteInfo.phoneHref} className="text-slate-800 hover:text-red-800 font-semibold">
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail className="w-6 h-6 mt-0.5 text-red-800 shrink-0" aria-hidden="true" />
              <a href={`mailto:${siteInfo.email}`} className="text-slate-800 hover:text-red-800 break-all">
                {siteInfo.email}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="w-6 h-6 mt-0.5 text-red-800 shrink-0" aria-hidden="true" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-slate-800">
                {siteInfo.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt>{h.days}</dt>
                    <dd className="font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>

          <iframe
            title="Map of Better Training, Salisbury"
            src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.mapQuery)}&output=embed`}
            className="mt-10 w-full h-72 rounded-2xl border border-slate-200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold text-slate-900 mb-6">Send a message</h2>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
