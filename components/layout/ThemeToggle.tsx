"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type Theme = "light" | "dark";
const KEY = "nf-theme";
const BROWSER_UI = { dark: "#0F1417", light: "#F7F5F0" };

/* The inline script in the root layout sets data-theme before paint; this keeps React in sync with it. */
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const current = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", BROWSER_UI[theme]));
}

function saved(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle({ t }: { t: Dict["common"]["theme"] }) {
  const button = useRef<HTMLButtonElement>(null);
  const first = useRef(true);
  const theme = useSyncExternalStore(subscribe, current, () => "dark" as Theme);

  // Match the browser UI color, and follow system changes until the visitor makes a choice.
  useEffect(() => {
    apply(current());
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => !saved() && apply(mq.matches ? "light" : "dark");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Spin the new icon in on each change (not on first render).
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (!window.matchMedia(MOTION_OK).matches) return;
      gsap.fromTo("svg", { rotate: -120, scale: 0.4, autoAlpha: 0 }, { rotate: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(2)" });
    },
    { scope: button, dependencies: [theme] },
  );

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch {}

    if (!document.startViewTransition || !window.matchMedia(MOTION_OK).matches) {
      apply(next);
      return;
    }
    // Circular reveal of the new theme, growing out of the toggle.
    const r = button.current!.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(() => apply(next)).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const label = theme === "dark" ? t.toLight : t.toDark;
  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors hover:border-gold hover:text-gold sm:size-11"
    >
      {/* both rendered; CSS picks by data-theme so the icon is right before hydration too */}
      <Sun size={19} aria-hidden className="in-data-[theme=light]:hidden" />
      <Moon size={18} aria-hidden className="hidden in-data-[theme=light]:block" />
    </button>
  );
}
