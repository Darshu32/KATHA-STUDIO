"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { services } from "@/lib/data";
import { TreePine, Mountain, Frame, Pencil, Box, SwatchBook, Ruler } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

/* ─────────────────────────────────────────────
   HomeStory — the homepage narrative that follows
   the carousel: What We Value · What We Offer ·
   Craft Matters · a closing note + CTA. (Why Katha
   now lives directly under the hero.) The deeper
   story lives on Studio / Approach / Services / Notes.
───────────────────────────────────────────── */

/* Shared type styles (match the rest of the site) */
const eyebrow = {
  fontFamily: "var(--font-inter)",
  fontSize: "var(--fs-caption)",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.32em",
  color: "var(--text-dim)",
};
const sectionHeading = {
  fontFamily: "var(--font-avenir-book)",
  fontWeight: 300,
  fontSize: "var(--fs-section)",
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  color: "var(--text)",
};
const body = {
  fontFamily: "var(--font-inter)",
  fontSize: "var(--fs-body)",
  lineHeight: 1.85,
  color: "var(--text-muted)",
};

/* Craft Matters — materials & process represented as quiet line icons */
const MATERIALS = [
  { icon: TreePine, key: "wood" as const },
  { icon: Mountain, key: "stone" as const },
  { icon: Frame, key: "joinery" as const },
  { icon: Pencil, key: "sketches" as const },
  { icon: Box, key: "models" as const },
  { icon: SwatchBook, key: "materialBoards" as const },
  { icon: Ruler, key: "details" as const },
];

export function HomeStory() {
  const { t } = useLanguage();
  return (
    <div className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">

        {/* ── WHAT WE OFFER ── */}
        <section className="section-pad">
          <FadeUp>
            <p style={eyebrow}>{t.homeStory.offerEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.06} className="mt-5 md:mt-7">
            <h2 style={sectionHeading}>{t.homeStory.offerHeading}</h2>
          </FadeUp>
          <div className="mt-12 grid grid-cols-1 gap-px bg-[var(--border)] md:mt-16 sm:grid-cols-2">
            {services.map((s, i) => {
              const svc = t.services[s.slug as keyof typeof t.services];
              return (
              <FadeUp key={s.slug} delay={0.08 + i * 0.06} className="bg-[var(--background)]">
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="Enter"
                  className="group flex h-full flex-col gap-4 px-1 py-10 transition-opacity duration-300 hover:opacity-70 lg:px-4 lg:py-12"
                >
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
                    {svc?.category ?? s.category}
                  </span>
                  <h3 className="flex items-center gap-2" style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(1.3rem, 2vw, 1.7rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1 }}>
                    {svc?.title ?? s.title}
                    <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: "0.9rem" }} aria-hidden>→</span>
                  </h3>
                  <p className="max-w-[46ch]" style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {svc?.desc ?? s.desc}
                  </p>
                </Link>
              </FadeUp>
              );
            })}
          </div>
        </section>

        {/* ── CRAFT MATTERS ── */}
        <section className="section-pad border-t border-[var(--border)]">
          <FadeUp>
            <p style={eyebrow}>{t.homeStory.craftEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-8 max-w-[68ch] md:mt-10">
            <p style={{ ...body, color: "var(--text)" }}>
              {t.homeStory.craftBody}
            </p>
          </FadeUp>
          {/* Hairlines live on the cells (border-t/border-l) and the grid is
              nudged -1px so its outer edges clip — internal dividers stay, but
              an unfilled last row never shows an empty (grey) trailing cell. */}
          <FadeUp delay={0.16} className="mt-14 overflow-hidden md:mt-16">
            <div className="-ml-px -mt-px grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
              {MATERIALS.map(({ icon: Icon, key }) => (
                <div key={key} className="flex flex-col items-center gap-3 border-l border-t border-[var(--border)] bg-[var(--background)] px-3 py-10 text-center">
                  <Icon size={24} strokeWidth={1.25} color="var(--text-muted)" aria-hidden />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
                    {t.homeStory.materials[key]}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ── CLOSING · CONTACT ── */}
        <section className="border-t border-[var(--border)] py-14 md:py-20">
          <FadeUp>
            <Link
              href="/contact"
              data-cursor="Enter"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-medium)] px-8 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text)" }}
            >
              {t.homeStory.closingCta}
              <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </FadeUp>
        </section>

      </div>
    </div>
  );
}
