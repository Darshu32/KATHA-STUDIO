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

/** Canonical Journal topics — used for the register/eyebrow label. */
export const noteTopics = [
  "Process",
  "Culture",
  "Craft",
  "Space",
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
    scope: ["New Homes", "Commercial Spaces", "Concept Design", "Site & Detailing"],
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
    tagline: "Every interior holds a feeling before it holds furniture.",
    desc: "Spaces shaped through materiality, light and thoughtful detailing.",
    paragraphs: [
      "The work is in the choices that are rarely seen — the texture of a surface, the proportion of a room, the way light settles across the day. These are the decisions that determine how a space feels to live inside for years.",
      "Every Katha interior is built to that.",
    ],
    scope: ["Spatial Planning", "Material Selection", "Joinery & Built-ins", "Light & Atmosphere"],
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
    tagline: "Every existing space carries something worth understanding before anything is changed.",
    desc: "Helping existing spaces evolve while building on their strengths.",
    paragraphs: [
      "Age leaves intelligence in a building — in how it was constructed, what it was built to withstand, what has quietly held its value over time. Our work is knowing what to keep, what to evolve, and how to bring both forward without losing what made the space worth returning to.",
    ],
    scope: ["Structural Reworking", "Heritage Restoration", "Extensions", "Adaptive Reuse"],
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
    tagline: "The right question asked early saves everything that comes after.",
    desc: "Providing guidance through planning, decision-making and execution.",
    paragraphs: [
      "Some projects need full design. Others need one conversation with someone who has seen enough to know exactly where things are headed — and what decisions will matter most before work begins.",
      "That is what Katha Advisory is.",
    ],
    scope: ["Brief Development", "Feasibility", "Design Direction", "Decision Support"],
    tone: "warm",
    image: "/images/services/advisory.webp",
    imageCaption: "Study · Brief & Direction",
    focal: "50% 48%",
  },
];

/* ───────────────────────── Sectors ─────────────────────────
 * The kinds of projects we take on — read alongside the disciplines
 * above. Same shape as a Service so each gets its own detail page and
 * flows into the prev/next chain. Images are added later; until then
 * the cards and detail pages fall back to a clean neutral panel. */
export const sectors: Service[] = [
  {
    slug: "residential",
    id: "01",
    title: "Residential",
    category: "Homes & Living",
    tagline: "The spaces you return to every day.",
    desc: "Homes designed around how you actually live — private, warm and made to last.",
    paragraphs: [
      "A home is the most personal thing we design. It holds your routines, your family, and the small rituals that quietly make a day feel like yours.",
      "We shape residences around the way you really live — how light should fall in the morning, where people gather, what quiet corners you need. Every decision is made so the house still feels right many years from now.",
    ],
    scope: ["Private Homes", "Villas", "Apartments", "Farmhouses"],
    tone: "warm",
    image: "/images/services/residential.webp",
    imageCaption: "Study · Home & Living",
    focal: "50% 55%",
  },
  {
    slug: "commercial",
    id: "02",
    title: "Commercial",
    category: "Work & Retail",
    tagline: "Spaces that work as hard as the people in them.",
    desc: "Offices, stores and hospitality spaces that balance function, brand and feeling.",
    paragraphs: [
      "A commercial space carries a business's character before a single word is spoken. It shapes how a team works, how customers feel, and how a brand is remembered.",
      "We design offices, retail and hospitality spaces that are practical where they need to be and expressive where it counts — built to perform every day and to age well under real, heavy use.",
    ],
    scope: ["Offices & Workspaces", "Retail", "Hospitality", "Showrooms"],
    tone: "cool",
    image: "/images/services/commercial.webp",
    imageCaption: "Study · Work & Brand",
    focal: "50% 50%",
  },
  {
    slug: "high-rise",
    id: "03",
    title: "High-Rise",
    category: "Towers & Density",
    tagline: "Living well, at height.",
    desc: "Multi-storey and high-rise buildings planned for light, air, structure and community.",
    paragraphs: [
      "Building upward asks more of a design. Every floor repeats, every service runs the full height, and hundreds of lives share a single structure — so the details have to be right, because they multiply.",
      "We plan high-rise and multi-storey buildings around what makes vertical living genuinely good: natural light and cross-ventilation, honest structure, efficient cores, and shared spaces that build a sense of community rather than simply stacking homes.",
    ],
    scope: ["Residential Towers", "Mixed-Use", "Structural Planning", "Shared Amenities"],
    tone: "default",
    image: "/images/services/high-rise.webp",
    imageCaption: "Study · Height & Density",
    focal: "50% 45%",
  },
];

/* ─── Technical Drawings ───────────────────────────────────────
 * A "What We Do" discipline that appears in the Services menu, on the
 * Services page and as its own detail page — but is intentionally kept
 * OFF the home carousel/grid (those use `services`) to keep home lean. */
export const technicalDrawings: Service = {
  slug: "technical-drawings",
  id: "05",
  title: "Technical Drawings",
  category: "Documentation & Detail",
  tagline: "The drawings that turn a design into a building.",
  desc: "Precise construction drawings that translate a design into something a site can build exactly.",
  paragraphs: [
    "A design only becomes a building if it can be built accurately. Technical drawings are where intent becomes instruction — every dimension, junction and material set down clearly enough to build without guesswork.",
    "We prepare detailed working drawings — plans, sections, elevations and construction details — that give contractors a single, precise source of truth. Fewer surprises on site, fewer compromises, and a finished space that matches what was drawn.",
  ],
  scope: ["Working Drawings", "Sections & Elevations", "Construction Details", "Site Documentation"],
  tone: "cool",
  image: "/images/services/technical-drawings.webp",
  imageCaption: "Study · Line & Precision",
  focal: "50% 50%",
};

/** The full "What We Do" list — the flagship disciplines shown on home,
 *  plus supporting disciplines (Technical Drawings) shown only under
 *  Services. Home uses `services`; the menu and Services page use this. */
export const whatWeDo: Service[] = [...services, technicalDrawings];

/** Everything under /services — the full set of detail pages.
 *  Used for routing (detail lookup, static params) and prev/next order. */
export const servicesAndSectors: Service[] = [...whatWeDo, ...sectors];

/* ───────────────────────── Notes ───────────────────────────── */

/* The register. Published entries are written in full and read as essays;
 * forthcoming entries are honest placeholders — listed, dimmed, and not
 * clickable — so the section reads as curated rather than padded. Add real
 * pieces by setting status to "published" (or omitting it) with paragraphs. */
export const notes: Note[] = [
  {
    slug: "why-the-first-sketch-is-never-the-answer",
    id: "01",
    title: "Why the First Sketch Is Never the Answer",
    category: "Process",
    date: "January 2026",
    readTime: "3 min",
    excerpt: "The first sketch is not a design. It is a question.",
    paragraphs: [
      "It is the fastest way to find out what you do not yet understand about a project. A line drawn too early in the wrong direction costs nothing on paper and everything in construction. So we draw early and loosely — not to commit but to reveal. To see where the thinking holds and where it does not.",
      "The projects that end well are the ones where the hardest questions were asked before the design was loved. Before the client was attached to a layout. Before anyone had invested in an idea. There is a window early in every project where everything is still possible — and that window is where the most important work happens.",
      "What comes out of it is not always what anyone expected. A site that seemed to demand one approach reveals through sketching that it needs something quieter. A brief that seemed straightforward opens into something richer once the first lines are drawn and questioned.",
      "The sketch is where we learn what the project is really asking for.",
    ],
    tone: "default",
  },
  {
    slug: "the-detail-nobody-sees",
    id: "02",
    title: "The Detail Nobody Sees",
    category: "Craft",
    date: "February 2026",
    readTime: "3 min",
    excerpt:
      "The most important detail in any project is invisible by the time the work is done.",
    paragraphs: [
      "It lives in the junction between two materials — the way a stone floor meets a plastered wall, the shadow line that makes a door frame read cleanly, the depth of a window reveal that determines whether light enters softly or harshly. These decisions separate a space that feels considered from one that merely looks finished.",
      "Clients rarely ask about these things. They ask about layouts, materials, finishes. But the spaces they remember — the ones they describe to other people, the ones that stay with them — are almost always the ones where someone paid attention at exactly this level.",
      "A junction resolved badly speaks every time someone stands near it. A shadow line out of place flattens a surface that should have depth. These things register below conscious awareness — but they register.",
      "The craft of architecture lives in the details nobody sees. That invisibility is the point.",
    ],
    tone: "cool",
  },
  {
    slug: "what-india-knows-about-space",
    id: "03",
    title: "What India Knows About Space That the World Is Relearning",
    category: "Culture",
    date: "April 2026",
    readTime: "4 min",
    excerpt:
      "The most sophisticated ideas in contemporary architecture were never new. They were forgotten.",
    paragraphs: [
      "Passive cooling through courtyard geometry. Thermal mass in stone walls that keep interiors stable without mechanical intervention. The verandah — neither inside nor outside — moderating heat, filtering light, creating a threshold that no air conditioning unit has ever replaced. Step-wells that solved water harvesting, public gathering and microclimate in a single structure.",
      "These were not accidents. They were centuries of observation built into craft — passed through hands, not textbooks. The knowledge did not disappear because it stopped working. It disappeared because imported modernism arrived faster than anyone thought to question it.",
      "The world is now spending enormous resources rediscovering what was already known. Biophilic design. Passive ventilation. Human-scale proportion. Locally sourced material. These are not trends. They are returns.",
      "We build with that knowledge deliberately — not as nostalgia. Because it works better.",
    ],
    tone: "warm",
  },
  {
    slug: "on-designing-for-twenty-years-from-now",
    id: "04",
    title: "On Designing for Twenty Years From Now",
    category: "Space",
    date: "June 2026",
    readTime: "4 min",
    excerpt: "Every project will outlast the conversation that started it.",
    paragraphs: [
      "The family that briefed it will change. Children will grow and leave. Businesses will shift. The way people work, gather and move through space is already different from a decade ago — and will be different again in the next one. A space designed only for today is already becoming obsolete.",
      "The answer is not open plans and moveable walls. It is a deeper reading of what is permanent in human behaviour and what is not.",
      "People will always need a place to be alone and a place to gather. They will always respond to natural light. They will always feel the difference between a ceiling at the right height and one that is not. They will always know when a material is honest and when it is pretending to be something else.",
      "Design for those constants. Build with materials that age with dignity. Leave room in the plan for life to move through without breaking the architecture.",
      "That is how a space lasts twenty years and still feels right.",
    ],
    tone: "default",
  },
];

/** Only the entries that have actually been written and published. */
export const publishedNotes: Note[] = notes.filter(
  (n) => n.status !== "forthcoming",
);
