import type { LucideIcon } from "lucide-react";

type Item = { title: string; body: string };

/* Ledger-style service rows: index, title and body on hairlines, accent sweep on hover. */
export function ServiceList({ items, icons, tone }: { items: Item[]; icons: LucideIcon[]; tone: "gold" | "teal" }) {
  const gold = tone === "gold";
  return (
    <ul className="mt-14 border-t border-line">
      {items.map((s, i) => {
        const Icon = icons[i];
        return (
          <li
            key={s.title}
            data-reveal
            className="group relative isolate grid gap-4 border-b border-line py-8 sm:grid-cols-[80px_1fr] md:grid-cols-[80px_1fr_1.1fr] md:items-center md:gap-10 md:py-10"
          >
            <span
              aria-hidden
              className={`absolute inset-0 -z-10 origin-left scale-x-0 bg-linear-to-r to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 rtl:origin-right rtl:bg-linear-to-l ${
                gold ? "from-gold/8" : "from-teal/8"
              }`}
            />
            <span className={`flex items-center gap-3 ps-1 font-sans text-sm tabular-nums ${gold ? "text-gold" : "text-teal"}`}>
              <Icon size={22} aria-hidden />
              <span className="text-muted">0{i + 1}</span>
            </span>
            <h3 className="text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl rtl:group-hover:-translate-x-2">
              {s.title}
            </h3>
            <p className="text-muted sm:col-start-2 md:col-start-auto">{s.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
