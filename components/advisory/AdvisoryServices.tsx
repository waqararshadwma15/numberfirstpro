import { ChartLine, BadgePercent, Building2, ChartColumn, Compass, Presentation } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [ChartLine, BadgePercent, Building2, ChartColumn, Compass, Presentation];

export function AdvisoryServices({ t }: { t: Dict["advisory"]["services"] }) {
  return (
    <section className="band pt-8">
      <div className="wrap">
        <SectionHeading label={t.label} title={t.title} lead={t.lead} tone="teal" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} data-reveal className="group relative isolate flex flex-col bg-ink p-8 sm:p-10">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[radial-gradient(400px_circle_at_0%_0%,rgb(63_191_174/0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 rtl:bg-[radial-gradient(400px_circle_at_100%_0%,rgb(63_191_174/0.12),transparent_70%)]"
                />
                <span className="grid size-12 place-items-center rounded-2xl border border-teal/30 text-teal transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-8 text-[28px]">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
