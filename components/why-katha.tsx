"use client";

import { FadeUp } from "@/components/animations";
import { NotebookPen, Layers, PenLine, SwatchBook } from "lucide-react";

/* ─────────────────────────────────────────────
   WhyKatha — sits immediately after the hero.
   "Katha means story" + the studio's reason for
   beginning every project with people. Process is
   represented with line icons (sketchbook, tracing
   paper, notes, material board) since imagery here
   is intentionally process-led, not finished work.
───────────────────────────────────────────── */

const eyebrow = {
  fontFamily: "var(--font-inter)",
  fontSize: "var(--fs-caption)",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.32em",
  color: "var(--text-dim)",
};

const PROCESS = [
  { icon: NotebookPen, label: "Sketchbook" },
  { icon: Layers, label: "Tracing Paper" },
  { icon: PenLine, label: "Handwritten Notes" },
  { icon: SwatchBook, label: "Material Board" },
];

export function WhyKatha() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="section-pad mx-auto w-full max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">
        {/* Heading left · supporting text right — an editorial split that
            uses the full width rather than stranding an empty right half. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 lg:gap-24">
          <div>
            <FadeUp>
              <p style={eyebrow}>— Why Katha</p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-5 md:mt-7">
              <h2
                style={{
                  fontFamily: "var(--font-avenir-book)",
                  fontWeight: 300,
                  fontSize: "var(--fs-section)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                }}
              >
                Katha Means Story
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.16} className="max-w-[58ch] md:pt-1">
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "var(--fs-body)",
                lineHeight: 1.85,
                color: "var(--text-muted)",
              }}
            >
              We chose the name because every project begins with people. Every
              family brings its own way of living. Every business carries its own
              aspirations. Every site presents its own opportunities. Our role is
              to understand what matters most and translate it into spaces that
              feel meaningful, functional and enduring.
            </p>
          </FadeUp>
        </div>

        {/* Process imagery — represented as quiet line icons */}
        <FadeUp
          delay={0.24}
          className="mt-12 grid grid-cols-2 gap-px bg-[var(--border)] sm:grid-cols-4 md:mt-16"
        >
          {PROCESS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 bg-[var(--background)] px-4 py-10 text-center"
            >
              <Icon size={26} strokeWidth={1.25} color="var(--text-muted)" aria-hidden />
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "var(--fs-caption)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--text-muted)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
