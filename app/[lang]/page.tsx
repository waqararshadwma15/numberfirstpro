import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { HomeHero } from "@/components/home/HomeHero";
import { FactsStrip } from "@/components/home/FactsStrip";
import { ChooseCompare } from "@/components/home/ChooseCompare";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { SampleTeaser } from "@/components/home/SampleTeaser";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPage, graph, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return pageMetadata(lang, "", meta.siteTitle, meta.siteDescription);
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <HomeHero lang={lang} t={t.home} common={t.common} />
      <FactsStrip facts={t.home.facts} label={t.home.hero.label} />
      <ChooseCompare lang={lang} t={t.home.choose} common={t.common} />
      <ProcessTimeline t={t.home.process} />
      <ClientsMarquee t={t.home.clients} />
      <SampleTeaser lang={lang} t={t.home.sample} />
      <Faq label={t.home.faq.label} title={t.home.faq.title} items={t.home.faq.items} />
      <CtaBand lang={lang} common={t.common} title={t.home.cta.title} lead={t.home.cta.lead} />
      <JsonLd data={graph(faqPage(lang, "", t.home.faq.items))} />
    </>
  );
}
