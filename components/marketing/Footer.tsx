import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { courses, navLinks, siteInfo, workshops } from "@/lib/content";

const linkCls = "hover:text-white transition-colors";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="inline-block bg-white rounded-lg p-2 mb-5">
              <Image src="/logo.png" alt="Better Training" width={96} height={62} className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              First aid and emergency training and education provided by healthcare professionals.
            </p>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Explore</h2>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>{l.label}</Link>
                </li>
              ))}
              <li><Link href="/book" className={linkCls}>Book a session</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Popular training</h2>
            <ul className="space-y-2 text-sm">
              {courses.slice(0, 3).map((c) => (
                <li key={c.slug}><Link href={`/courses/${c.slug}`} className={linkCls}>{c.title}</Link></li>
              ))}
              {workshops.slice(0, 2).map((w) => (
                <li key={w.slug}><Link href={`/workshops/${w.slug}`} className={linkCls}>{w.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4">Get in touch</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                {siteInfo.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <a href={siteInfo.phoneHref} className={linkCls}>{siteInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a href={`mailto:${siteInfo.email}`} className={`${linkCls} break-all`}>{siteInfo.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                <span>
                  {siteInfo.hours.map((h) => (
                    <span key={h.days} className="block">{h.days}: {h.time}</span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Better Training. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
