export type Tone = "default" | "warm" | "cool";

export type CategorySlug = "residential" | "landscape-design" | "drawings";

export type Category = {
  slug: CategorySlug;
  title: string;
  /** Roman index displayed on the card (I · II · III). */
  index: string;
  /** Italic one-liner shown under the category title. */
  tagline: string;
  tone: Tone;
  /** Optional cover image relative to /public. Falls back to tone-colored card. */
  image?: string;
};

export type Project = {
  slug: string;
  id: string;
  title: string;
  /** Which portfolio category this project belongs to. */
  category: CategorySlug;
  type: string;
  location: string;
  year: string;
  philosophy: string;
  tone: Tone;
  /** Optional image path relative to /public. Falls back to tone-colored card. */
  image?: string;
  /** Optional gallery images for the detail page. */
  gallery?: GalleryImage[];
};

export type GalleryImage = {
  src: string;
  /** Short editorial caption (1–4 words). */
  caption?: string;
  /** Accessible alt text. Falls back to caption or project title. */
  alt?: string;
  /** Layout hint used by the detail page grid. */
  layout?: "full" | "offset-right" | "offset-left" | "pair" | "portrait";
};

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
};

/* ───────────────────────── Categories ───────────────────────── */

export const categories: Category[] = [
  {
    slug: "residential",
    title: "Residential",
    index: "I",
    tagline: "Homes shaped by light, proportion, and quiet ritual.",
    tone: "warm",
  },
  {
    slug: "landscape-design",
    title: "Landscape Design",
    index: "II",
    tagline: "Gardens, courtyards, and the architecture of ground.",
    tone: "cool",
  },
  {
    slug: "drawings",
    title: "Drawings",
    index: "III",
    tagline: "Plans, studies, and sketches — the thinking before the thing.",
    tone: "default",
  },
];

/* ───────────────────────── Projects ────────────────────────── */

export const projects: Project[] = [
  {
    slug: "sujan-residency",
    id: "01",
    title: "Sujan Residency",
    category: "residential",
    type: "Residential",
    location: "Bengaluru",
    year: "2024",
    philosophy:
      "Project description to be added. Placeholder text for Sujan Residency — a private home designed around the rhythms of daily life, where every room is tuned to light, air, and the quiet dignity of material.",
    tone: "warm",
    image: "/images/projects/sujan-residency/01-cover.png",
    gallery: [
      { src: "/images/projects/sujan-residency/01-cover.png", caption: "Approach", layout: "full" },
      { src: "/images/projects/sujan-residency/02-exterior.png", caption: "Exterior · Morning", layout: "offset-right" },
      { src: "/images/projects/sujan-residency/03-courtyard.png", caption: "Courtyard", layout: "full" },
      { src: "/images/projects/sujan-residency/04-interior.png", caption: "Living", layout: "offset-left" },
      { src: "/images/projects/sujan-residency/05-detail.png", caption: "Detail", layout: "portrait" },
      { src: "/images/projects/sujan-residency/06-dusk.png", caption: "Dusk", layout: "full" },
    ],
  },
  {
    slug: "karthik-residency",
    id: "02",
    title: "Karthik Residency",
    category: "residential",
    type: "Residential",
    location: "Bengaluru",
    year: "2024",
    philosophy:
      "Project description to be added. Placeholder text for Karthik Residency — a home that balances contemporary planning with a restrained, tactile palette drawn from the site and its surroundings.",
    tone: "cool",
    image: "/images/projects/karthik-residency/01-cover.png",
  },
  {
    slug: "moodabagilu-residency",
    id: "03",
    title: "Moodabagilu Residency",
    category: "residential",
    type: "Residential",
    location: "Moodabagilu",
    year: "2023",
    philosophy:
      "Project description to be added. Placeholder text for Moodabagilu Residency — a house rooted in its landscape, where traditional planning sensibilities meet a pared-back contemporary language.",
    tone: "default",
    image: "/images/projects/moodabagilu-residency/01-cover.png",
    gallery: [
      { src: "/images/projects/moodabagilu-residency/01-cover.png", caption: "Approach" },
      { src: "/images/projects/moodabagilu-residency/02-view.png", caption: "Exterior" },
      { src: "/images/projects/moodabagilu-residency/03-view.png", caption: "Courtyard" },
      { src: "/images/projects/moodabagilu-residency/04-view.png", caption: "Interior" },
      { src: "/images/projects/moodabagilu-residency/05-view.png", caption: "Living" },
      { src: "/images/projects/moodabagilu-residency/06-view.png", caption: "Dining" },
      { src: "/images/projects/moodabagilu-residency/07-view.png", caption: "Bedroom" },
      { src: "/images/projects/moodabagilu-residency/08-view.png", caption: "Bath" },
      { src: "/images/projects/moodabagilu-residency/09-view.png", caption: "Detail" },
      { src: "/images/projects/moodabagilu-residency/10-view.png", caption: "Material" },
      { src: "/images/projects/moodabagilu-residency/11-view.png", caption: "Garden" },
      { src: "/images/projects/moodabagilu-residency/12-view.png", caption: "Dusk" },
      { src: "/images/projects/moodabagilu-residency/13-view.png", caption: "Plan" },
    ],
  },
  {
    slug: "dhawan-suites",
    id: "04",
    title: "Dhawan Suites",
    category: "residential",
    type: "Suites",
    location: "Bengaluru",
    year: "2025",
    philosophy:
      "Project description to be added. Placeholder text for Dhawan Suites — a set of private residences conceived as discrete, considered interiors, each with its own proportion and character yet held together by a single architectural hand.",
    tone: "warm",
    image: "/images/projects/dhawan-suites/01-cover.png",
    gallery: [
      { src: "/images/projects/dhawan-suites/01-cover.png", caption: "Approach" },
      { src: "/images/projects/dhawan-suites/02-exterior.png", caption: "Exterior" },
      { src: "/images/projects/dhawan-suites/03-courtyard.png", caption: "Courtyard" },
      { src: "/images/projects/dhawan-suites/04-interior.png", caption: "Interior" },
      { src: "/images/projects/dhawan-suites/05-detail.png", caption: "Detail" },
      { src: "/images/projects/dhawan-suites/06-dusk.png", caption: "Dusk" },
      { src: "/images/projects/dhawan-suites/07-plan.png", caption: "Plan" },
    ],
  },
];

/* ───────────────────────── Services ────────────────────────── */

export const services: Service[] = [
  {
    slug: "architectural-design",
    id: "01",
    title: "Architectural Design",
    category: "Residential & Commercial",
    tagline: "Private homes, considered from first sketch to final fitting.",
    desc: "Specialising in private residential projects, the studio has completed projects that span from new build designs, to home renovation and refurbishments including extensions and basements. We have completed many conservation and heritage building projects, successfully and harmoniously integrating new architectural technologies and features, into the original fabric of the building.",
    scope: ["New Builds", "Renovations", "Extensions", "Conservation"],
    tone: "warm",
    image: "/images/services/architectural-design.png",
    imageCaption: "Study · Light & Material",
  },
  {
    slug: "landscape-design",
    id: "02",
    title: "Landscape Design",
    category: "Exterior & Gardens",
    tagline: "Gardens, courtyards, and the architecture of ground.",
    desc: "A consideration of the external landscape is an essential component to any architectural project. Whether it concerns the landscaping of a garden at the rear of a house or conceiving an illuminated walled garden to a housing development scheme, it is important to align exterior concepts to an architectural scheme. In collaboration with landscape architects, we can achieve space-appropriate, elegant and elaborate solutions.",
    scope: ["Private Gardens", "Courtyards", "Site Strategy", "Planting Plans"],
    tone: "cool",
    image: "/images/services/landscape image.png",
    imageCaption: "Study · Courtyard & Ground",
  },
  {
    slug: "planning-applications",
    id: "03",
    title: "Planning Applications",
    category: "Regulatory & Advisory",
    tagline: "Quiet conversations with planning departments — on your behalf.",
    desc: "The architectural team have a wealth of experience with planning departments across all boroughs of London. We advise on all planning matters and building regulations, from small to large scale residential schemes. Where required, we work in consultation with English Heritage, and also external planning consultant teams.",
    scope: ["Pre-Application", "Permission", "Building Regs", "Heritage Liaison"],
    tone: "default",
    image: "/images/services/planning design.png",
    imageCaption: "Study · Brief & Boundary",
  },
  {
    slug: "housing",
    id: "04",
    title: "Housing",
    category: "Residential & Mixed-Use",
    tagline: "Residential schemes that meet the market without losing the room.",
    desc: "House renovations and mixed-use projects are invariably cost-sensitive. Our residential architects work directly with our clients to evaluate project feasibility. This includes planning objectives as well as key commercial decisions regarding multiple occupancy design. The studio combines strategic thinking with design creativity to provide value-added innovative design solutions for all housing schemes. This ensures projects are attractive to the market, and meet the required long-term occupancy needs.",
    scope: ["Feasibility", "Mixed-Use", "Multi-Occupancy", "Value Design"],
    tone: "warm",
    image: "/images/services/housing.png",
    imageCaption: "Study · Scheme & Scale",
  },
];

/* ───────────────────────── Helpers ─────────────────────────── */

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProjectsByCategory(slug: CategorySlug): Project[] {
  return projects.filter((p) => p.category === slug);
}
