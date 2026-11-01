# Numbers First — numberfirst.pro

Bilingual (English / Arabic) marketing site built around two solutions:
**01 Accounting & Bookkeeping** and **02 Financial Planning & Advisory**.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText (`@gsap/react`) · Lucide.

```bash
npm run dev     # http://localhost:3000 (redirects to /en or /ar)
npm run build && npm start
```

## Routes

| Path | Page |
| --- | --- |
| `/[lang]` | Home: the two-solution choice, comparison, process, clients, sample teaser |
| `/[lang]/accounting` | Services, ZATCA/VAT/Zakat/WPS, balance-sheet package selector, process |
| `/[lang]/advisory` | Advisory services, six-industry explorer, sample report lightbox |
| `/[lang]/enquire` | Three-step free-assessment request |

`proxy.ts` sends locale-less URLs to `/en` or `/ar` (saved `nf-lang` cookie first, then `Accept-Language`).

## Where things live

- **Copy:** `content/en.ts` is the source shape; `content/ar.ts` is typed against it, so a missing Arabic key fails the build.
- **Contact details, client logos, sample pages:** `lib/site.ts`.
- **Brand tokens:** `@theme` in `app/globals.css` (gold = accounting, teal = advisory).
- **Motion:** `components/motion/MotionRoot.tsx` animates any element with `data-reveal`, `data-count` or `data-parallax`, so most sections stay Server Components. Hero entrances use `HeroIntro` (`data-split`, `data-intro`). Everything respects `prefers-reduced-motion`, and content is shown anyway if the script never starts.

## Enquiry form

There's no backend, matching the previous site. The form assembles the request and the visitor sends it on WhatsApp or by email, or copies it.
Links can pre-fill it: `?path=accounting|advisory`, `?plan=starter|standard|growth|premium`, `?industry=sports|realestate|fnb|hospitality|consultancy|creative`.
