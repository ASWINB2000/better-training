"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, siteInfo } from "@/lib/content";
import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Better Training home">
          <Image
            src="/logo.png"
            alt="Better Training"
            width={96}
            height={62}
            className="h-14 w-auto"
            priority
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn(
                "link-underline font-medium text-sm transition-colors hover:text-red-800",
                isActive(pathname, l.href) ? "text-red-800" : "text-slate-700"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={siteInfo.phoneHref}
            className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-800 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-red-50 grid place-items-center">
              <Phone className="w-4 h-4 text-red-800" />
            </span>
            {siteInfo.phone}
          </a>
          <Link
            href="/book"
            className="inline-flex items-center bg-red-800 hover:bg-red-900 text-white rounded-full px-6 h-11 text-sm font-semibold transition-colors"
          >
            Book now
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav aria-label="Mobile" className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={cn(
                  "py-3 font-medium border-b border-slate-100",
                  isActive(pathname, l.href) ? "text-red-800" : "text-slate-800"
                )}
              >
                {l.label}
              </Link>
            ))}
            <a href={siteInfo.phoneHref} className="py-3 font-semibold text-slate-900">
              Call {siteInfo.phone}
            </a>
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="mt-2 text-center bg-red-800 text-white rounded-full h-12 leading-[3rem] font-semibold"
            >
              Book now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
