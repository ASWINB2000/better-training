"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CourseList } from "@/components/site/ServiceList";
import type { Course, CourseCategory } from "@/lib/types";

const categories: { value: CourseCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "first-aid", label: "First aid & CPR" },
  { value: "health-conditions", label: "Health conditions" },
  { value: "manual-handling", label: "Manual handling" },
  { value: "qualifications", label: "Qualifications" },
];

type Pricing = "any" | "priced" | "quote";

const pricingOptions: { value: Pricing; label: string }[] = [
  { value: "any", label: "Any price" },
  { value: "priced", label: "Listed price" },
  { value: "quote", label: "Contact for quote" },
];

export function CourseBrowser({ courses }: { courses: Course[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CourseCategory | "all">("all");
  const [pricing, setPricing] = useState<Pricing>("any");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (pricing === "priced" && c.price === null) return false;
      if (pricing === "quote" && c.price !== null) return false;
      if (!q) return true;
      return [c.title, c.code ?? "", c.summary, c.duration ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [courses, query, category, pricing]);

  const filtered = query !== "" || category !== "all" || pricing !== "any";
  const reset = () => {
    setQuery("");
    setCategory("all");
    setPricing("any");
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses or unit codes"
            aria-label="Search courses"
            className="h-12 w-full rounded-full border border-slate-300 bg-white pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
              className={`h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                category === c.value
                  ? "border-red-800 bg-red-800 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-red-700 hover:text-red-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by price">
            {pricingOptions.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPricing(p.value)}
                aria-pressed={pricing === p.value}
                className={`rounded-full px-3 py-1 font-medium transition-colors ${
                  pricing === p.value
                    ? "bg-rose-100 text-red-900"
                    : "text-slate-600 hover:text-red-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-slate-500" role="status" aria-live="polite">
            Showing {results.length} of {courses.length} courses
          </p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 font-semibold text-red-800 hover:underline"
            >
              <X className="h-4 w-4" aria-hidden="true" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <CourseList items={results} />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <p className="font-display text-2xl font-semibold text-slate-900">No courses match</p>
          <p className="mt-2 text-slate-600">Try a different search, or clear the filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 h-11 rounded-full bg-red-800 px-6 font-semibold text-white hover:bg-red-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
