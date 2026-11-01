type Props = {
  label: string;
  title: string;
  lead?: string;
  tone?: "gold" | "teal";
  align?: "start" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ label, title, lead, tone = "gold", align = "start", className = "", id }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p data-reveal className={`eyebrow ${tone === "teal" ? "eyebrow-teal" : ""} ${center ? "justify-center" : ""}`}>
        {label}
      </p>
      <h2 id={id} data-reveal className="h2">
        {title}
      </h2>
      {lead && (
        <p data-reveal className={`lead ${center ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
