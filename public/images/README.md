# KATHA Studio — Image Directory

Drop images at the paths below and they will automatically render across the site. When no image is present, the site falls back to the designed dark-toned card layout.

## Supported formats
`.jpg`, `.jpeg`, `.png`, `.webp` — recommended: **WebP** for smaller size, or **JPG** at 80% quality.

## Paths

### Home page navigation cards
Each home card on the landing page can show a signature image.
```
public/images/home/about.jpg        →  About card
public/images/home/projects.jpg     →  Projects card
public/images/home/services.jpg     →  Services card
public/images/home/contact.jpg      →  Contact card
```
**Recommended dimensions:** 600×900 (portrait, 2:3). Cards are tall.

### Project listing + detail pages
Each project has its own folder. Inside, drop a hero image and gallery images.
```
public/images/projects/courtyard-residence/
├── hero.jpg       →  Listing card + detail page hero
├── 01.jpg         →  Detail page gallery image 1
├── 02.jpg         →  Detail page gallery image 2
└── wide.jpg       →  Detail page full-width image

public/images/projects/stone-and-silence/       (same structure)
public/images/projects/the-gallery-interior/    (same structure)
```
**Recommended dimensions:**
- `hero.jpg` — 1600×1200 (4:3 or 16:9)
- `01.jpg`, `02.jpg` — 1200×900 (4:3)
- `wide.jpg` — 2100×900 (21:9 letterbox)

### Service listing + detail pages
```
public/images/services/architectural-design.jpg
public/images/services/interior-design.jpg
public/images/services/renovation.jpg
public/images/services/consultation.jpg
```
**Recommended dimensions:** 1600×1200 (4:3)

### About page
```
public/images/about/studio.jpg      →  Studio portrait / workspace
```
**Recommended dimensions:** 1200×1600 (portrait) or 1600×1200 (landscape)

### Hero backgrounds (optional)
```
public/images/hero/home.jpg         →  Reserved for future hero backdrop
```

## Notes
- Missing images = graceful fallback to the dark toned card (no broken layout).
- Filenames are case-sensitive on production — use lowercase with hyphens.
- Images are served via Next.js `<Image>` component — automatic optimization, lazy loading, and responsive variants.
- No need to resize manually, but keeping source under 500KB helps load speed.
