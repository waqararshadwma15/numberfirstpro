"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/* Illustrative budget-vs-actual chart. Shapes only, no figures: it shows the kind of view, not client data. */
const ACTUAL = [42, 55, 48, 62, 58, 71, 66];
const FORECAST = [74, 79, 77, 85, 88];
const W = 440;
const H = 260;
const BAR = 22;
const GAP = (W - 40 - BAR * 12) / 11;
const x = (i: number) => 20 + i * (BAR + GAP);
const y = (v: number) => H - 30 - (v / 100) * (H - 60);

export function ForecastChart({ t }: { t: Dict["advisory"]["chart"] }) {
  const scope = useRef<HTMLDivElement>(null);
  const all = [...ACTUAL, ...FORECAST];
  const line = all.map((v, i) => `${i ? "L" : "M"}${x(i) + BAR / 2},${y(v + 6)}`).join(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const path = scope.current!.querySelector<SVGPathElement>("[data-line]")!;
        const len = path.getTotalLength();
        gsap
          .timeline({ delay: 0.8 })
          .from("[data-bar]", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.9, stagger: 0.06, ease: "expo.out" })
          .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.3)
          .from("[data-dot]", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(3)" }, "-=0.2")
          .from("[data-legend]", { autoAlpha: 0, y: 8, stagger: 0.1, duration: 0.6 }, "-=0.4");
        gsap.to("[data-dot]", { scale: 1.6, autoAlpha: 0.4, repeat: -1, yoyo: true, duration: 1.1, ease: "sine.inOut", delay: 3 });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="card relative overflow-hidden p-6 shadow-2xl shadow-black/40 sm:p-8" aria-hidden>
      <div className="pointer-events-none absolute -bottom-24 -start-24 size-64 rounded-full bg-teal/15 blur-3xl" />
      <div className="relative flex flex-wrap items-center gap-5 text-xs text-muted">
        <span data-legend className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-teal" />
          {t.actual}
        </span>
        <span data-legend className="flex items-center gap-2">
          <span className="size-2.5 rounded-sm border border-dashed border-teal" />
          {t.forecast}
        </span>
        <span data-legend className="flex items-center gap-2">
          <span className="h-0.5 w-4 rounded bg-gold" />
          {t.budget}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="relative mt-5 w-full">
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1="0" x2={W} y1={30 + g * ((H - 60) / 3)} y2={30 + g * ((H - 60) / 3)} stroke="var(--color-line)" strokeDasharray="2 6" />
        ))}
        {all.map((v, i) => {
          const actual = i < ACTUAL.length;
          return (
            <rect
              key={i}
              data-bar
              x={x(i)}
              y={y(v)}
              width={BAR}
              height={H - 30 - y(v)}
              rx="5"
              fill={actual ? "var(--color-teal)" : "rgb(63 191 174 / 0.12)"}
              stroke={actual ? "none" : "var(--color-teal)"}
              strokeDasharray={actual ? undefined : "4 4"}
              opacity={actual ? 0.55 + (i / ACTUAL.length) * 0.45 : 1}
            />
          );
        })}
        <path data-line d={line} fill="none" stroke="var(--color-gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle data-dot cx={x(all.length - 1) + BAR / 2} cy={y(all[all.length - 1] + 6)} r="5" fill="var(--color-gold)" />
        <line x1="0" x2={W} y1={H - 30} y2={H - 30} stroke="var(--color-line)" />
        <line x1={x(ACTUAL.length) - GAP / 2} x2={x(ACTUAL.length) - GAP / 2} y1="20" y2={H - 30} stroke="var(--color-muted)" strokeOpacity=".35" strokeDasharray="3 4" />
      </svg>
      <p className="relative mt-3 text-sm text-muted">{t.caption}</p>
    </div>
  );
}
