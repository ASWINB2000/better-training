"use client";

import { useState, type ReactNode } from "react";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  LucideIcon,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { courses, workshops } from "@/lib/mock";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const allServices: Service[] = [
  ...courses.map((c) => ({
    id: c.id,
    name: c.title,
    price: c.price,
    duration: c.duration,
  })),
  ...workshops.map((w) => ({
    id: w.id,
    name: w.title,
    price: 89,
    duration: w.duration,
  })),
];

const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [info, setInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

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
      title: "Reservation received 🎉",
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
    <section id="book" className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-red-800 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Reserve your seat
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900">
            Book your course in 60 seconds.
          </h2>
          <p className="mt-4 text-slate-600">Simple 4-step booking. No account required.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-4 border-b border-slate-100">
            {steps.map((label, i) => {
              const idx = i + 1;
              const active = step === idx;
              const done = step > idx;
              return (
                <div
                  key={label}
                  className={`px-3 py-5 flex items-center justify-center gap-2 text-sm font-medium border-b-2 transition-colors ${
                    active
                      ? "border-red-700 text-red-800 bg-red-50/50"
                      : done
                      ? "border-red-200 text-slate-600"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
                      done
                        ? "bg-red-700 text-white"
                        : active
                        ? "bg-red-700 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {done ? <Check className="w-3.5 h-3.5" /> : idx}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="max-w-xl mx-auto">
                <Label className="text-slate-900 font-semibold">Select service *</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="h-14 mt-2 rounded-xl border-slate-200">
                    <SelectValue placeholder="— Choose a course or workshop —" />
                  </SelectTrigger>
                  <SelectContent>
                    {allServices.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} — ${s.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selected && (
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <InfoTile icon={Clock} label="Duration" value={selected.duration} />
                    <InfoTile icon={MapPin} label="Location" value="Brisbane CBD" />
                    <InfoTile icon={Users} label="Group" value="Max 12" />
                  </div>
                )}
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
                  <Row k="Location" v="Brisbane CBD" />
                  <Row k="Name" v={info.name} />
                  <Row k="Email" v={info.email} />
                  <Row k="Phone" v={info.phone} />
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-display font-bold text-2xl text-red-800">
                      ${selected?.price}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500 text-center">
                  We&apos;ll send a payment link to your email after confirmation.
                </p>
              </div>
            )}

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

const InfoTile = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-white grid place-items-center border border-slate-100">
      <Icon className="w-4 h-4 text-red-700" />
    </div>
    <div>
      <div className="text-[10px] uppercase tracking-widest text-slate-400">{label}</div>
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
