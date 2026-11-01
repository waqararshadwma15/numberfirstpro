import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ChooseCompare({ lang, t, common }: { lang: Locale; t: Dict["home"]["choose"]; common: Dict["common"] }) {
  const columns = [
    { key: "accounting", data: t.accounting, href: `/${lang}/accounting`, cta: common.nav.accounting, gold: true },
    { key: "advisory", data: t.advisory, href: `/${lang}/advisory`, cta: common.nav.advisory, gold: false },
  ];

  return (
    <section className="band">
      <div className="wrap">
        <SectionHeading label={t.label} title={t.title} lead={t.lead} />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-2">
          {columns.map((c) => (
            <article
              key={c.key}
              data-reveal
              className={`card relative overflow-hidden p-7 sm:p-10 ${c.gold ? "" : "lg:mt-16"}`}
            >
              <span aria-hidden className={`absolute inset-y-0 start-0 w-1 ${c.gold ? "bg-gold" : "bg-teal"}`} />
              <h3 className="text-3xl sm:text-4xl">{c.data.title}</h3>
              <ul className="mt-8 grid gap-4">
                {c.data.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span
                      className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${
                        c.gold ? "bg-gold/15 text-gold" : "bg-teal/15 text-teal"
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-fg/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={c.href}
                className={`mt-10 inline-flex items-center gap-2 font-semibold ${c.gold ? "text-gold" : "text-teal"} group`}
              >
                {c.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </Link>
            </article>
          ))}
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 hidden size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink text-muted lg:grid"
          >
            <Plus size={22} />
          </span>
        </div>

        <div
          data-reveal
          className="mt-5 flex flex-col items-start justify-between gap-6 rounded-3xl border border-gold/25 bg-linear-to-r from-gold/10 via-transparent to-teal/10 p-7 sm:p-10 md:flex-row md:items-center"
        >
          <div className="max-w-2xl">
            <h3 className="text-3xl">{t.both.title}</h3>
            <p className="mt-3 text-muted">{t.both.body}</p>
          </div>
          <Link href={`/${lang}/accounting#packages`} className="btn btn-line shrink-0">
            {t.both.cta}
            <ArrowRight size={18} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
