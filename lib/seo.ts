import type { Metadata } from "next";
import { getDictionary, locales, type Dict, type Locale } from "./i18n";
import { site } from "./site";

/* Search, answer-engine and generative-engine metadata. Every fact here comes from the site copy. */

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const ogLocale = (lang: Locale) => (lang === "ar" ? "ar_SA" : "en_US");

/** Canonical + hreflang (with x-default) + Open Graph/Twitter for one page in one locale. */
export function pageMetadata(lang: Locale, path: string, title: string, description: string): Metadata {
  const url = `/${lang}${path}`;
  // Pages that set openGraph don't inherit the segment's generated image, so reference it explicitly.
  const image = { url: `/${lang}/opengraph-image`, width: 1200, height: 630, alt: `${site.name} — ${title}` };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(lang),
      alternateLocale: locales.filter((l) => l !== lang).map(ogLocale),
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Business entity, shared by every page through the root layout. */
export function organizationGraph(lang: Locale) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AccountingService", "ProfessionalService"],
        "@id": ORG_ID,
        name: site.name,
        alternateName: "NumbersFirst",
        url: site.url,
        logo: `${site.url}/assets/logo.jpg`,
        image: `${site.url}/assets/logo.jpg`,
        description: t.meta.siteDescription,
        telephone: site.phone,
        email: site.email,
        priceRange: "SAR 1,000 - SAR 5,000 per month",
        currenciesAccepted: "SAR",
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        knowsLanguage: ["en", "ar"],
        knowsAbout: [
          "Bookkeeping",
          "VAT returns",
          "Zakat filing",
          "ZATCA e-invoicing (Fatoora)",
          "Payroll and WPS",
          "Mudad compliance",
          "Management reporting",
          "Budgeting and forecasting",
          "Cash-flow forecasting",
          "Financial advisory",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: site.phone,
            email: site.email,
            areaServed: "SA",
            availableLanguage: ["English", "Arabic"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        inLanguage: ["en", "ar"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbs(lang: Locale, trail: Crumb[]) {
  const home = getDictionary(lang).common.nav.home;
  const items = [{ name: home, path: "" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}/${lang}${c.path}`,
    })),
  };
}

export function faqPage(lang: Locale, path: string, items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/${lang}${path}#faq`,
    inLanguage: lang,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Accounting & Bookkeeping as a Service with the four published packages as offers. */
export function accountingService(lang: Locale) {
  const t: Dict["accounting"] = getDictionary(lang).accounting;
  return {
    "@type": "Service",
    "@id": `${site.url}/${lang}/accounting#service`,
    name: t.hero.label,
    serviceType: "Bookkeeping, VAT and Zakat filing, ZATCA e-invoicing, payroll and WPS",
    description: t.meta.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    inLanguage: lang,
    url: `${site.url}/${lang}/accounting`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.packages.title,
      itemListElement: t.packages.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: `${t.packages.balanceSheet}: ${p.criteria}. ${p.features.join(", ")}.`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price,
          priceCurrency: "SAR",
          unitCode: "MON",
          valueAddedTaxIncluded: false,
        },
        url: `${site.url}/${lang}/accounting#packages`,
      })),
    },
  };
}

export function advisoryService(lang: Locale) {
  const t: Dict["advisory"] = getDictionary(lang).advisory;
  return {
    "@type": "Service",
    "@id": `${site.url}/${lang}/advisory#service`,
    name: t.hero.label,
    serviceType: "Financial planning, budgeting, cash-flow forecasting and financial advisory",
    description: t.meta.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    inLanguage: lang,
    url: `${site.url}/${lang}/advisory`,
    audience: t.industries.items.map((i) => ({ "@type": "BusinessAudience", name: i.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.body },
      })),
    },
  };
}

/** Wraps page-level nodes into one JSON-LD document. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
