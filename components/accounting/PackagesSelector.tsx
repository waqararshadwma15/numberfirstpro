"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = { lang: Locale; t: Dict["accounting"]["packages"] };

/* Packages are set by balance-sheet value, so the visitor picks their range and the matching plan lights up. */
export function PackagesSelector({ lang, t }: Props) {
  const scope = useRef<HTMLElement>(null);
  const [match, setMatch] = useState<number | null>(null);

  const { contextSafe } = useGSAP({ scope });

  const choose = contextSafe((i: number) => {
    setMatch(i);
    if (!window.matchMedia(MOTION_OK).matches) return;
    gsap.fromTo(`[data-plan="${i}"]`, { scale: 0.97 }, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.55)" });
    gsap.fromTo(`[data-plan="${i}"] [data-glow]`, { autoAlpha: 0.9 }, { autoAlpha: 0, duration: 1.2, ease: "power2.out" });
  });

  return (
    <section ref={scope} id="packages" className="band">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p data-reveal className="eyebrow">
              {t.label}
            </p>
            <h2 data-reveal className="h2">
              {t.title}
            </h2>
            <p data-reveal className="lead">
              {t.lead}
            </p>
          </div>
          <fieldset data-reveal className="rounded-3xl border border-line bg-surface p-5">
            <legend className="sr-only">{t.selector}</legend>
            <p aria-hidden className="mb-4 text-sm font-semibold">
              {t.selector}
            </p>
            <div role="radiogroup" aria-label={t.selector} className="grid grid-cols-2 gap-2">
              {t.ranges.map((r, i) => (
                <button
                  key={r}
                  type="button"
                  role="radio"
                  aria-checked={match === i}
                  onClick={() => choose(i)}
                  className="min-h-12 rounded-xl border border-line px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:border-gold/60 hover:text-fg aria-checked:border-gold aria-checked:bg-gold aria-checked:text-on-gold"
                >
                  {r}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.plans.map((p, i) => {
            const isMatch = match === i;
            const popular = p.key === "growth";
            const dim = match !== null && !isMatch;
            return (
              <article
                key={p.key}
                data-plan={i}
                data-reveal
                className={`relative flex flex-col rounded-3xl border p-7 transition-[border-color,opacity,background-color] duration-500 ${
                  isMatch
                    ? "border-gold bg-gold/[0.07]"
                    : popular && match === null
                      ? "border-gold/50 bg-surface"
                      : "border-line bg-surface"
                } ${dim ? "opacity-55" : ""}`}
              >
                <span data-glow aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_0_0_6px_rgb(240_179_35/0.35)]" />
                {(isMatch || (popular && match === null)) && (
                  <span className="absolute -top-3 start-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-on-gold">
                    {isMatch ? t.match : t.popular}
                  </span>
                )}
                <h3 className="text-3xl">{p.name}</h3>
                <p className="mt-5 flex items-baseline gap-1.5" dir="ltr">
                  <small className="text-sm font-semibold text-muted">{t.sar}</small>
                  <strong data-count={p.price} className="font-display text-6xl leading-none font-semibold text-gold">
                    {p.price.toLocaleString("en-US")}
                  </strong>
                  <span className="text-sm text-muted">{t.perMonth}</span>
                </p>
                <div className="mt-6 rounded-2xl border border-line bg-ink/60 p-4">
                  <p className="text-[11px] font-bold tracking-[0.16em] text-muted uppercase rtl:tracking-normal">{t.balanceSheet}</p>
                  <p className="mt-1 text-sm">{p.criteria}</p>
                </div>
                <ul className="mt-6 mb-8 grid gap-3 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${lang}/enquire?path=accounting&plan=${p.key}`}
                  className={`btn mt-auto w-full !min-h-12 ${isMatch ? "btn-gold" : "btn-line"}`}
                >
                  {t.choose} {p.name}
                  <ArrowRight size={16} className="arrow" />
                </Link>
              </article>
            );
          })}
        </div>
        <p data-reveal className="mt-8 text-sm text-muted">
          {t.note}
        </p>
      </div>
    </section>
  );
}
