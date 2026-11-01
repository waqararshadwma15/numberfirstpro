"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";

/*
 * Page-wide scroll motion, driven by data attributes so sections can stay Server Components:
 *   data-reveal            fade up as it enters (siblings entering together are staggered)
 *   data-reveal="scale"    fade + scale in
 *   data-count="3500"      count up from 0 when visible
 *   data-parallax="0.15"   drift against scroll by that fraction of its height
 */
export function MotionRoot() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      root.classList.add("motion-ready");
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              {
                autoAlpha: 0,
                y: (_, el: HTMLElement) => (el.dataset.reveal === "scale" ? 0 : 36),
                scale: (_, el: HTMLElement) => (el.dataset.reveal === "scale" ? 0.94 : 1),
              },
              { autoAlpha: 1, y: 0, scale: 1, duration: 1, stagger: 0.09, ease: "expo.out", clearProps: "transform" },
            ),
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(obj.v).toLocaleString("en-US");
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 0.15;
          gsap.fromTo(
            el,
            { yPercent: -amount * 50 },
            {
              yPercent: amount * 50,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      mm.add(REDUCED, () => {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
      });

      // Fonts and images shift layout after first paint; re-measure once they settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
