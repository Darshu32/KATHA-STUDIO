"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations";
import { useLanguage } from "@/components/language-provider";
import { localizedNavLabel } from "@/lib/i18n/nav-label";
import type { Dictionary } from "@/lib/i18n/dictionary";

type NavItem = { href: string; label: string };

/* Fine drafting-line icons — one per value. Drawn to read like marks from an
 * architect's hand: thin strokes, geometric, quiet. Not a stock icon set. */
const iconProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const VALUE_ICONS: Record<string, ReactNode> = {
  // Depth — one square set behind another, looking inward.
  Depth: (
    <svg {...iconProps}>
      <path d="M8 7 V4 H20 V16 H17" />
      <rect x="4" y="7" width="13" height="13" />
    </svg>
  ),
  // Permanence — an arch, the oldest way to make a span endure.
  Permanence: (
    <svg {...iconProps}>
      <path d="M4 21 H20" />
      <path d="M6 21 V11" />
      <path d="M18 21 V11" />
      <path d="M6 11 A6 6 0 0 1 18 11" />
    </svg>
  ),
  // Roots — a sprout above the line, structure reaching below it.
  Roots: (
    <svg {...iconProps}>
      <path d="M4 8 H20" />
      <path d="M12 8 V4" />
      <path d="M12 8 V20" />
      <path d="M12 12 C10 14 9 16.5 8 20" />
      <path d="M12 12 C14 14 15 16.5 16 20" />
    </svg>
  ),
  // Precision — a registration mark, the draftsman's point of exactness.
  Precision: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 2 V5.5" />
      <path d="M12 18.5 V22" />
      <path d="M2 12 H5.5" />
      <path d="M18.5 12 H22" />
      <circle cx="12" cy="12" r="1.3" />
    </svg>
  ),
  // Foresight — a horizon with light rising over it.
  Foresight: (
    <svg {...iconProps}>
      <path d="M3 17 H21" />
      <path d="M8 17 A4 4 0 0 1 16 17" />
      <path d="M12 9 V6.5" />
      <path d="M17.5 11 L19 9.5" />
      <path d="M6.5 11 L5 9.5" />
    </svg>
  ),
};

/* Icon lookup keys, in dictionary order, kept separate from display text so the
 * SVG icons stay stable while the value labels/bodies come from the dictionary. */
const VALUE_ICON_KEYS = ["Depth", "Permanence", "Roots", "Precision", "Foresight"];
const CRAFT_TAG_KEYS = [0, 1, 2, 3, 4, 5, 6] as const;

/* Shared type styles */
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
  fontSize: "clamp(1rem, 1.2vw, 1.18rem)",
  lineHeight: 1.85,
  color: "var(--text-muted)",
};

export function AboutView({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="mx-auto w-full max-w-[88rem] px-5 pt-[5.6rem] pb-16 sm:px-8 md:px-12 md:pt-[6rem] md:pb-24 lg:px-20">

        {/* ── INTRO / WHY KATHA ── */}
        <section className="pt-4 md:pt-8">
          <FadeUp>
            <p style={eyebrow}>{t.studioPage.whyEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-5 md:mt-7">
            <h1 style={{ ...sectionHeading, fontSize: "var(--fs-page-title)", lineHeight: 0.96 }}>
              {t.studioPage.whyHeading}
            </h1>
          </FadeUp>
          <FadeUp delay={0.16} className="mt-7 md:mt-9">
            <div className="h-px w-full bg-[var(--border-medium)]" />
          </FadeUp>
          <FadeUp delay={0.22} className="mt-8 max-w-[62ch] md:mt-10">
            <p style={body}>
              {t.studioPage.whyPara1}
            </p>
            <p style={{ ...body, marginTop: "1.5rem" }}>
              {t.studioPage.whyPara2Line1}
              <br />
              {t.studioPage.whyPara2Line2}
            </p>
          </FadeUp>
        </section>

        {/* ── MEET NEHA ── */}
        <section className="mt-24 grid grid-cols-1 gap-10 md:mt-36 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16">
          {/* Portrait — circular, rendered in black & white. */}
          <FadeUp className="order-2 md:order-1">
            <div className="mx-auto w-full max-w-[20rem] md:mx-0">
              <div
                className="relative aspect-square w-full overflow-hidden rounded-full border border-[var(--border-medium)]"
                style={{ backgroundColor: "var(--background)" }}
              >
                <Image
                  src="/images/about/neha-portrait.jpeg"
                  alt={t.studioPage.nehaPortraitAlt}
                  fill
                  sizes="(min-width: 768px) 20rem, 80vw"
                  className="object-cover object-top grayscale"
                  priority
                />
              </div>
            </div>
          </FadeUp>

          <div className="order-1 md:order-2">
            <FadeUp>
              <p style={eyebrow}>{t.studioPage.nehaEyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-5 md:mt-7">
              <h2 style={sectionHeading}>{t.studioPage.nehaHeading}</h2>
            </FadeUp>
            <FadeUp delay={0.16} className="mt-7 max-w-[58ch] md:mt-9">
              <p style={body}>{t.studioPage.nehaPara1}</p>
              <p style={{ ...body, marginTop: "1.5rem" }}>
                {t.studioPage.nehaPara2}
              </p>
              <p style={{ ...body, marginTop: "1.5rem" }}>
                {t.studioPage.nehaPara3}
              </p>
              <p style={{ ...body, marginTop: "1.5rem" }}>
                {t.studioPage.nehaPara4}
              </p>
            </FadeUp>
            <FadeUp delay={0.24} className="mt-7 flex flex-col gap-0.5">
              <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.01em", color: "var(--text)" }}>
                {t.studioPage.nehaName}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
                {t.studioPage.nehaRole}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── OUR PERSPECTIVE ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>{t.studioPage.perspectiveEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[68ch] md:mt-8">
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)" }}>
              {t.studioPage.perspective1}
            </p>
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)", marginTop: "1.5rem" }}>
              {t.studioPage.perspective2}
            </p>
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)", marginTop: "1.5rem" }}>
              {t.studioPage.perspective3}
            </p>
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)", marginTop: "1.5rem" }}>
              {t.studioPage.perspective4}
            </p>
          </FadeUp>
        </section>

        {/* ── WHAT WE VALUE ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>{t.studioPage.valuesEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-8 overflow-hidden">
            <div className="-ml-px -mt-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {t.studioPage.values.map((v, i) => (
                <div key={VALUE_ICON_KEYS[i]} className="flex h-full flex-col gap-3 border-l border-t border-[var(--border)] bg-[var(--background)] px-1 py-8 lg:px-3">
                  <span className="mb-1" style={{ color: "var(--text-muted)" }}>
                    {VALUE_ICONS[VALUE_ICON_KEYS[i]]}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 500, fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.2 }}>
                    {v.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ── CRAFT & MATERIALS ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>{t.studioPage.craftEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[68ch] md:mt-8">
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)" }}>
              {t.studioPage.craftPara1}
            </p>
            <p style={{ ...body, marginTop: "1.5rem" }}>
              {t.studioPage.craftPara2}
            </p>
          </FadeUp>
          <FadeUp delay={0.16} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 md:mt-12">
            {CRAFT_TAG_KEYS.map((i) => (
              <span
                key={i}
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-muted)" }}
              >
                {t.studioPage.craftTags[i]}
              </span>
            ))}
          </FadeUp>
        </section>

        {/* ── WHO WE WORK WITH ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>{t.studioPage.clientsEyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[62ch] md:mt-8">
            <p style={body}>
              {t.studioPage.clientsPara1}
            </p>
            <p style={{ ...body, marginTop: "1.5rem" }}>
              {t.studioPage.clientsPara2}
            </p>
            <p style={{ ...body, marginTop: "1.5rem" }}>
              {t.studioPage.clientsPara3}
            </p>
          </FadeUp>
        </section>

        {/* ── PERSONAL NOTE ── */}
        <section className="mt-24 border-t border-[var(--border)] pt-14 md:mt-36 md:pt-20">
          <FadeUp className="max-w-[62ch]">
            <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 300, fontSize: "clamp(1.35rem, 2.2vw, 2rem)", lineHeight: 1.5, letterSpacing: "-0.02em", color: "var(--text)" }}>
              {t.studioPage.noteBody}
            </p>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-6">
            <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em", color: "var(--text)" }}>
              {t.studioPage.noteSignature}
            </p>
          </FadeUp>
        </section>

        {/* ── NAVIGATION ── */}
        <nav className="mt-20 flex flex-col gap-4 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mt-28">
          {prev ? <NavKey nav={prev} dir="prev" t={t} /> : <span />}
          {next ? <NavKey nav={next} dir="next" t={t} /> : <span />}
        </nav>
      </main>
    </div>
  );
}

function NavKey({ nav, dir, t }: { nav: NavItem; dir: "prev" | "next"; t: Dictionary }) {
  const isNext = dir === "next";
  return (
    <Link
      href={nav.href}
      className={`group relative inline-flex min-w-0 items-center gap-3 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="inline-block text-[var(--text)] transition-transform duration-300 group-hover:translate-x-0" style={{ fontSize: "1.05rem" }}>
        {isNext ? "→" : "←"}
      </span>
      <span className="flex min-w-0 flex-col">
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.56rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          color: "var(--text-dim)",
        }}>
          {isNext ? t.nav.next : t.nav.previous}
        </span>
        <span
          className="truncate transition-opacity duration-300 group-hover:opacity-70"
          style={{
            fontFamily: "var(--font-avenir-book)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            lineHeight: 1.2,
            maxWidth: "60vw",
          }}
        >
          {localizedNavLabel(t, nav.href, nav.label)}
        </span>
      </span>
    </Link>
  );
}
