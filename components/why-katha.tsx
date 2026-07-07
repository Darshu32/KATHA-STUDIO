"use client";

import { FadeUp } from "@/components/animations";
import { NotebookPen, Layers, PenLine, SwatchBook } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

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
  { icon: NotebookPen, key: "sketchbook" as const },
  { icon: Layers, key: "tracingPaper" as const },
  { icon: PenLine, key: "handwrittenNotes" as const },
  { icon: SwatchBook, key: "materialBoard" as const },
];

export function WhyKatha() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="section-pad mx-auto w-full max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">
        {/* Heading left · supporting text right — an editorial split that
            uses the full width rather than stranding an empty right half. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 lg:gap-24">
          <div>
            <FadeUp>
              <p style={eyebrow}>{t.whyKatha.eyebrow}</p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-6 md:mt-8">
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
                {t.whyKatha.heading}
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
              {t.whyKatha.para1}
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "var(--fs-body)",
                lineHeight: 1.85,
                color: "var(--text-muted)",
                marginTop: "1.5rem",
              }}
            >
              {t.whyKatha.para2Line1}
              <br />
              {t.whyKatha.para2Line2}
            </p>
          </FadeUp>
        </div>

        {/* Process imagery — represented as quiet line icons */}
        <FadeUp
          delay={0.24}
          className="mt-16 grid grid-cols-2 gap-px bg-[var(--border)] sm:grid-cols-4 md:mt-20"
        >
          {PROCESS.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-4 bg-[var(--background)] px-4 py-12 text-center"
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
                {t.whyKatha.process[key]}
              </span>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
