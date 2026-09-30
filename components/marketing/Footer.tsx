"use client";

import { useState } from "react";
import {
  Clock,
  Facebook,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { navLinks, siteInfo } from "@/lib/mock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    toast({
      title: "You're on the list ✨",
      description: "We'll send course updates to " + email,
    });
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">
              Get monthly course updates.
            </h3>
            <p className="mt-2 text-red-50">
              Fresh dates, tips from our clinicians and early-bird pricing.
            </p>
          </div>
          <form
            onSubmit={submit}
            className="flex w-full md:w-auto gap-2 bg-white rounded-full p-1.5 shadow-lg"
          >
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 focus-visible:ring-0 h-11 min-w-56 text-slate-800"
            />
            <Button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 rounded-full h-11 px-5 text-white"
            >
              <Send className="w-4 h-4 mr-1" /> Subscribe
            </Button>
          </form>
        </div>

        <div className="grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-700 grid place-items-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">
                  Better Training
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-red-400">
                  Brisbane
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Nationally recognised first aid, CPR and specialist care
              training, delivered by practising clinicians.
            </p>
            <div className="flex gap-2 mt-5">
              {[Facebook, Instagram, Linkedin].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-700 grid place-items-center transition-colors"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Navigate</div>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-red-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Popular Courses</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#courses" className="hover:text-red-400">
                  Provide First Aid
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-red-400">
                  CPR Training
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-red-400">
                  Diabetes Management
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-red-400">
                  Medication Management
                </a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-red-400">
                  Manual Handling
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-4">Get in touch</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                {siteInfo.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400" />
                <a href={`tel:${siteInfo.phone}`} className="hover:text-red-400">
                  {siteInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400" />
                <a href={`mailto:${siteInfo.email}`} className="hover:text-red-400">
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-red-400" />
                {siteInfo.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Better Training Brisbane. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-red-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-red-400">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
