"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { services } from "@/lib/data";
import { TreePine, Mountain, Frame, Pencil, Box, SwatchBook, Ruler } from "lucide-react";

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
const sigName = {
  fontFamily: "var(--font-avenir-book)",
  fontWeight: 600,
  fontSize: "1rem",
  letterSpacing: "-0.01em",
  color: "var(--text)",
};

const VALUES = [
  { title: "Thoughtfulness", body: "We consider how a space will be lived in, long after the drawings are done." },
  { title: "Craftsmanship", body: "Details are resolved with care, because they shape the everyday experience." },
  { title: "Clarity", body: "We communicate openly, so decisions are understood and never rushed." },
  { title: "Context", body: "Every design answers to its site, its climate, and the life around it." },
  { title: "Longevity", body: "We build for spaces that stay relevant as lives continue to change." },
];

/* Craft Matters — materials & process represented as quiet line icons */
const MATERIALS = [
  { icon: TreePine, label: "Wood" },
  { icon: Mountain, label: "Stone" },
  { icon: Frame, label: "Joinery" },
  { icon: Pencil, label: "Sketches" },
  { icon: Box, label: "Models" },
  { icon: SwatchBook, label: "Material Boards" },
  { icon: Ruler, label: "Details" },
];

export function HomeStory() {
  return (
    <div className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto w-full max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">

        {/* ── WHAT WE VALUE ── */}
        <section className="section-pad">
          <FadeUp>
            <p style={eyebrow}>— What We Value</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-8 grid grid-cols-1 gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div key={v.title} className="flex h-full flex-col gap-3 bg-[var(--background)] px-1 py-8 lg:px-3">
                <h3 style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 500, fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.2 }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </FadeUp>
        </section>

        {/* ── WHAT WE OFFER ── */}
        <section className="section-pad border-t border-[var(--border)]">
          <FadeUp>
            <p style={eyebrow}>— What We Offer</p>
          </FadeUp>
          <FadeUp delay={0.06} className="mt-5 md:mt-7">
            <h2 style={sectionHeading}>How We Build</h2>
          </FadeUp>
          <div className="mt-8 grid grid-cols-1 gap-px bg-[var(--border)] md:mt-10 sm:grid-cols-2">
            {services.map((s, i) => (
              <FadeUp key={s.slug} delay={0.08 + i * 0.06} className="bg-[var(--background)]">
                <Link
                  href={`/services/${s.slug}`}
                  data-cursor="Enter"
                  className="group flex h-full flex-col gap-3 px-1 py-8 transition-opacity duration-300 hover:opacity-70 lg:px-4 lg:py-10"
                >
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
                    {s.category}
                  </span>
                  <h3 className="flex items-center gap-2" style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(1.3rem, 2vw, 1.7rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.1 }}>
                    {s.title}
                    <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: "0.9rem" }} aria-hidden>→</span>
                  </h3>
                  <p className="max-w-[46ch]" style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {s.desc}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── CRAFT MATTERS ── */}
        <section className="section-pad border-t border-[var(--border)]">
          <FadeUp>
            <p style={eyebrow}>— Craft Matters</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[68ch] md:mt-8">
            <p style={{ ...body, color: "var(--text)" }}>
              Architecture is shaped through thousands of decisions. The quality
              of a material, the proportion of a room, the way light enters a
              space and the detail of a junction influence how a space is
              experienced every day.
            </p>
          </FadeUp>
          <FadeUp delay={0.16} className="mt-10 grid grid-cols-2 gap-px bg-[var(--border)] sm:grid-cols-4 lg:grid-cols-7 md:mt-12">
            {MATERIALS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-3 bg-[var(--background)] px-3 py-8 text-center">
                <Icon size={24} strokeWidth={1.25} color="var(--text-muted)" aria-hidden />
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
                  {label}
                </span>
              </div>
            ))}
          </FadeUp>
        </section>

        {/* ── CLOSING · PERSONAL NOTE + CONTACT ── */}
        <section className="section-pad border-t border-[var(--border)]">
          <FadeUp className="max-w-[62ch]">
            <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 300, fontSize: "clamp(1.35rem, 2.2vw, 2rem)", lineHeight: 1.5, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Every project represents an important chapter in someone&apos;s
              life. It is a responsibility we value deeply. Thank you for
              considering Katha Studio as part of that journey.
            </p>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-6">
            <p style={sigName}>— Neha Birla</p>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-12 md:mt-16">
            <Link
              href="/contact"
              data-cursor="Enter"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-medium)] px-8 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text)" }}
            >
              Let&apos;s Discuss Your Project
              <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
          </FadeUp>
        </section>

      </div>
    </div>
  );
}
