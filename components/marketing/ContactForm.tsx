"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteInfo } from "@/lib/content";

/** Opens the visitor's email app with the message filled in (no server needed). */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = `${form.message}\n\nFrom: ${form.name} <${form.email}>`;
    window.location.href = `mailto:${siteInfo.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="cf-name">Your name</Label>
          <Input id="cf-name" required value={form.name} onChange={set("name")} className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-email">Your email</Label>
          <Input id="cf-email" type="email" required value={form.email} onChange={set("email")} className="h-12" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-subject">Subject</Label>
        <Input id="cf-subject" required value={form.subject} onChange={set("subject")} className="h-12" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-message">Your message (optional)</Label>
        <Textarea id="cf-message" rows={5} value={form.message} onChange={set("message")} />
      </div>
      <Button type="submit" className="bg-red-800 hover:bg-red-900 rounded-full h-12 px-8 font-semibold">
        Send message
      </Button>
      <p className="text-sm text-slate-500">
        This opens your email app with the message ready to send to {siteInfo.email}.
      </p>
    </form>
  );
}
