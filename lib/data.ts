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
  gallery?: string[];
};

export type Service = {
  slug: string;
  id: string;
  title: string;
  category: string;
  desc: string;
  /** Optional additional paragraphs for the detail page */
  paragraphs?: string[];
  tone: Tone;
  /** Optional image path relative to /public. Falls back to tone-colored card. */
  image?: string;
};

/* ───────────────────────── Categories ───────────────────────── */

export const categories: Category[] = [
  {
    slug: "residential",
    title: "Residential",
    index: "I",
    tagline: "Homes shaped by light, proportion, and quiet ritual.",
    tone: "warm",
    image: "/images/projects/courtyard-residence/Screenshot 2026-04-08 135950.png",
  },
  {
    slug: "landscape-design",
    title: "Landscape Design",
    index: "II",
    tagline: "Gardens, courtyards, and the architecture of ground.",
    tone: "cool",
    image: "/images/projects/stone-and-silence/Screenshot 2026-04-08 140011.png",
  },
  {
    slug: "drawings",
    title: "Drawings",
    index: "III",
    tagline: "Plans, studies, and sketches — the thinking before the thing.",
    tone: "default",
    image: "/images/projects/the-gallery-interior/Screenshot 2026-04-08 140035.png",
  },
];

/* ───────────────────────── Projects ────────────────────────── */

export const projects: Project[] = [
  {
    slug: "courtyard-residence",
    id: "01",
    title: "Courtyard Residence",
    category: "residential",
    type: "Residential",
    location: "Bengaluru",
    year: "2024",
    philosophy:
      "This private residence in Bengaluru is organised around a central courtyard that acts as the home's beating heart. Every room opens onto it — drawing in natural light, cross-ventilation, and a sense of calm that shifts with the seasons. The architecture does not impose itself; instead, it steps back to let the courtyard do its quiet work. Materials were chosen for their warmth and age well — exposed brick, textured plaster, and timber screens that filter the afternoon sun into patterns across the floor.",
    tone: "warm",
    image: "/images/projects/courtyard-residence/Screenshot 2026-04-08 135950.png",
  },
  {
    slug: "stone-and-silence",
    id: "02",
    title: "Stone & Silence",
    category: "residential",
    type: "Renovation",
    location: "Udaipur",
    year: "2023",
    philosophy:
      "A heritage haveli in the old city of Udaipur, carefully restored without erasing the marks of its history. The brief was to bring the structure back to life for contemporary living while honouring the craftsmanship of its original builders. Existing stone walls were cleaned and retained, new interventions were made in materials that acknowledge rather than imitate the old, and unnecessary additions from later decades were stripped away. The result is a home that feels quietly authoritative — as though it always knew what it was.",
    tone: "cool",
    image: "/images/projects/stone-and-silence/Screenshot 2026-04-08 140011.png",
  },
  {
    slug: "the-gallery-interior",
    id: "03",
    title: "The Gallery Interior",
    category: "residential",
    type: "Interior Design",
    location: "Mumbai",
    year: "2024",
    philosophy:
      "A live-work apartment in Mumbai reimagined as a curated interior, where every surface and object earns its place. The client collects art and required a home that could hold significant pieces without competing with them. We responded with a restrained material palette — pale stone floors, white-limewashed walls, and dark-stained joinery — that recedes to let the collection breathe. Proportions were carefully tuned room by room, and artificial lighting was designed to perform both as ambience and as gallery-quality illumination.",
    tone: "default",
    image: "/images/projects/the-gallery-interior/Screenshot 2026-04-08 140035.png",
  },
];

/* ───────────────────────── Services ────────────────────────── */

export const services: Service[] = [
  {
    slug: "architectural-design",
    id: "01",
    title: "Architectural Design",
    category: "Residential & Commercial",
    desc: "Specialising in private residential projects, the studio has completed projects that span from new build designs, to home renovation and refurbishments including extensions and basements. We have completed many conservation and heritage building projects, successfully and harmoniously integrating new architectural technologies and features, into the original fabric of the building.",
    tone: "warm",
    image: "/images/services/architectural-design.png",
  },
  {
    slug: "landscape-design",
    id: "02",
    title: "Landscape Design",
    category: "Exterior & Gardens",
    desc: "A consideration of the external landscape is an essential component to any architectural project. Whether it concerns the landscaping of a garden at the rear of a house or conceiving an illuminated walled garden to a housing development scheme, it is important to align exterior concepts to an architectural scheme. In collaboration with landscape architects, we can achieve space-appropriate, elegant and elaborate solutions.",
    tone: "cool",
    image: "/images/services/landscape image.png",
  },
  {
    slug: "planning-applications",
    id: "03",
    title: "Planning Applications",
    category: "Regulatory & Advisory",
    desc: "The architectural team have a wealth of experience with planning departments across all boroughs of London. We advise on all planning matters and building regulations, from small to large scale residential schemes. Where required, we work in consultation with English Heritage, and also external planning consultant teams.",
    tone: "default",
    image: "/images/services/planning design.png",
  },
  {
    slug: "housing",
    id: "04",
    title: "Housing",
    category: "Residential & Mixed-Use",
    desc: "House renovations and mixed-use projects are invariably cost-sensitive. Our residential architects work directly with our clients to evaluate project feasibility. This includes planning objectives as well as key commercial decisions regarding multiple occupancy design. The studio combines strategic thinking with design creativity to provide value-added innovative design solutions for all housing schemes. This ensures projects are attractive to the market, and meet the required long-term occupancy needs.",
    tone: "warm",
    image: "/images/services/housing.png",
  },
];

/* ───────────────────────── Helpers ─────────────────────────── */

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProjectsByCategory(slug: CategorySlug): Project[] {
  return projects.filter((p) => p.category === slug);
}
