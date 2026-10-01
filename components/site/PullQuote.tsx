import type { ReactNode } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/** Large pull quote with an opening-mark badge and typographic quotation marks. */
export function PullQuote({
  children,
  caption,
  tone = "dark",
}: {
  children: ReactNode;
  caption?: ReactNode;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <figure className="relative mx-auto max-w-4xl px-6 lg:px-10">
      <div
        className={cn(
          "mb-8 grid h-14 w-14 place-items-center rounded-2xl shadow-lg",
          dark ? "bg-red-700 shadow-red-950/40" : "bg-red-800 shadow-red-900/20"
        )}
      >
        <Quote className="h-7 w-7 fill-white text-white" aria-hidden="true" />
      </div>
      <blockquote
        className={cn(
          "font-display text-3xl font-semibold leading-tight text-balance md:text-5xl",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        <span className={dark ? "text-red-400" : "text-red-800"} aria-hidden="true">
          &ldquo;
        </span>
        {children}
        <span className={dark ? "text-red-400" : "text-red-800"} aria-hidden="true">
          &rdquo;
        </span>
      </blockquote>
      {caption && (
        <figcaption
          className={cn(
            "mt-8 flex items-center gap-4 text-base",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          <span className="h-px w-12 bg-red-500" aria-hidden="true" />
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
