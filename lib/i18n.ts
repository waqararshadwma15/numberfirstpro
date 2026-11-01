import { en, type Dict } from "@/content/en";
import { ar } from "@/content/ar";
import type { Locale } from "./locales";

export type { Dict };
export * from "./locales";

const dictionaries: Record<Locale, Dict> = { en, ar };

export const getDictionary = (lang: Locale): Dict => dictionaries[lang];

/** Build a locale-prefixed href, e.g. href("ar", "/accounting") -> "/ar/accounting". */
export const href = (lang: Locale, path = "") => `/${lang}${path}`;
