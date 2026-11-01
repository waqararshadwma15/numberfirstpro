import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { PathHero } from "@/components/sections/PathHero";
import { ForecastChart } from "@/components/advisory/ForecastChart";
import { AdvisoryServices } from "@/components/advisory/AdvisoryServices";
import { IndustryExplorer } from "@/components/advisory/IndustryExplorer";
import { SampleGallery } from "@/components/advisory/SampleGallery";
import { BridgeBanner } from "@/components/sections/BridgeBanner";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, faqPage, graph, pageMetadata, advisoryService } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/advisory">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).advisory;
  return pageMetadata(lang, "/advisory", meta.title, meta.description);
}

export default async function AdvisoryPage({ params }: PageProps<"/[lang]/advisory">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { advisory: t, common } = getDictionary(lang);

  return (
    <>
      <PathHero
        index={common.pathIndex.advisory}
        label={t.hero.label}
        lines={[t.hero.titleA, t.hero.titleB]}
        lead={t.hero.lead}
        tone="teal"
        primary={{ href: `/${lang}/enquire?path=advisory`, label: common.cta.assessment }}
        secondary={{ href: "#industries", label: t.industries.label }}
        visual={<ForecastChart t={t.chart} />}
      />
      <AdvisoryServices t={t.services} />
      <IndustryExplorer lang={lang} t={t.industries} cta={common.cta.assessment} />
      <SampleGallery t={t.sample} />
      <Faq label={t.faq.label} title={t.faq.title} items={t.faq.items} tone="teal" />
      <BridgeBanner
        index={common.pathIndex.accounting}
        label={t.foundation.label}
        title={t.foundation.title}
        body={t.foundation.body}
        cta={t.foundation.cta}
        href={`/${lang}/accounting#packages`}
        tone="gold"
      />
      <CtaBand lang={lang} common={common} title={t.cta.title} lead={t.cta.lead} path="advisory" />
      <JsonLd
        data={graph(advisoryService(lang), breadcrumbs(lang, [{ name: t.hero.label, path: "/advisory" }]), faqPage(lang, "/advisory", t.faq.items))}
      />
    </>
  );
}
