import type { Dictionary } from "@/lib/i18n/dictionary";

/** Translate a global-nav href to its display label using the active dictionary.
 *  Falls back to the supplied English label when no translation key applies. */
export function localizedNavLabel(t: Dictionary, href: string, fallback: string): string {
  if (href === "/") return t.nav.home;
  if (href === "/studio") return t.nav.studio;
  if (href === "/contact") return t.nav.contact;
  if (href === "/approach") return t.nav.approach;
  if (href === "/services") return t.nav.services;
  if (href === "/journal") return t.nav.journal;
  if (href.startsWith("/services/")) {
    const slug = href.slice("/services/".length);
    const svc = (t.services as Record<string, { title: string }>)[slug];
    if (svc) return svc.title;
  }
  return fallback;
}
