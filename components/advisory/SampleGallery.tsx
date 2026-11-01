"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { samples } from "@/lib/site";
import { gsap, MOTION_OK } from "@/lib/gsap";

/* The three anonymised sample report pages from the live site, each opening in a lightbox dialog. */
export function SampleGallery({ t }: { t: Dict["advisory"]["sample"] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const show = (i: number) => {
    setOpen(i);
    const d = dialog.current!;
    d.showModal();
    if (window.matchMedia(MOTION_OK).matches) {
      gsap.fromTo(d, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
    }
  };

  return (
    <section id="sample" className="band">
      <div className="wrap">
        <p data-reveal className="eyebrow eyebrow-teal">
          {t.label}
        </p>
        <h2 data-reveal className="h2 max-w-3xl">
          {t.title}
        </h2>
        <p data-reveal className="lead">
          {t.lead}
        </p>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {samples.map((s, i) => (
            <li key={s.src} data-reveal>
              <button type="button" onClick={() => show(i)} className="group block w-full text-start" aria-label={`${t.items[i].title}. ${t.open}`}>
                <span className="relative block overflow-hidden rounded-2xl border border-line bg-white">
                  <Image
                    src={s.src}
                    alt={t.items[i].alt}
                    width={s.w}
                    height={s.h}
                    sizes="(min-width: 768px) 380px, 100vw"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <span className="absolute end-3 bottom-3 flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand size={14} aria-hidden />
                    {t.open}
                  </span>
                </span>
                <span className="mt-5 block font-display text-2xl">{t.items[i].title}</span>
                <span className="mt-1 block text-sm text-muted">{t.items[i].body}</span>
              </button>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 text-sm text-muted">
          {t.note}
        </p>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[92svh] w-[min(1200px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {open !== null && (
          <figure className="relative">
            <Image
              src={samples[open].src}
              alt={t.items[open].alt}
              width={samples[open].w}
              height={samples[open].h}
              sizes="94vw"
              className="max-h-[82svh] w-full rounded-2xl bg-white object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-fg">{t.items[open].title}</figcaption>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={t.close}
              autoFocus
              className="absolute -top-4 -end-2 grid size-11 place-items-center rounded-full bg-gold text-on-gold shadow-lg sm:-end-4"
            >
              <X size={20} />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
