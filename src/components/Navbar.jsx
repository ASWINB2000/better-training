import { useState, useEffect } from "react";
import { HeartPulse, Menu, Phone, X } from "lucide-react";
import { navLinks, siteInfo } from "../mock";
import { Button } from "./ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="flex items-center gap-2.5"
        >
          <div className="relative w-11 h-11 rounded-xl bg-white border-2 border-red-800 grid place-items-center shadow-sm">
            <HeartPulse className="w-6 h-6 text-red-800" strokeWidth={2.4} />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-xl text-slate-900">
              Better Training
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-red-800 font-semibold">
              Brisbane • RTO
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(l.href);
              }}
              className="link-underline text-slate-700 hover:text-red-800 font-medium text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${siteInfo.phone}`}
            className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-800 transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-red-50 grid place-items-center">
              <Phone className="w-4 h-4 text-red-800" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                Call Now
              </span>
              <span className="block">{siteInfo.phone}</span>
            </span>
          </a>
          <Button
            onClick={() => scrollTo("#book")}
            className="bg-red-800 hover:bg-red-900 text-white rounded-full px-6 h-11 font-semibold tracking-wide"
          >
            BOOK NOW
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
                className="text-slate-800 font-medium"
              >
                {l.label}
              </a>
            ))}
            <Button
              onClick={() => scrollTo("#book")}
              className="bg-red-800 hover:bg-red-900 text-white rounded-full font-semibold tracking-wide"
            >
              BOOK NOW
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
