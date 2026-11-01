"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/* Illustrative month-end checklist: items tick off one by one and the progress ring closes. */
export function MonthlyCloseCard({ t }: { t: Dict["accounting"]["checklist"] }) {
  const scope = useRef<HTMLDivElement>(null);
  const R = 26;
  const C = 2 * Math.PI * R;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-item]");
        const tl = gsap.timeline({ delay: 0.9, defaults: { ease: "power2.out" } });
        tl.set("[data-tick]", { scale: 0 })
          .set("[data-ring]", { strokeDashoffset: C })
          .set("[data-done]", { autoAlpha: 0, y: 10 })
          .set(items, { opacity: 0.35 });
        items.forEach((item, i) => {
          tl.to(item, { opacity: 1, duration: 0.25 })
            .to(item.querySelector("[data-tick]"), { scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "<")
            .to("[data-ring]", { strokeDashoffset: C * (1 - (i + 1) / items.length), duration: 0.4 }, "<")
            .to("[data-pct]", { innerText: Math.round(((i + 1) / items.length) * 100), snap: { innerText: 1 }, duration: 0.4 }, "<")
            .to({}, { duration: 0.18 });
        });
        tl.to("[data-done]", { autoAlpha: 1, y: 0, duration: 0.5 });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="card relative overflow-hidden p-6 shadow-2xl shadow-black/40 sm:p-8" aria-hidden>
      <div aria-hidden className="pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-gold uppercase rtl:tracking-normal">{t.period}</p>
          <p className="mt-1 font-display text-3xl">{t.title}</p>
        </div>
        <div className="relative grid size-16 place-items-center">
          <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
            <circle cx="32" cy="32" r={R} fill="none" stroke="var(--color-line)" strokeWidth="5" />
            <circle data-ring cx="32" cy="32" r={R} fill="none" stroke="var(--color-gold)" strokeWidth="5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={0} />
          </svg>
          <span className="text-sm font-bold tabular-nums" dir="ltr">
            <span data-pct>100</span>%
          </span>
        </div>
      </div>
      <ul className="relative mt-7 grid gap-2.5">
        {t.items.map((item) => (
          <li data-item key={item} className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-4 py-3 text-[15px]">
            <span data-tick className="grid size-6 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
              <Check size={14} strokeWidth={3.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <p data-done className="relative mt-5 flex items-center gap-2 text-sm font-semibold text-gold">
        <span className="size-2 animate-pulse rounded-full bg-gold" />
        {t.done}
      </p>
    </div>
  );
}
