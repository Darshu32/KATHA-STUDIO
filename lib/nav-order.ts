import { projects, services } from "./data";

export type NavItem = {
  href: string;
  label: string;
  type: "about" | "project" | "service" | "contact";
};

/** Global card order — matches the home page carousel exactly */
export const globalNavOrder: NavItem[] = [
  { href: "/about",   label: "About",   type: "about"   },
  ...projects.map((p) => ({ href: `/projects/${p.slug}`, label: p.title, type: "project" as const })),
  ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, type: "service" as const })),
  { href: "/contact", label: "Contact", type: "contact" },
];

export function getAdjacentNav(currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
  index: number;
} {
  const idx = globalNavOrder.findIndex((n) => n.href === currentHref);
  return {
    prev:  globalNavOrder[idx - 1] ?? null,
    next:  globalNavOrder[idx + 1] ?? null,
    index: idx,
  };
}
