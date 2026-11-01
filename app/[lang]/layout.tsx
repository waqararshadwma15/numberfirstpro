import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import "../globals.css";
import { dirOf, getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MotionRoot } from "@/components/motion/MotionRoot";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  preload: false,
});

/* Runs before first paint:
   - applies the saved theme, or the system preference, so there is no flash of the wrong theme;
   - enables scroll reveals only when motion is welcome, falling back to fully visible content
     if the animation layer never starts. */
const bootScript = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('nf-theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';d.dataset.theme=t;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},3000)})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F1417" },
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
  ],
  viewportFit: "cover",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", ar: "/ar" } },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      url: `/${lang}`,
      images: ["/assets/logo.jpg"],
      locale: lang === "ar" ? "ar_SA" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/assets/logo.jpg`,
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    priceRange: "SAR 1,000 - 5,000 / month",
  };

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${cormorant.variable} ${manrope.variable} ${amiri.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-on-gold"
        >
          {t.common.skip}
        </a>
        <Header lang={lang} t={t.common} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t.common} />
        <WhatsAppFloat label={t.common.cta.whatsapp} />
        <MotionRoot />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
