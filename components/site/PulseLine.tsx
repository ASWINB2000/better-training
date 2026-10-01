import { cn } from "@/lib/utils";

/** ECG trace used as the site's signature divider. Draws itself once on load. */
export function PulseLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pulse-line w-full h-12 text-primary", className)}
      fill="none"
    >
      <path
        pathLength={1}
        d="M0 34 H150 L168 34 L180 12 L196 52 L210 4 L224 34 H270 L282 28 L294 34 H600"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
