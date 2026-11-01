import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { samples } from "@/lib/site";

export function SampleTeaser({ lang, t }: { lang: Locale; t: Dict["home"]["sample"] }) {
  return (
    <section className="band overflow-hidden">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p data-reveal className="eyebrow eyebrow-teal">
            {t.label}
          </p>
          <h2 data-reveal className="h2">
            {t.title}
          </h2>
          <p data-reveal className="lead">
            {t.lead}
          </p>
          <div data-reveal className="mt-8">
            <Link href={`/${lang}/advisory#sample`} className="btn btn-line">
              {t.cta}
              <ArrowRight size={18} className="arrow" />
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3]" aria-hidden>
          {samples.map((s, i) => (
            <div
              key={s.src}
              data-parallax={String(0.08 + i * 0.1)}
              className="absolute w-[78%] overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/50"
              style={{
                insetInlineStart: `${i * 11}%`,
                top: `${i * 16}%`,
                zIndex: i,
                rotate: `${(i - 1) * 2.5}deg`,
              }}
            >
              <Image src={s.src} alt="" width={s.w} height={s.h} sizes="(min-width: 1024px) 560px, 80vw" className="h-auto w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
