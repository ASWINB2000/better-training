import Link from "next/link";
import { PulseLine } from "@/components/site/PulseLine";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-28 text-center">
      <PulseLine className="max-w-xs mx-auto" />
      <h1 className="mt-6 font-display text-5xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">
        That page does not exist or has moved. Try our courses or workshops instead.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/courses" className="h-12 px-7 inline-flex items-center rounded-full bg-red-800 text-white font-semibold hover:bg-red-900">
          Courses
        </Link>
        <Link href="/workshops" className="h-12 px-7 inline-flex items-center rounded-full border border-slate-300 font-semibold hover:border-red-700">
          Workshops
        </Link>
      </div>
    </div>
  );
}
