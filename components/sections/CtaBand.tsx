import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type Props = {
  lang: Locale;
  common: Dict["common"];
  title: string;
  lead: string;
  path?: "accounting" | "advisory";
};

/* Closing call to action used on every page: the guided enquiry plus direct channels. */
export function CtaBand({ lang, common, title, lead, path }: Props) {
  const teal = path === "advisory";
  const query = path ? `?path=${path}` : "";
  return (
    <section className="band pt-0" aria-labelledby="cta-title">
      <div className="wrap">
        <div
          data-reveal="scale"
          className="grain relative overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-14 sm:px-12 md:py-20"
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute -top-40 -end-40 size-[520px] rounded-full blur-3xl ${teal ? "bg-teal/20" : "bg-gold/20"}`}
          />
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 id="cta-title" className="text-[clamp(36px,5.5vw,64px)]">
                {title}
              </h2>
              <p className="lead">{lead}</p>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <Link href={`/${lang}/enquire${query}`} className={`btn ${teal ? "btn-teal" : "btn-gold"}`}>
                  {common.cta.assessment}
                  <ArrowRight size={18} className="arrow" />
                </Link>
                <a href={waLink()} target="_blank" rel="noopener" className="btn btn-line">
                  <WhatsAppIcon size={18} />
                  {common.cta.whatsapp}
                </a>
              </div>
            </div>
            <ul className="grid gap-3 text-sm">
              <li>
                <a href={`tel:${site.phone}`} className="flex items-center gap-3 rounded-2xl border border-line bg-ink/60 p-4 hover:border-gold">
                  <Phone size={18} className="text-gold" />
                  <span className="text-muted">{common.contact.mobile}</span>
                  <span dir="ltr" className="ms-auto font-semibold">
                    {site.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl border border-line bg-ink/60 p-4 hover:border-gold">
                  <Mail size={18} className="text-gold" />
                  <span className="text-muted">{common.contact.email}</span>
                  <span dir="ltr" className="ms-auto font-semibold">
                    {site.email}
                  </span>
                </a>
              </li>
              <li className="px-1 text-muted">{common.contact.lead}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
