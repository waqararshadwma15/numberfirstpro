import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Numbers First — Bookkeeping & Financial Advisory",
    short_name: "Numbers First",
    description:
      "Monthly bookkeeping, VAT and Zakat filing, ZATCA e-invoicing, payroll (WPS) and financial advisory for Saudi SMEs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F1417",
    theme_color: "#0F1417",
    icons: [{ src: "/icon.png", sizes: "120x120", type: "image/png" }],
  };
}
