"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, ChartLine, Check, Copy, Layers, Mail, CircleHelp, type LucideIcon } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { mailLink, waLink } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Path = "accounting" | "advisory" | "both" | "unsure";
type Field = "path" | "name" | "phone" | "email";

const PATHS: { key: Path; icon: LucideIcon; tone: string }[] = [
  { key: "accounting", icon: BookOpenCheck, tone: "gold" },
  { key: "advisory", icon: ChartLine, tone: "teal" },
  { key: "both", icon: Layers, tone: "gold" },
  { key: "unsure", icon: CircleHelp, tone: "muted" },
];
const PLAN_KEYS = ["starter", "standard", "growth", "premium"];

type Props = { t: Dict["enquire"]; industryKeys: string[] };

/*
 * Three-step free assessment request. There is no backend: like the live site, the request is
 * assembled into a message the visitor sends on WhatsApp or by email (or copies).
 * Pre-fills from ?path=, ?plan= (balance-sheet band) and ?industry= links elsewhere on the site.
 */
export function EnquiryForm({ t, industryKeys }: Props) {
  const params = useSearchParams();
  const uid = useId();
  const scope = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const [data, setData] = useState(() => {
    const path = params.get("path");
    const plan = PLAN_KEYS.indexOf(params.get("plan") ?? "");
    const industry = industryKeys.indexOf(params.get("industry") ?? "");
    return {
      path: (PATHS.some((p) => p.key === path) ? path : "") as Path | "",
      name: "",
      company: "",
      phone: "",
      email: "",
      industry: industry >= 0 ? t.industries[industry] : "",
      balance: plan >= 0 ? t.balances[plan] : "",
      needs: [] as string[],
      message: "",
    };
  });
  const [step, setStep] = useState(() => (data.path ? 1 : 0));
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [copied, setCopied] = useState(false);
  const moved = useRef(false);

  const set = <K extends keyof typeof data>(key: K, value: (typeof data)[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Animate each step in (direction-aware) and move focus to its heading after user navigation.
  useGSAP(
    () => {
      if (moved.current) heading.current?.focus({ preventScroll: true });
      if (!moved.current || !window.matchMedia(MOTION_OK).matches) return;
      const rtl = document.documentElement.dir === "rtl";
      gsap.fromTo("[data-step-panel] > *", { x: rtl ? -32 : 32, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, ease: "expo.out" });
      gsap.to("[data-step-bar]", { scaleX: (step + 1) / 3, duration: 0.8, ease: "expo.out" });
    },
    { scope, dependencies: [step] },
  );

  const go = (n: number) => {
    moved.current = true;
    setStep(n);
    scope.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validate = (): boolean => {
    const e: Partial<Record<Field, string>> = {};
    if (step === 0 && !data.path) e.path = t.errors.path;
    if (step === 1) {
      if (!data.name.trim()) e.name = t.errors.name;
      if (data.phone.replace(/\D/g, "").length < 7) e.phone = t.errors.phone;
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t.errors.email;
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) scope.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2 && validate()) go(step + 1);
  };

  const showBalance = data.path !== "advisory";
  const needGroups =
    data.path === "accounting"
      ? [t.needs.accounting]
      : data.path === "advisory"
        ? [t.needs.advisory]
        : [t.needs.accounting, t.needs.advisory];

  const s = t.summary;
  const solution = data.path ? t.options[data.path].title : "-";
  const message = [
    s.heading,
    `${s.solution}: ${solution}`,
    `${s.name}: ${data.name.trim()}`,
    `${s.company}: ${data.company.trim() || "-"}`,
    `${s.phone}: ${data.phone.trim()}`,
    `${s.email}: ${data.email.trim() || "-"}`,
    `${s.industry}: ${data.industry || "-"}`,
    ...(showBalance ? [`${s.balance}: ${data.balance || "-"}`] : []),
    `${s.needs}: ${data.needs.join(", ") || "-"}`,
    `${s.message}: ${data.message.trim() || "-"}`,
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const pre = scope.current?.querySelector("pre");
      if (pre) window.getSelection()?.selectAllChildren(pre);
    }
  };

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className="text-sm text-danger" role="alert">
        {errors[f]}
      </p>
    ) : null;
  const aria = (f: Field) => ({ "aria-invalid": !!errors[f], "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined });

  return (
    <form ref={scope} onSubmit={onSubmit} noValidate className="card relative scroll-mt-28 overflow-hidden p-6 sm:p-10">
      {/* progress */}
      <div className="flex items-center justify-between gap-4 text-sm">
        <ol className="flex gap-4 sm:gap-6">
          {t.steps.map((label, i) => (
            <li key={label} aria-current={i === step ? "step" : undefined} className={`flex items-center gap-2 ${i <= step ? "text-fg" : "text-muted"}`}>
              <span
                className={`grid size-6 place-items-center rounded-full text-xs font-bold transition-colors ${
                  i < step ? "bg-gold text-on-gold" : i === step ? "border border-gold text-gold" : "border border-line"
                }`}
              >
                {i < step ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </li>
          ))}
        </ol>
        <span className="text-xs text-muted">{t.stepOf.replace("{n}", String(step + 1)).replace("{total}", "3")}</span>
      </div>
      <div className="mt-5 h-px bg-line">
        <div data-step-bar className="h-px origin-left bg-gold rtl:origin-right" style={{ transform: `scaleX(${(step + 1) / 3})` }} />
      </div>

      <div data-step-panel className="mt-9">
        {step === 0 && (
          <fieldset>
            <legend className="contents">
              <h2 ref={heading} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
                {t.q1}
              </h2>
            </legend>
            <div role="radiogroup" className="mt-7 grid gap-3 sm:grid-cols-2" {...aria("path")}>
              {PATHS.map(({ key, icon: Icon, tone }) => {
                const checked = data.path === key;
                return (
                  <label
                    key={key}
                    className={`group relative flex cursor-pointer gap-4 rounded-2xl border p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                      checked ? (tone === "teal" ? "border-teal bg-teal/10" : "border-gold bg-gold/10") : "border-line hover:border-muted/50"
                    }`}
                  >
                    <input type="radio" name="path" value={key} checked={checked} onChange={() => set("path", key)} className="sr-only" />
                    <span
                      className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                        tone === "teal" ? "bg-teal/15 text-teal" : tone === "gold" ? "bg-gold/15 text-gold" : "bg-tint/5 text-muted"
                      }`}
                    >
                      <Icon size={22} aria-hidden />
                    </span>
                    <span className="pe-6">
                      <span className="block font-semibold">{t.options[key].title}</span>
                      <span className="mt-1 block text-sm text-muted">{t.options[key].body}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`absolute top-4 end-4 grid size-5 place-items-center rounded-full border transition-colors ${
                        checked ? (tone === "teal" ? "border-teal bg-teal text-on-teal" : "border-gold bg-gold text-on-gold") : "border-line"
                      }`}
                    >
                      {checked && <Check size={12} strokeWidth={3.5} />}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="mt-3">{err("path")}</div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-5">
            <h2 ref={heading} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
              {t.q2}
            </h2>
            <p className="-mt-2 text-sm text-muted">
              <span className={data.path === "advisory" ? "text-teal" : "text-gold"}>●</span> {solution}{" "}
              <button type="button" onClick={() => go(0)} className="ms-1 underline underline-offset-4 hover:text-fg">
                {t.edit}
              </button>
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="field">
                <label htmlFor={`${uid}-name`}>{t.fields.name} *</label>
                <input id={`${uid}-name`} name="name" className="input" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
                {err("name")}
              </div>
              <div className="field">
                <label htmlFor={`${uid}-co`}>{t.fields.company}</label>
                <input id={`${uid}-co`} name="company" className="input" autoComplete="organization" value={data.company} onChange={(e) => set("company", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor={`${uid}-ph`}>{t.fields.phone} *</label>
                <input
                  id={`${uid}-ph`}
                  name="phone"
                  type="tel"
                  dir="ltr"
                  className="input rtl:text-right"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+966 5X XXX XXXX"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  {...aria("phone")}
                />
                {err("phone")}
              </div>
              <div className="field">
                <label htmlFor={`${uid}-em`}>{t.fields.email}</label>
                <input
                  id={`${uid}-em`}
                  name="email"
                  type="email"
                  dir="ltr"
                  className="input rtl:text-right"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  {...aria("email")}
                />
                {err("email")}
              </div>
              <div className="field">
                <label htmlFor={`${uid}-ind`}>{t.fields.industry}</label>
                <select id={`${uid}-ind`} name="industry" className="input" value={data.industry} onChange={(e) => set("industry", e.target.value)}>
                  <option value="">{t.fields.select}</option>
                  {t.industries.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              {showBalance && (
                <div className="field">
                  <label htmlFor={`${uid}-bs`}>{t.fields.balance}</label>
                  <select id={`${uid}-bs`} name="balance" className="input" value={data.balance} onChange={(e) => set("balance", e.target.value)}>
                    <option value="">{t.fields.select}</option>
                    {t.balances.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <fieldset className="field">
              <legend className="mb-3">{t.fields.needs}</legend>
              <div className="grid gap-4">
                {needGroups.map((group, g) => (
                  <div key={g} className="flex flex-wrap gap-2">
                    {group.map((n) => {
                      const on = data.needs.includes(n);
                      return (
                        <label
                          key={n}
                          className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold ${
                            on ? "border-gold bg-gold text-on-gold" : "border-line text-muted hover:border-muted/60 hover:text-fg"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={on}
                            onChange={() => set("needs", on ? data.needs.filter((x) => x !== n) : [...data.needs, n])}
                          />
                          {on && <Check size={14} strokeWidth={3} aria-hidden />}
                          {n}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor={`${uid}-msg`}>{t.fields.message}</label>
              <textarea
                id={`${uid}-msg`}
                name="message"
                rows={4}
                className="input resize-y"
                placeholder={t.fields.messagePlaceholder}
                value={data.message}
                onChange={(e) => set("message", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5">
            <span className="grid size-14 place-items-center rounded-full bg-gold text-on-gold">
              <Check size={28} strokeWidth={3} aria-hidden />
            </span>
            <h2 ref={heading} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
              {t.q3}
            </h2>
            <p className="-mt-2 text-muted">{t.q3lead}</p>
            <pre className="max-h-72 overflow-auto rounded-2xl border border-line bg-ink p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap">{message}</pre>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={waLink(message)} target="_blank" rel="noopener" className="btn btn-gold">
                <WhatsAppIcon size={18} />
                {t.sendWhatsapp}
              </a>
              <a href={mailLink(s.subject, message)} className="btn btn-line">
                <Mail size={18} aria-hidden />
                {t.sendEmail}
              </a>
              <button type="button" onClick={copy} className="btn btn-line" aria-live="polite">
                {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-fg">
            <ArrowLeft size={16} className="rtl:-scale-x-100" aria-hidden />
            {step === 2 ? t.edit : t.back}
          </button>
        ) : (
          <span />
        )}
        {step < 2 && (
          <button type="submit" className="btn btn-gold">
            {step === 0 ? t.next : t.review}
            <ArrowRight size={18} className="arrow" />
          </button>
        )}
      </div>
    </form>
  );
}
