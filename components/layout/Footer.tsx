import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";

export function Footer({ lang, t }: { lang: Locale; t: Dict["common"] }) {
  const contact = [
    { label: t.contact.mobile, value: site.phoneDisplay, href: `tel:${site.phone}` },
    { label: t.contact.whatsapp, value: site.phoneDisplay, href: waLink(), external: true },
    { label: t.contact.email, value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <footer className="border-t border-line bg-footer">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/assets/logo.jpg" alt={`${site.name} — ${t.footer.tagline}`} width={180} height={120} className="rounded-xl" />
          <p className="mt-6 max-w-sm text-sm text-muted">{t.footer.serving}</p>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-muted uppercase [font-family:var(--font-sans)] rtl:tracking-normal">
            {t.footer.solutions}
          </h2>
          <ul className="mt-5 grid gap-3">
            <li>
              <Link href={`/${lang}/accounting`} className="group flex items-center gap-3 hover:text-gold">
                <span className="font-sans text-xs text-gold tabular-nums">{t.pathIndex.accounting}</span>
                {t.nav.accounting}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/advisory`} className="group flex items-center gap-3 hover:text-teal">
                <span className="font-sans text-xs text-teal tabular-nums">{t.pathIndex.advisory}</span>
                {t.nav.advisory}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/enquire`} className="hover:text-gold">
                {t.cta.assessment}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-muted uppercase [font-family:var(--font-sans)] rtl:tracking-normal">
            {t.contact.title}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.contact.lead}</p>
          <dl className="mt-5 grid gap-3 text-sm">
            {contact.map((c) => (
              <div key={c.label} className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-3">
                <dt className="text-muted">{c.label}</dt>
                <dd>
                  <a href={c.href} dir="ltr" className="hover:text-gold" {...(c.external && { target: "_blank", rel: "noopener" })}>
                    {c.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-6 text-xs text-muted">numberfirst.pro · {t.footer.rights}</p>
      </div>
    </footer>
  );
}
