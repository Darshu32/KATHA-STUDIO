import { whatWeDo, sectors } from "./data";

export type NavItem = {
  href: string;
  label: string;
  type: "about" | "service" | "contact";
};

/** Global page order for the detail-page prev/next chain:
 *  Studio → disciplines → sectors → Contact. */
export const globalNavOrder: NavItem[] = [
  { href: "/studio", label: "Studio", type: "about" },
  ...[...whatWeDo, ...sectors].map((s) => ({
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
