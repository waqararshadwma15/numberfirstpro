import { Plus } from "lucide-react";

type Props = {
  id?: string;
  label: string;
  title: string;
  items: { q: string; a: string }[];
  tone?: "gold" | "teal";
};

/*
 * Visible FAQ matching the page's FAQPage structured data. Native <details> keeps every answer
 * in the HTML (crawlable and quotable) and works without JavaScript.
 */
export function Faq({ id = "faq", label, title, items, tone = "gold" }: Props) {
  const teal = tone === "teal";
  return (
    <section id={id} className="band" aria-labelledby={`${id}-title`}>
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p data-reveal className={`eyebrow ${teal ? "eyebrow-teal" : ""}`}>
            {label}
          </p>
          <h2 id={`${id}-title`} data-reveal className="h2">
            {title}
          </h2>
        </div>
        <div className="border-t border-line">
          {items.map((f, i) => (
            <details key={f.q} data-reveal className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-2xl transition-colors group-hover:text-fg sm:text-[26px]">{f.q}</h3>
                <span
                  aria-hidden
                  className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-open:rotate-45 ${
                    teal ? "group-open:border-teal group-open:bg-teal group-open:text-on-teal" : "group-open:border-gold group-open:bg-gold group-open:text-on-gold"
                  }`}
                >
                  <Plus size={18} />
                </span>
              </summary>
              <p className="max-w-3xl pb-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
