# KATHA Studio — Image Directory

Drop images at the paths below and they render across the site automatically.
When a file is missing, the layout falls back gracefully to the designed
dark, tone-colored card (no broken images).

## Supported formats
`.webp`, `.jpg`, `.jpeg`, `.png` — **WebP preferred** (smallest size). Source
JPGs at ~80% quality are fine. Filenames are case-sensitive in production —
use lowercase with hyphens.

---

## Home carousel cards
The landing-page carousel has 6 cards. Two are unique to the home page, and
**four reuse the Service images** (see below):

```
public/images/home/studio.webp      →  Studio card
public/images/services/architecture.webp →  Architecture card
public/images/services/interiors.webp    →  Interiors card
public/images/services/renovation.webp   →  Renovation card
public/images/services/advisory.webp     →  Advisory card
public/images/home/contact.webp     →  Contact card
```

**Recommended:** square-ish / 4:3 landscape, ~760px wide, **kept under ~100KB**.
These card images are served directly (Next.js `unoptimized`) because they're
already pre-optimized, so keep the source file small — it is what ships.

**Focal points:** each card crops to several shapes (large near-square when
active, short landscape as a neighbor, landscape on mobile). To bias which part
of the image stays in frame, set a `focal` value (CSS `object-position`, e.g.
`"50% 66%"`) on the card in `lib/data.ts` (services) or `components/site-experience.tsx`
(Studio / Contact). Default is `"50% 50%"`. Keep the key subject near center so
it survives every crop.

---

## Service listing + detail pages
Same four images as the carousel above:
```
public/images/services/architecture.webp
public/images/services/interiors.webp
public/images/services/renovation.webp
public/images/services/advisory.webp
```
**Recommended dimensions:** 1600×1200 (4:3). Each service also has an
`imageCaption` defined in `lib/data.ts` (e.g. "Study · Light & Proportion").

---

## Project listing + detail pages
Each project has its own folder named after its slug. Inside: a numbered cover
(`01-cover`) used on the listing card + detail hero, then numbered gallery
images. Captions and per-image layout (`full`, `offset-left`, `offset-right`,
`portrait`) are configured per project in `lib/data.ts`.

```
public/images/projects/sujan-residency/
├── 01-cover.png      →  Listing card + detail hero
├── 02-exterior.png
├── 03-courtyard.png
├── 04-interior.png
├── 05-detail.png
└── 06-dusk.png

public/images/projects/dhawan-suites/        (01-cover … 07-plan)
public/images/projects/moodabagilu-residency/ (01-cover … 13-view)
public/images/projects/karthik-residency/     (01-cover … — add files to replace the tone-card fallback)
```

**Recommended dimensions:**
- `01-cover` — 1600×1200 (hero)
- gallery — 1200×900 (4:3); `portrait` layout looks best at 900×1200;
  `full` / wide layouts work well around 2100×900.

---

## About page
```
public/images/about/neha-birla.jpeg   →  Founder portrait
```
**Recommended dimensions:** 1200×1600 (portrait) or 1600×1200 (landscape).

## Hero backgrounds (optional / reserved)
```
public/images/hero/   →  Reserved for a future hero backdrop
```

---

## Notes
- Missing file = graceful fallback to the dark tone-colored card.
- Project / service / about images are served through Next.js `<Image>`
  (automatic optimization, lazy loading, responsive variants).
- Home-carousel card images are served **unoptimized** (already pre-sized webp)
  to avoid the dev image-optimizer re-fetching a variant on every carousel
  re-render — so for those, keep the source small.
