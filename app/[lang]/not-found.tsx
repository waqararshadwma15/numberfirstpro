import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale } from "@/lib/i18n";

export default async function NotFound() {
  const value = await rootLang();
  const lang = value && hasLocale(value) ? value : defaultLocale;
  const t = getDictionary(lang).common;
  return (
    <section className="wrap grid min-h-[80svh] place-content-center py-32 text-center">
      <p className="font-display text-[120px] leading-none text-gold">404</p>
      <h1 className="mt-6 text-4xl sm:text-5xl">{t.notFound.title}</h1>
      <p className="lead mx-auto">{t.notFound.lead}</p>
      <div className="mt-8">
        <Link href={`/${lang}`} className="btn btn-gold">
          {t.cta.backHome}
        </Link>
      </div>
    </section>
  );
}
