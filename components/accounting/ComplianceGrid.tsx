import type { Dict } from "@/lib/i18n";

export function ComplianceGrid({ t }: { t: Dict["accounting"]["compliance"] }) {
  return (
    <section className="band bg-surface">
      <div className="wrap">
        <p data-reveal className="eyebrow">
          {t.label}
        </p>
        <h2 data-reveal className="h2 max-w-3xl">
          {t.title}
        </h2>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((c) => (
            <li
              key={c.tag}
              data-reveal
              className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-line bg-ink p-7 transition-colors duration-500 hover:border-gold/50"
            >
              <span className="font-display text-[clamp(44px,5vw,60px)] leading-none font-bold text-transparent [-webkit-text-stroke:1px_var(--color-gold)] transition-colors duration-500 group-hover:text-gold">
                {c.tag}
              </span>
              <div className="mt-auto pt-10">
                <h3 className="text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
