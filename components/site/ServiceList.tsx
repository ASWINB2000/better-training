import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/content";
import type { Course, Workshop } from "@/lib/types";

/** Index-style listing: one row per course or workshop. */
export function CourseList({ items }: { items: Course[] }) {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/courses/${c.slug}`}
            className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-[1fr_auto] md:items-center hover:bg-rose-50/50 -mx-4 px-4 rounded-lg transition-colors"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 group-hover:text-red-800 transition-colors">
                  {c.title}
                </h3>
                {c.code && (
                  <span className="text-sm font-medium text-slate-500">{c.code}</span>
                )}
              </div>
              <p className="mt-2 text-slate-600 max-w-2xl leading-relaxed">{c.summary}</p>
              <p className="mt-2 text-sm text-slate-500">
                {c.duration ?? c.delivery}
              </p>
            </div>
            <div className="flex items-center gap-4 md:justify-end">
              <span
                className={
                  c.price === null
                    ? "text-sm font-semibold text-slate-600"
                    : "font-display text-3xl font-bold text-red-800"
                }
              >
                {formatPrice(c.price)}
              </span>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-red-800 transition-colors" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function WorkshopList({ items }: { items: Workshop[] }) {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((w) => (
        <li key={w.slug}>
          <Link
            href={`/workshops/${w.slug}`}
            className="group grid gap-x-8 gap-y-2 py-6 md:grid-cols-[1fr_auto] md:items-center hover:bg-rose-50/50 -mx-4 px-4 rounded-lg transition-colors"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-slate-900 group-hover:text-red-800 transition-colors">
                {w.title}
              </h3>
              <p className="mt-1.5 text-slate-600 max-w-2xl leading-relaxed">{w.summary}</p>
            </div>
            <div className="flex items-center gap-4 md:justify-end text-sm text-slate-500">
              <span>{w.duration ?? "Small group"}</span>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-red-800 transition-colors" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
