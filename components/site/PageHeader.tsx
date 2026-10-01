import type { ReactNode } from "react";

export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-slate-100 bg-gradient-to-b from-rose-50/60 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8 lg:pt-20 lg:pb-8">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 max-w-3xl text-balance">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">{intro}</p>
        )}
        {children}
      </div>
    </header>
  );
}
