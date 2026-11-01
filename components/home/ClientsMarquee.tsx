"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Dict } from "@/lib/i18n";
import { clients } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/* Client logos on paper (they ship on white), in two rows drifting in opposite directions. */
export function ClientsMarquee({ t }: { t: Dict["home"]["clients"] }) {
  const scope = useRef<HTMLElement>(null);
  const rows = [clients.slice(0, 6), clients.slice(6)];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rtl = document.documentElement.dir === "rtl";
        const cleanups: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>("[data-track]").forEach((track, i) => {
          const forward = (i === 0) !== rtl;
          const tween = gsap.fromTo(
            track,
            { xPercent: forward ? 0 : -50 },
            { xPercent: forward ? -50 : 0, duration: 38, ease: "none", repeat: -1 },
          );
          const row = track.parentElement!;
          const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
          const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
          row.addEventListener("pointerenter", slow);
          row.addEventListener("pointerleave", resume);
          cleanups.push(() => {
            row.removeEventListener("pointerenter", slow);
            row.removeEventListener("pointerleave", resume);
          });
        });
        return () => cleanups.forEach((fn) => fn());
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="clients" className="band overflow-hidden bg-paper text-[#13181a]">
      <div className="wrap">
        <div className="max-w-3xl">
          <p data-reveal className="eyebrow !text-gold-deep">
            {t.label}
          </p>
          <h2 data-reveal className="h2">
            {t.title}
          </h2>
          <p data-reveal className="lead !text-[#4c565c]">
            {t.lead}
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" dir="ltr">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <ul data-track className="flex shrink-0 gap-5 pe-5">
              {[...row, ...row].map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= row.length || undefined}
                  className="grid h-32 w-52 shrink-0 place-items-center rounded-2xl border border-black/5 bg-white p-5 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.35)] sm:h-36 sm:w-60"
                >
                  <Image
                    src={c.src}
                    alt={i < row.length ? `${c.name} ${t.logoSuffix}` : ""}
                    width={c.w}
                    height={c.h}
                    className="h-full w-full object-contain"
                    sizes="240px"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="wrap mt-14">
        <p className="text-xs font-bold tracking-[0.18em] text-[#4c565c] uppercase rtl:tracking-normal">{t.sectorsLabel}</p>
        <ul className="mt-4 flex flex-wrap gap-2.5" aria-label={t.sectorsLabel}>
          {t.sectors.map((s) => (
            <li key={s} data-reveal className="rounded-full border border-[#13181a]/15 bg-white px-4 py-2 text-sm font-medium">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
