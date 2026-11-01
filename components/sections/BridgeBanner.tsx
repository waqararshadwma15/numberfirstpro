import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  index: string;
  label?: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  tone: "gold" | "teal";
};

/* Cross-link from one solution to the other, so visitors see how the two fit together. */
export function BridgeBanner({ index, label, title, body, cta, href, tone }: Props) {
  const gold = tone === "gold";
  return (
    <section className="band">
      <div className="wrap">
        <Link
          href={href}
          data-reveal
          className={`group relative grid items-center gap-8 overflow-hidden rounded-[32px] border border-line bg-surface p-8 transition-colors duration-500 sm:p-12 md:grid-cols-[auto_1fr_auto] ${
            gold ? "hover:border-gold/60" : "hover:border-teal/60"
          }`}
        >
          <span className={`font-display text-[clamp(80px,12vw,150px)] leading-[0.8] ${gold ? "text-gold" : "text-teal"}`}>{index}</span>
          <div>
            {label && <p className={`eyebrow ${gold ? "" : "eyebrow-teal"}`}>{label}</p>}
            <h2 className="mt-3 text-[clamp(30px,4vw,46px)]">{title}</h2>
            <p className="mt-3 max-w-2xl text-muted">{body}</p>
            <p className={`mt-5 font-semibold ${gold ? "text-gold" : "text-teal"}`}>{cta}</p>
          </div>
          <span
            aria-hidden
            className={`grid size-16 place-items-center rounded-full border transition-all duration-500 group-hover:scale-110 ${
              gold ? "border-gold/40 text-gold group-hover:bg-gold group-hover:text-on-gold" : "border-teal/40 text-teal group-hover:bg-teal group-hover:text-on-teal"
            }`}
          >
            <ArrowRight size={26} className="rtl:-scale-x-100" />
          </span>
        </Link>
      </div>
    </section>
  );
}
