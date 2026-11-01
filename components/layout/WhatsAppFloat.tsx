import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function WhatsAppFloat({ label }: { label: string }) {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="fixed end-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.6)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 sm:end-6 sm:bottom-6"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
