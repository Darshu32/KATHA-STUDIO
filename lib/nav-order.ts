import { services } from "./data";

export type NavItem = {
  href: string;
  label: string;
  type: "about" | "service" | "contact";
};

/** Global card order — matches the home page carousel exactly */
export const globalNavOrder: NavItem[] = [
  { href: "/studio", label: "Studio", type: "about" },
  ...services.map((s) => ({
    href: `/services/${s.slug}`,
    label: s.title,
    type: "service" as const,
  })),
  { href: "/contact", label: "Contact", type: "contact" },
];

export function getAdjacentNav(currentHref: string): {
  prev: NavItem | null;
  next: NavItem | null;
  index: number;
} {
  const idx = globalNavOrder.findIndex((n) => n.href === currentHref);
  return {
    prev: globalNavOrder[idx - 1] ?? null,
    next: globalNavOrder[idx + 1] ?? null,
    index: idx,
  };
}
