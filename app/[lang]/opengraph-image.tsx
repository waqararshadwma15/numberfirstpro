import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { locales } from "@/lib/locales";

/* Social share card for every page. Text is English in both locales: the built-in OG font has no
   Arabic glyphs, and the brand name and service labels read the same to both audiences. */

export const alt = "Numbers First — Bookkeeping & Financial Advisory in Saudi Arabia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const emblem = `data:image/png;base64,${await readFile(join(process.cwd(), "public/assets/emblem.png"), "base64")}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 20%, #2a2410 0%, #0f1417 55%)",
          color: "#f1f2f0",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 6, color: "#f0b323", fontFamily: "sans-serif" }}>NUMBERS FIRST</div>
            <div style={{ fontSize: 84, lineHeight: 1.05, marginTop: 28, display: "flex", flexWrap: "wrap" }}>
              Your numbers,&nbsp;<span style={{ color: "#f0b323", fontStyle: "italic" }}>first.</span>
            </div>
            <div style={{ fontSize: 30, color: "#a8b1b6", marginTop: 20, fontFamily: "sans-serif" }}>
              Bookkeeping & financial advisory for Saudi SMEs
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} width={330} height={201} alt="" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", padding: "16px 26px", borderRadius: 999, border: "2px solid #f0b323", fontSize: 26 }}>
            01 · Accounting & Bookkeeping
          </div>
          <div style={{ display: "flex", padding: "16px 26px", borderRadius: 999, border: "2px solid #3fbfae", fontSize: 26 }}>
            02 · Financial Planning & Advisory
          </div>
          <div style={{ display: "flex", marginLeft: "auto", alignItems: "center", fontSize: 24, color: "#a8b1b6" }}>
            numberfirst.pro
          </div>
        </div>
      </div>
    ),
    size,
  );
}
