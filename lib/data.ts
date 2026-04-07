export type Tone = "default" | "warm" | "cool";

export type Project = {
  slug: string;
  id: string;
  title: string;
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
  tone: Tone;
  /** Optional image path relative to /public. Falls back to tone-colored card. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "courtyard-residence",
    id: "01",
    title: "Courtyard Residence",
    type: "Residential",
    location: "Ahmedabad",
    year: "2024",
    philosophy:
      "A home composed around a central courtyard — where light, shadow, and breeze become part of the architecture itself.",
    tone: "warm",
    image: "/images/projects/courtyard-residence/hero.jpg",
    gallery: [
      "/images/projects/courtyard-residence/01.jpg",
      "/images/projects/courtyard-residence/02.jpg",
      "/images/projects/courtyard-residence/wide.jpg",
    ],
  },
  {
    slug: "stone-and-silence",
    id: "02",
    title: "Stone & Silence",
    type: "Renovation",
    location: "Udaipur",
    year: "2023",
    philosophy:
      "An old shell carefully re-edited through restraint, so the architecture feels more present and less explained.",
    tone: "cool",
    image: "/images/projects/stone-and-silence/hero.jpg",
    gallery: [
      "/images/projects/stone-and-silence/01.jpg",
      "/images/projects/stone-and-silence/02.jpg",
      "/images/projects/stone-and-silence/wide.jpg",
    ],
  },
  {
    slug: "the-gallery-interior",
    id: "03",
    title: "The Gallery Interior",
    type: "Interior Design",
    location: "Mumbai",
    year: "2024",
    philosophy:
      "A calmer interior landscape shaped around proportion, texture, and one deliberate gesture per room.",
    tone: "default",
    image: "/images/projects/the-gallery-interior/hero.jpg",
    gallery: [
      "/images/projects/the-gallery-interior/01.jpg",
      "/images/projects/the-gallery-interior/02.jpg",
      "/images/projects/the-gallery-interior/wide.jpg",
    ],
  },
];

export const services: Service[] = [
  {
    slug: "architectural-design",
    id: "01",
    title: "Architectural Design",
    category: "Residential & Commercial",
    desc: "From concept to construction — architecture that honours the land and the life within it. We work across the full cycle: site analysis, planning, material selection, and construction oversight.",
    tone: "warm",
    image: "/images/services/architectural-design.jpg",
  },
  {
    slug: "interior-design",
    id: "02",
    title: "Interior Design",
    category: "Spatial Curation",
    desc: "Rooms composed through restraint: the right material, the right proportion, nothing more. Every interior decision is made in relation to the architecture it inhabits.",
    tone: "cool",
    image: "/images/services/interior-design.jpg",
  },
  {
    slug: "renovation",
    id: "03",
    title: "Renovation",
    category: "Restoration & Re-edit",
    desc: "Careful reworking of existing shells — editing rather than erasing, so the architecture feels earned. We respect what is already there before proposing what could be.",
    tone: "default",
    image: "/images/services/renovation.jpg",
  },
  {
    slug: "consultation",
    id: "04",
    title: "Consultation",
    category: "Strategic Review",
    desc: "A focused architectural conversation that saves time, money, and wrong turns. Ideal before committing to a design direction or evaluating an existing proposal.",
    tone: "warm",
    image: "/images/services/consultation.jpg",
  },
];
