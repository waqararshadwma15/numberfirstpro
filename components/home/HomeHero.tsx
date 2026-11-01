import Image from "next/image";
import { BookOpenCheck, ChartLine } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { HeroIntro } from "@/components/motion/HeroIntro";
import { PathCard } from "./PathCard";

export function HomeHero({ lang, t, common }: { lang: Locale; t: Dict["home"]; common: Dict["common"] }) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+48px)] pb-20 md:pt-[calc(var(--nav-h)+72px)]">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-32 start-[8%] size-[480px] rounded-full bg-gold/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-40 end-[4%] size-[420px] rounded-full bg-teal/10 blur-[120px]" />

      <HeroIntro className="wrap relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p data-intro className="eyebrow">
              {t.hero.label}
            </p>
            <h1 data-split className="mt-6 text-[clamp(52px,8.6vw,112px)] leading-[0.95] font-semibold rtl:leading-[1.2]">
              {t.hero.titleA} <em className="text-gold italic font-medium">{t.hero.titleB}</em>
            </h1>
            <p data-intro className="lead !mt-7 !text-[clamp(18px,1.8vw,21px)]">
              {t.hero.lead}
            </p>
          </div>
          <div data-intro className="relative mx-auto hidden w-full max-w-[440px] lg:block" data-parallax="0.12">
            <Image
              src="/assets/emblem.png"
              alt={t.hero.emblemAlt}
              width={770}
              height={470}
              priority
              className="h-auto w-full drop-shadow-[0_30px_60px_rgb(240_179_35/0.18)] in-data-[theme=light]:mix-blend-multiply in-data-[theme=light]:drop-shadow-none"
            />
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4 md:mt-20" data-intro>
          <span className="text-sm font-semibold tracking-[0.16em] text-muted uppercase rtl:tracking-normal">{t.hero.choose}</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 [&:has(>a:hover)>a:not(:hover)]:opacity-60">
          <PathCard
            href={`/${lang}/accounting`}
            index={common.pathIndex.accounting}
            tone="gold"
            icon={<BookOpenCheck size={22} />}
            {...t.paths.accounting}
          />
          <PathCard
            href={`/${lang}/advisory`}
            index={common.pathIndex.advisory}
            tone="teal"
            icon={<ChartLine size={22} />}
            {...t.paths.advisory}
          />
        </div>
      </HeroIntro>
    </section>
  );
}
