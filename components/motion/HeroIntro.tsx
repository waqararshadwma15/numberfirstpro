"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/*
 * Wraps a hero and plays its entrance once fonts are ready:
 *   [data-split]  headline lines, split into masked words that rise in
 *   [data-intro]  everything else, faded up in DOM order after the headline
 * Words (not characters) are split so Arabic letter joining stays intact.
 */
export function HeroIntro({ children, className = "" }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.utils.toArray<HTMLElement>("[data-intro]");
        gsap.set(intro, { autoAlpha: 0, y: 28 });
        let split: SplitText | undefined;

        document.fonts.ready.then(() => {
          const heads = gsap.utils.toArray<HTMLElement>("[data-split]");
          split = new SplitText(heads, { type: "words", mask: "words" });
          gsap.set(heads, { autoAlpha: 1 });
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.06 })
            .to(intro, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, "-=0.85");
        });
        return () => split?.revert();
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
