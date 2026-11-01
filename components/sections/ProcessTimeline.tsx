"use client";

import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = { t: Dict["home"]["process"] };

/* Four-step process. A gold rule fills with scroll and lights each step as it passes. */
export function ProcessTimeline({ t }: Props) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      const light = (p: number) =>
        steps.forEach((s, i) => (s.dataset.active = String(p >= i / steps.length + 0.02 || p >= 0.999)));

      const mm = gsap.matchMedia();
      mm.add({ wide: "(min-width: 1024px)", motion: MOTION_OK }, (ctx) => {
        const { wide, motion } = ctx.conditions!;
        if (!motion) {
          light(1);
          return;
        }
        gsap.fromTo(
          "[data-rail]",
          wide ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-steps]",
              start: wide ? "top 70%" : "top 75%",
              end: wide ? "bottom 45%" : "bottom 55%",
              scrub: 0.6,
              onUpdate: (self) => light(self.progress),
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="process" className="band relative overflow-hidden bg-surface">
      <div className="wrap">
        <p data-reveal className="eyebrow">
          {t.label}
        </p>
        <h2 data-reveal className="h2 max-w-3xl">
          {t.title}
        </h2>

        <ol data-steps className="relative mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute start-[23px] top-2 bottom-2 w-px bg-line lg:inset-x-0 lg:top-[23px] lg:bottom-auto lg:h-px lg:w-auto" />
          <span
            aria-hidden
            data-rail
            className="absolute start-[23px] top-2 bottom-2 w-px origin-top bg-gold lg:inset-x-0 lg:top-[23px] lg:bottom-auto lg:h-px lg:w-auto lg:origin-left rtl:lg:origin-right"
          />
          {t.steps.map((s, i) => (
            <li key={s.title} data-step data-active="false" className="group relative grid grid-cols-[48px_1fr] gap-5 lg:block">
              <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line bg-ink font-display text-xl text-muted transition-all duration-500 group-data-[active=true]:border-gold group-data-[active=true]:bg-gold group-data-[active=true]:text-on-gold">
                {i + 1}
              </span>
              <div className="lg:mt-8">
                <h3 className="text-2xl transition-colors duration-500 lg:text-[28px]">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
