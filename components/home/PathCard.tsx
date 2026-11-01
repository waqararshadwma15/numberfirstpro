"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

type Props = {
  href: string;
  index: string;
  title: string;
  summary: string;
  points: string[];
  meta: string;
  cta: string;
  tone: "gold" | "teal";
  icon: ReactNode;
};

/* One of the two primary solution choices. A cursor-following spotlight and magnetic arrow on hover. */
export function PathCard({ href, index, title, summary, points, meta, cta, tone, icon }: Props) {
  const gold = tone === "gold";

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    gsap.to(el.querySelector("[data-arrow]"), {
      x: (e.clientX - r.right + 60) * 0.25,
      y: (e.clientY - r.top - 60) * 0.25,
      duration: 0.5,
      overwrite: "auto",
    });
  };
  const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget.querySelector("[data-arrow]"), { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });

  return (
    <Link
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-intro
      aria-label={`${title}. ${cta}`}
      className={`group/card relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[28px] border border-line bg-surface p-7 transition-[border-color,transform,opacity] duration-500 ease-out-expo hover:-translate-y-1.5 sm:p-10 lg:min-h-[480px] ${
        gold ? "hover:border-gold/60" : "hover:border-teal/60"
      }`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 ${
          gold
            ? "bg-[radial-gradient(520px_circle_at_var(--x,50%)_var(--y,50%),rgb(240_179_35/0.16),transparent_60%)]"
            : "bg-[radial-gradient(520px_circle_at_var(--x,50%)_var(--y,50%),rgb(63_191_174/0.16),transparent_60%)]"
        }`}
      />
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 -z-10 h-1 origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover/card:scale-x-100 rtl:origin-right ${
          gold ? "bg-gold" : "bg-teal"
        }`}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`font-display text-6xl leading-none sm:text-7xl ${gold ? "text-gold" : "text-teal"}`}>{index}</span>
          <span className={`grid size-12 place-items-center rounded-2xl border ${gold ? "border-gold/30 text-gold" : "border-teal/30 text-teal"}`}>
            {icon}
          </span>
        </div>
        <span
          data-arrow
          aria-hidden
          className={`grid size-14 place-items-center rounded-full border transition-colors duration-300 ${
            gold
              ? "border-gold/40 text-gold group-hover/card:bg-gold group-hover/card:text-on-gold"
              : "border-teal/40 text-teal group-hover/card:bg-teal group-hover/card:text-on-teal"
          }`}
        >
          <ArrowUpRight size={24} className="rtl:-scale-x-100" />
        </span>
      </div>

      <div className="mt-auto pt-14">
        <h3 className="text-[clamp(34px,4vw,50px)]">{title}</h3>
        <p className="mt-4 max-w-md text-muted">{summary}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {points.map((p) => (
            <li key={p} className="rounded-full border border-line bg-ink/50 px-3.5 py-1.5 text-[13px] text-fg/90">
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5 text-sm">
          <span className="text-muted">{meta}</span>
          <span className={`font-semibold ${gold ? "text-gold" : "text-teal"}`}>{cta}</span>
        </div>
      </div>
    </Link>
  );
}
