export type Tone = "default" | "warm" | "cool";

export type Service = {
  slug: string;
  id: string;
  title: string;
  category: string;
  desc: string;
  /** Optional additional paragraphs for the detail page */
  paragraphs?: string[];
  /** Short editorial pull-quote shown beneath the heading. */
  tagline?: string;
  /** Editorial scope list rendered as the "What's Included" sheet on the
   *  detail page. Keep entries to 2–4 words for a confident, tabular feel. */
  scope?: string[];
  tone: Tone;
  /** Optional image path relative to /public. Falls back to tone-colored card. */
  image?: string;
  /** Caption shown beneath the detail-page image. */
  imageCaption?: string;
  /** Home-carousel focal point ("x% y%") for object-position so the subject
   *  stays framed when the card crops to its square / landscape states. */
  focal?: string;
};

/** Canonical Notes topics — used for the register label and filter chips. */
export const noteTopics = [
  "Design",
  "Process",
  "Materials",
  "Travel",
  "Observations",
] as const;
export type NoteTopic = (typeof noteTopics)[number];

export type Note = {
  slug: string;
  /** Two-digit index displayed in the register (01 · 02 · 03). */
  id: string;
  title: string;
  /** Topic shown as the register/eyebrow label and used by the filter chips. */
  category: NoteTopic;
  /** Human-readable date, e.g. "March 2026" — or a season for forthcoming. */
  date: string;
  /** Short editorial lede — shown as the register dek and the reading lede. */
  excerpt: string;
  /** Body paragraphs for the reading view. The first carries a drop cap. */
  paragraphs: string[];
  /** Optional editorial pull-quote surfaced inside the reading view. */
  pullquote?: string;
  /** Estimated read time, e.g. "4 min". Shown in the register meta. */
  readTime?: string;
  /** "forthcoming" entries render as a dimmed, non-clickable register row. */
  status?: "published" | "forthcoming";
  tone: Tone;
};

/** Material accents drawn from the studio's palette — limewash, slate, sage.
 *  The single point of color in the otherwise ink-on-parchment Notes world. */
export const toneAccent: Record<Tone, string> = {
  warm: "#c8a882", // limewash sand
  cool: "#8b9eb4", // slate stone
  default: "#a8b49c", // sage verdigris
};

/* ───────────────────────── Services ────────────────────────── */

export const services: Service[] = [
  {
    slug: "architecture",
    id: "01",
    title: "Architecture",
    category: "Homes & Buildings",
    tagline: "Homes and buildings designed with clarity and purpose.",
    desc: "Homes and buildings designed with clarity, purpose and a strong connection to the people who use them.",
    paragraphs: [
      "We design homes and buildings with clarity, purpose and a strong connection to the people who use them.",
      "Every project begins by understanding how you want to live or work. From there, we shape spaces around light, proportion and the way a place is meant to feel — considered carefully from the first sketch to the final detail.",
    ],
    scope: ["New Homes", "Buildings", "Concept Design", "Detailing"],
    tone: "warm",
    image: "/images/services/architecture.webp",
    imageCaption: "Study · Light & Proportion",
    focal: "50% 55%",
  },
  {
    slug: "interiors",
    id: "02",
    title: "Interiors",
    category: "Spaces & Detailing",
    tagline: "Spaces shaped through materiality, light and thoughtful detailing.",
    desc: "Spaces shaped through materiality, light and thoughtful detailing.",
    paragraphs: [
      "We shape interiors through materiality, light and thoughtful detailing.",
      "The work is in the considered choices — the texture of a surface, the proportion of a room, the way light moves across the day. Our interiors are calm, tactile and made to be lived in.",
    ],
    scope: ["Layouts", "Materials", "Joinery", "Lighting"],
    tone: "cool",
    image: "/images/services/interiors.webp",
    imageCaption: "Study · Material & Detail",
    focal: "50% 66%",
  },
  {
    slug: "renovation",
    id: "03",
    title: "Renovation",
    category: "Evolving Spaces",
    tagline: "Helping existing spaces evolve while building on their strengths.",
    desc: "Helping existing spaces evolve while building on their strengths.",
    paragraphs: [
      "We help existing spaces evolve while building on their strengths.",
      "Older homes and buildings carry character worth keeping. We work with what is already there — improving how a space functions and feels, while staying honest to what made it worth holding on to.",
    ],
    scope: ["Reworking", "Restoration", "Extensions", "Adaptation"],
    tone: "default",
    image: "/images/services/renovation.webp",
    imageCaption: "Study · The Existing",
    focal: "50% 50%",
  },
  {
    slug: "advisory",
    id: "04",
    title: "Advisory",
    category: "Guidance & Planning",
    tagline: "Guidance through planning, decision-making and execution.",
    desc: "Providing guidance through planning, decision-making and execution.",
    paragraphs: [
      "We provide guidance through planning, decision-making and execution.",
      "Not every project needs a full design service. Sometimes what helps most is clear advice at the right moment — on feasibility, direction, or how to move a decision forward with confidence.",
    ],
    scope: ["Feasibility", "Direction", "Decisions", "Execution"],
    tone: "warm",
    image: "/images/services/advisory.webp",
    imageCaption: "Study · Brief & Direction",
    focal: "50% 48%",
  },
];

/* ───────────────────────── Notes ───────────────────────────── */

/* The register. Published entries are written in full and read as essays;
 * forthcoming entries are honest placeholders — listed, dimmed, and not
 * clickable — so the section reads as curated rather than padded. Add real
 * pieces by setting status to "published" (or omitting it) with paragraphs. */
export const notes: Note[] = [
  {
    slug: "on-lime-and-time",
    id: "01",
    title: "On Lime & Time",
    category: "Materials",
    date: "March 2026",
    readTime: "4 min",
    excerpt:
      "Why we keep returning to lime plaster — a surface that breathes, ages, and refuses to stay perfectly still.",
    pullquote:
      "The best surfaces, like the best homes, are the ones still becoming themselves.",
    paragraphs: [
      "Lime is a material that asks for patience. It is mixed slowly, applied in thin coats, and left to cure on its own time. Unlike cement, it does not promise permanence on the first day; it earns its strength over months, drawing carbon back from the air as it sets.",
      "We are drawn to it for the same reason. A lime wall holds light differently through the day — soft at noon, almost luminous at dusk. It carries the faint irregularity of the hand that laid it, and it weathers without looking worn. Over years it develops a patina that no factory finish can imitate.",
      "Working with lime is a quiet argument against the idea that a building should look finished the moment it is handed over. A home is not a product to be completed and shipped; it is a place that keeps changing in the hands of the people who live in it.",
    ],
    tone: "warm",
  },
  {
    slug: "the-architecture-of-ground",
    id: "02",
    title: "The Architecture of Ground",
    category: "Design",
    date: "February 2026",
    readTime: "5 min",
    excerpt:
      "A garden is not what surrounds a building — it is the first room you arrive through.",
    pullquote:
      "The ground comes first. The building is only the part of it that we choose to roof.",
    paragraphs: [
      "We tend to think of landscape as the thing that happens after the architecture is done. But the ground comes first. Before a single wall is drawn, the site already has a grade, a drainage line, a direction the light falls, a place where you naturally want to pause.",
      "When we design a courtyard or a threshold, we are really shaping how a person slows down. A change in level, a shift from gravel to stone underfoot, the shade of a single well-placed tree — these are architectural decisions as much as any room.",
      "The most considered homes treat their gardens as continuous with their interiors: a sequence of rooms, some with roofs and some with sky, each tuned to a different hour of the day.",
    ],
    tone: "cool",
  },
  {
    slug: "notes-from-other-peoples-homes",
    id: "03",
    title: "Notes from Other People's Homes",
    category: "Observations",
    date: "Summer 2026",
    excerpt:
      "On the small observations that come from spending time in the places people actually live.",
    paragraphs: [],
    status: "forthcoming",
    tone: "default",
  },
];

/** Only the entries that have actually been written and published. */
export const publishedNotes: Note[] = notes.filter(
  (n) => n.status !== "forthcoming",
);
