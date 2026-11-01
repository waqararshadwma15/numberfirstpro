import { Receipt, Landmark, Users, BadgePercent } from "lucide-react";
import type { Dict } from "@/lib/i18n";

const icons = [Receipt, Landmark, Users, BadgePercent];

export function FactsStrip({ facts, label }: { facts: Dict["home"]["facts"]; label: string }) {
  return (
    <section aria-label={label} className="border-y border-line bg-surface/60">
      <ul className="wrap grid grid-cols-1 divide-line xs:grid-cols-2 lg:grid-cols-4 lg:divide-x rtl:lg:divide-x-reverse">
        {facts.map((f, i) => {
          const Icon = icons[i];
          return (
            <li key={f.title} data-reveal className="flex items-start gap-4 px-2 py-7 lg:px-8">
              <Icon size={22} className="mt-1 shrink-0 text-gold" aria-hidden />
              <div>
                <p className="font-display text-2xl font-semibold">{f.title}</p>
                <p className="mt-1 text-sm text-muted">{f.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
