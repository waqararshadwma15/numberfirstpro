import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales } from "@/lib/locales";

/* Send locale-less URLs to /en or /ar: a saved choice wins, then the browser's first language. */
function pickLocale(request: NextRequest) {
  const saved = request.cookies.get("nf-lang")?.value;
  if (saved && hasLocale(saved)) return saved;
  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return first && hasLocale(first) ? first : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|assets|api|.*\\..*).*)"],
};
