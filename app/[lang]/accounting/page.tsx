import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpenCheck, Receipt, Users, FileSpreadsheet } from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { PathHero } from "@/components/sections/PathHero";
import { MonthlyCloseCard } from "@/components/accounting/MonthlyCloseCard";
import { ComplianceGrid } from "@/components/accounting/ComplianceGrid";
import { PackagesSelector } from "@/components/accounting/PackagesSelector";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "@/components/sections/ServiceList";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { BridgeBanner } from "@/components/sections/BridgeBanner";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, faqPage, graph, pageMetadata, accountingService } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/accounting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).accounting;
  return pageMetadata(lang, "/accounting", meta.title, meta.description);
}

export default async function AccountingPage({ params }: PageProps<"/[lang]/accounting">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { accounting: t, common, home } = getDictionary(lang);

  return (
    <>
      <PathHero
        index={common.pathIndex.accounting}
        label={t.hero.label}
        lines={[t.hero.titleA, t.hero.titleB, t.hero.titleC]}
        lead={t.hero.lead}
        tone="gold"
        primary={{ href: `/${lang}/enquire?path=accounting`, label: common.cta.assessment }}
        secondary={{ href: "#packages", label: common.cta.packages }}
        visual={<MonthlyCloseCard t={t.checklist} />}
      />

      <section className="band pt-8">
        <div className="wrap">
          <SectionHeading label={t.services.label} title={t.services.title} lead={t.services.lead} />
          <ServiceList items={t.services.items} icons={[BookOpenCheck, Receipt, Users, FileSpreadsheet]} tone="gold" />
        </div>
      </section>

      <ComplianceGrid t={t.compliance} />
      <PackagesSelector lang={lang} t={t.packages} />
      <ProcessTimeline t={home.process} />

      <Faq label={t.faq.label} title={t.faq.title} items={t.faq.items} tone="gold" />
      <BridgeBanner
        index={common.pathIndex.advisory}
        title={t.advisoryBridge.title}
        body={t.advisoryBridge.body}
        cta={t.advisoryBridge.cta}
        href={`/${lang}/advisory`}
        tone="teal"
      />

      <CtaBand lang={lang} common={common} title={t.cta.title} lead={t.cta.lead} path="accounting" />
      <JsonLd
        data={graph(accountingService(lang), breadcrumbs(lang, [{ name: t.hero.label, path: "/accounting" }]), faqPage(lang, "/accounting", t.faq.items))}
      />
    </>
  );
}
