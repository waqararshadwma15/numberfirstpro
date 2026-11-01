"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, REDUCED } from "@/lib/gsap";
import { ThemeToggle } from "./ThemeToggle";

type Props = { lang: Locale; t: Dict["common"] };

export function Header({ lang, t }: Props) {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const other: Locale = lang === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  const rest = pathname.replace(/^\/(en|ar)/, "") || "/";

  const links = [
    { href: `/${lang}/accounting`, label: t.nav.accounting, short: t.navShort.accounting, dot: "bg-gold", active: rest.startsWith("/accounting") },
    { href: `/${lang}/advisory`, label: t.nav.advisory, short: t.navShort.advisory, dot: "bg-teal", active: rest.startsWith("/advisory") },
    { href: `/${lang}#clients`, label: t.nav.clients, active: false },
    { href: `/${lang}/enquire`, label: t.nav.contact, active: rest.startsWith("/enquire") },
  ];

  // Solid background once scrolled, hide on scroll down, reveal on scroll up, reading progress bar.
  useGSAP(
    () => {
      const el = header.current!;
      const bar = el.querySelector<HTMLElement>("[data-progress]")!;
      const reduced = window.matchMedia(REDUCED).matches;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          el.dataset.scrolled = self.scroll() > 12 ? "true" : "false";
          gsap.set(bar, { scaleX: self.progress });
          if (reduced) return;
          const hide = self.direction === 1 && self.scroll() > 320 && !el.dataset.open;
          gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        },
      });
      return () => st.kill();
    },
    { scope: header, dependencies: [pathname], revertOnUpdate: true },
  );

  // Mobile menu: clip-path reveal and staggered links.
  useGSAP(
    () => {
      const p = panel.current;
      if (!p) return;
      if (open) {
        gsap.set(p, { display: "flex" });
        gsap.fromTo(p, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "expo.out" });
        gsap.fromTo(p.querySelectorAll("[data-item]"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.06, delay: 0.12, duration: 0.6 });
      } else {
        gsap.to(p, { clipPath: "inset(0 0 100% 0)", duration: 0.4, ease: "expo.in", onComplete: () => gsap.set(p, { display: "none" }) });
      }
    },
    { dependencies: [open] },
  );

  useEffect(() => {
    if (!open) return;
    const el = header.current!;
    el.dataset.open = "true";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      delete el.dataset.open;
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const saveLang = () => {
    setOpen(false);
    document.cookie = `nf-lang=${other};path=/;max-age=31536000;samesite=lax`;
  };

  return (
    <header
      ref={header}
      data-scrolled="false"
      className="group/h fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-ink/85 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="wrap flex h-[var(--nav-h)] items-center gap-2 sm:gap-4">
        <Link href={`/${lang}`} className="flex min-w-0 items-center gap-3 me-auto lg:me-0" aria-label={`${t.brand} — ${t.nav.home}`}>
          <Image src="/assets/mark.png" alt="" width={40} height={40} className="size-9 rounded-[9px] sm:size-10" priority />
          <span className="font-display text-[15px] font-bold tracking-[0.14em] whitespace-nowrap max-[419px]:hidden sm:text-lg [font-family:var(--font-cormorant)]">
            {t.brand}
          </span>
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              title={l.label}
              className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-fg aria-[current=page]:bg-tint/[0.05] aria-[current=page]:text-fg"
            >
              {l.dot && <span className={`size-1.5 rounded-full ${l.dot}`} aria-hidden />}
              <span className="2xl:hidden">{l.short ?? l.label}</span>
              <span className="hidden 2xl:inline">{l.label}</span>
            </Link>
          ))}
        </nav>

        <ThemeToggle t={t.theme} />
        <Link
          href={switchHref}
          onClick={saveLang}
          hrefLang={other}
          lang={other}
          aria-label={t.switchLangLabel}
          className="btn btn-line !min-h-10 !px-4 !py-2 text-sm whitespace-nowrap"
        >
          {t.switchLang}
        </Link>
        <Link href={`/${lang}/enquire`} className="btn btn-gold !hidden !min-h-11 !py-2.5 text-sm whitespace-nowrap lg:!inline-flex">
          {t.cta.assessmentShort}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.menuClose : t.menuOpen}
          className="grid size-11 place-items-center rounded-xl border border-line lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-gold to-teal rtl:origin-right" style={{ transform: "scaleX(0)" }} data-progress aria-hidden />

      <div
        ref={panel}
        id="mobile-menu"
        className="fixed inset-x-0 top-[var(--nav-h)] bottom-0 hidden flex-col gap-2 overflow-y-auto bg-ink px-4 pt-6 pb-10 lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            data-item
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-4 border-b border-line py-5 font-display text-3xl"
          >
            <span className="flex items-center gap-3">
              <span className="font-sans text-xs text-muted tabular-nums">0{i + 1}</span>
              {l.label}
            </span>
            {l.dot && <span className={`size-2 rounded-full ${l.dot}`} aria-hidden />}
          </Link>
        ))}
        <Link href={`/${lang}/enquire`} data-item onClick={() => setOpen(false)} className="btn btn-gold mt-6 w-full">
          {t.cta.assessment}
          <ArrowRight size={18} className="arrow" />
        </Link>
      </div>
    </header>
  );
}
