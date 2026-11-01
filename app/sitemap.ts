import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { site } from "@/lib/site";

const pages = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/accounting", priority: 0.9, changeFrequency: "monthly" },
  { path: "/advisory", priority: 0.9, changeFrequency: "monthly" },
  { path: "/enquire", priority: 0.7, changeFrequency: "yearly" },
] as const;

// Bump when page content changes meaningfully.
const LAST_UPDATED = new Date("2026-11-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${p.path}`,
      lastModified: LAST_UPDATED,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${p.path}`])),
          "x-default": `${site.url}/en${p.path}`,
        },
      },
    })),
  );
}
