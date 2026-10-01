"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  LucideIcon,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { formatPrice, serviceOptions } from "@/lib/content";

interface Service {
  id: string;
  name: string;
  price: number | null;
  duration: string | null;
  group: "Courses" | "Workshops";
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const allServices: Service[] = serviceOptions.map((o) => ({
  id: o.slug,
  name: o.name,
  price: o.price,
  duration: o.duration,
  group: o.group,
}));

const serviceGroups: { label: "Courses" | "Workshops"; icon: LucideIcon }[] = [
  { label: "Courses", icon: Stethoscope },
  { label: "Workshops", icon: Activity },
];

const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

const BookingSection = ({ initialService = "" }: { initialService?: string }) => {
  const valid = allServices.some((s) => s.id === initialService) ? initialService : "";
  const [step, setStep] = useState(valid ? 2 : 1);
  const [service, setService] = useState(valid);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [info, setInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const selected = allServices.find((s) => s.id === service);

  const next = () => {
    if (step === 1 && !service) return toast({ title: "Please choose a service" });
    if (step === 2 && (!date || !time)) return toast({ title: "Pick a date and time" });
    if (step === 3 && (!info.name || !info.email || !info.phone))
      return toast({ title: "Please fill in your details" });
    setStep((s) => Math.min(4, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const reserve = () => {
    toast({
      title: "Booking request received",
      description: `${selected?.name} on ${date?.toDateString()} at ${time}. We'll email ${info.email} shortly.`,
    });
    setStep(1);
    setService("");
    setDate(undefined);
    setTime("");
    setInfo({ name: "", email: "", phone: "", notes: "" });
  };

  const steps = ["Service", "Date & Time", "Your Info", "Confirm"];

  return (
    <section id="book" className="pt-12 pb-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-red-800 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Reserve your seat
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
            Book a class or session.
          </h2>
          <p className="mt-4 text-slate-600">Choose a service, pick a time and leave your details. We confirm by email or phone.</p>
        </div>

        <div
          ref={cardRef}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden scroll-mt-28"
        >
          <div className="px-8 md:px-14 pt-8 pb-6 bg-gradient-to-b from-slate-50/70 to-white border-b border-slate-100">
            <div className="relative">
              <div className="absolute top-[17px] left-[12.5%] right-[12.5%] h-[3px] bg-slate-200 rounded-full" />
              <div
                className="absolute top-[17px] left-[12.5%] h-[3px] bg-red-700 rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 75}%` }}
              />
              <div className="relative grid grid-cols-4">
                {steps.map((label, i) => {
                  const idx = i + 1;
                  const active = step === idx;
                  const done = step > idx;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => done && setStep(idx)}
                      className={`flex flex-col items-center gap-2.5 ${
                        done ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span
                        className={`grid place-items-center w-[34px] h-[34px] rounded-full text-xs font-bold ring-[6px] transition-colors duration-300 ${
                          done
                            ? "bg-red-700 text-white ring-white"
                            : active
                            ? "bg-red-700 text-white ring-red-50"
                            : "bg-white text-slate-400 ring-white border border-slate-200"
                        }`}
                      >
                        {done ? <Check className="w-4 h-4" /> : idx}
                      </span>
                      <span
                        className={`text-[11px] md:text-xs font-semibold tracking-wide ${
                          active ? "text-red-800" : done ? "text-slate-600" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div key={step} className="fade-in-up min-h-[22rem]">
            {step === 1 && (
              <div className="max-w-xl mx-auto">
                <Label className="text-slate-900 font-semibold">Select a service *</Label>
                <p className="text-sm text-slate-500 mt-1 mb-3">
                  Choose the course or workshop you&apos;d like to book.
                </p>

                <ServicePicker value={service} onChange={setService} />

                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 flex items-center divide-x divide-slate-200">
                  <SummaryStat icon={Clock} label="Duration" value={selected ? selected.duration ?? "On request" : "—"} />
                  <SummaryStat icon={MapPin} label="Location" value="Salisbury, Brisbane" />
                  <SummaryStat icon={Users} label="Group size" value="Max 12" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div>
                  <Label className="text-slate-900 font-semibold">Choose a date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="mt-2 w-full h-14 justify-start text-left rounded-xl border-slate-200"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date ? date.toDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-slate-900 font-semibold">Available times</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`h-12 rounded-xl border font-medium text-sm transition ${
                          time === t
                            ? "bg-red-700 text-white border-red-700"
                            : "bg-white border-slate-200 text-slate-700 hover:border-red-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
                <Field label="Full name *">
                  <Input
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email *">
                  <Input
                    type="email"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="jane@example.com"
                  />
                </Field>
                <Field label="Phone *">
                  <Input
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="0400 000 000"
                  />
                </Field>
                <Field label="Notes (optional)">
                  <Textarea
                    value={info.notes}
                    onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                    className="rounded-xl min-h-12"
                    placeholder="Any dietary or access requirements?"
                  />
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="max-w-xl mx-auto">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                    Your reservation
                  </div>
                  <Row k="Service" v={selected?.name} />
                  <Row k="Date" v={date?.toDateString()} />
                  <Row k="Time" v={time} />
                  <Row k="Location" v="Salisbury, Brisbane" />
                  <Row k="Name" v={info.name} />
                  <Row k="Email" v={info.email} />
                  <Row k="Phone" v={info.phone} />
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-display font-bold text-2xl text-red-800">
                      {selected ? formatPrice(selected.price) : "—"}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500 text-center">
                  We&apos;ll confirm your booking and send payment details to your email. Prices marked “Contact us” are quoted on confirmation.
                </p>
              </div>
            )}
            </div>

            <div className="mt-10 flex items-center justify-between max-w-3xl mx-auto">
              <Button
                variant="outline"
                onClick={back}
                disabled={step === 1}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={next}
                  className="bg-red-700 hover:bg-red-800 rounded-full px-6"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={reserve}
                  className="bg-red-700 hover:bg-red-800 rounded-full px-6"
                >
                  Confirm Reservation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) => {
  const selected = allServices.find((s) => s.id === value);
  const [groupOverride, setGroupOverride] = useState<"Courses" | "Workshops" | null>(null);
  const group = groupOverride ?? selected?.group ?? "Courses";

  return (
    <div>
      <div className="inline-flex rounded-full bg-slate-100 p-1 gap-1">
        {serviceGroups.map((g) => {
          const active = group === g.label;
          return (
            <button
              key={g.label}
              type="button"
              onClick={() => setGroupOverride(g.label)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "bg-red-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <g.icon className="w-3.5 h-3.5" />
              {g.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {allServices
          .filter((s) => s.group === group)
          .map((s) => {
            const active = value === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange(s.id)}
                className={`w-full flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-red-700 bg-red-50/60"
                    : "border-slate-200 hover:border-red-300 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full border-2 grid place-items-center shrink-0 ${
                      active ? "border-red-700 bg-red-700" : "border-slate-300"
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-white" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-slate-900 text-sm truncate">
                      {s.name}
                    </span>
                    <span className="block text-xs text-slate-500">{s.duration ?? "Duration on request"}</span>
                  </span>
                </span>
                <span className="text-red-800 font-semibold text-sm shrink-0">{formatPrice(s.price)}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
};

const SummaryStat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="flex-1 flex items-center gap-2.5 px-4 first:pl-0 last:pr-0">
    <Icon className="w-4 h-4 text-red-700 shrink-0" />
    <div className="leading-tight">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value}</div>
    </div>
  </div>
);

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <Label className="text-slate-900 font-semibold">{label}</Label>
    <div className="mt-2">{children}</div>
  </div>
);

const Row = ({ k, v }: { k: string; v?: string }) => (
  <div className="flex items-center justify-between py-1.5 text-sm">
    <span className="text-slate-500">{k}</span>
    <span className="font-medium text-slate-800">{v || "—"}</span>
  </div>
);

export default BookingSection;
