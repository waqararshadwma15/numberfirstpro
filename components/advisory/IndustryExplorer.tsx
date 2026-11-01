"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Briefcase, Building2, Dumbbell, Hotel, Palette, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const icons: Record<string, LucideIcon> = {
  sports: Dumbbell,
  realestate: Building2,
  fnb: UtensilsCrossed,
  hospitality: Hotel,
  consultancy: Briefcase,
  creative: Palette,
};

type Props = { lang: Locale; t: Dict["advisory"]["industries"]; cta: string };

/* Six sector tabs; the detail panel swaps with a short GSAP transition.
   All six panels are in the HTML (inactive ones hidden) so search and AI crawlers read every sector. */
export function IndustryExplorer({ lang, t, cta }: Props) {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeKey = t.items[active].key;

  useGSAP(
    () => {
      if (!window.matchMedia(MOTION_OK).matches) return;
      gsap
        .timeline()
        .fromTo(`#panel-${activeKey} [data-panel-icon]`, { scale: 0.6, rotate: -20, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: "back.out(2)" })
        .fromTo(`#panel-${activeKey} [data-panel-in]`, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6, ease: "expo.out" }, 0.05);
    },
    { scope, dependencies: [activeKey], revertOnUpdate: false },
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const rtl = document.documentElement.dir === "rtl";
    const next = { ArrowDown: 1, ArrowRight: rtl ? -1 : 1, ArrowUp: -1, ArrowLeft: rtl ? 1 : -1 }[e.key];
    if (!next) return;
    e.preventDefault();
    const n = (i + next + t.items.length) % t.items.length;
    setActive(n);
    scope.current?.querySelector<HTMLButtonElement>(`#tab-${t.items[n].key}`)?.focus();
  };

  return (
    <section ref={scope} id="industries" className="band relative overflow-hidden bg-surface">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="wrap relative">
        <p data-reveal className="eyebrow eyebrow-teal">
          {t.label}
        </p>
        <h2 data-reveal className="h2 max-w-3xl">
          {t.title}
        </h2>
        <p data-reveal className="lead">
          {t.lead}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div
            role="tablist"
            aria-label={t.label}
            aria-orientation="vertical"
            className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {t.items.map((ind, i) => {
              const TabIcon = icons[ind.key];
              const selected = i === active;
              return (
                <button
                  key={ind.key}
                  id={`tab-${ind.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${ind.key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  data-reveal
                  className="group flex shrink-0 snap-start items-center gap-4 rounded-2xl border border-line bg-ink px-5 py-4 text-start transition-colors duration-300 hover:border-teal/50 aria-selected:border-teal aria-selected:bg-teal/10"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-tint/5 text-muted transition-colors group-aria-selected:bg-teal group-aria-selected:text-on-teal">
                    <TabIcon size={20} aria-hidden />
                  </span>
                  <span className="font-display text-xl whitespace-nowrap lg:text-2xl">{ind.name}</span>
                  <span className="ms-auto hidden size-1.5 rounded-full bg-teal opacity-0 transition-opacity group-aria-selected:opacity-100 lg:block" />
                </button>
              );
            })}
          </div>

          <div data-reveal>
            {t.items.map((item, i) => {
              const Icon = icons[item.key];
              return (
                <div
                  key={item.key}
                  id={`panel-${item.key}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${item.key}`}
                  hidden={i !== active}
                  className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-line bg-ink p-8 sm:p-12 [&[hidden]]:hidden"
                >
                  <Icon aria-hidden strokeWidth={0.6} className="pointer-events-none absolute -end-10 -bottom-10 size-72 text-teal/[0.07]" />
                  <span data-panel-icon className="grid size-16 place-items-center rounded-2xl bg-teal text-on-teal">
                    <Icon size={30} aria-hidden />
                  </span>
                  <h3 data-panel-in className="mt-8 text-[clamp(36px,4.5vw,56px)]">
                    {item.name}
                  </h3>
                  <p data-panel-in className="mt-3 text-lg text-muted">
                    {item.summary}
                  </p>
                  <p data-panel-in className="mt-10 text-xs font-bold tracking-[0.18em] text-teal uppercase rtl:tracking-normal">
                    {t.focusLabel}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                    {item.focus.map((f, n) => (
                      <li key={f} data-panel-in className="rounded-2xl border border-line bg-surface p-5">
                        <span className="font-sans text-xs text-teal tabular-nums">0{n + 1}</span>
                        <p className="mt-2 leading-snug">{f}</p>
                      </li>
                    ))}
                  </ul>
                  <div data-panel-in className="mt-auto pt-10">
                    <Link href={`/${lang}/enquire?path=advisory&industry=${item.key}`} className="btn btn-teal">
                      {cta}
                      <ArrowRight size={18} className="arrow" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
