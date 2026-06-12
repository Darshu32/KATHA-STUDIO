import Link from "next/link";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: "Approach — KATHA Studio",
  description:
    "How we work — a deliberate process that moves from listening to delivery.",
};

const STEPS = [
  {
    num: "01",
    title: "Listen",
    body: "Every project begins before the brief — in how you live, how your business moves, what the site is quietly asking for.",
  },
  {
    num: "02",
    title: "Explore",
    body: "Ideas are tested openly. Proportion, light and material are studied before any direction is committed to.",
  },
  {
    num: "03",
    title: "Design",
    body: "The concept is shaped into a whole where every decision answers to the brief and to the space itself.",
  },
  {
    num: "04",
    title: "Refine",
    body: "The details are resolved. This is the quiet work that separates a space that looks finished from one that feels right.",
  },
  {
    num: "05",
    title: "Deliver",
    body: "The work is seen through to completion — the original intent held steady to the final detail.",
  },
];

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── EYEBROW ── */}
          <FadeUp delay={0} className="pt-10 pb-3 md:pt-14 lg:pt-10 lg:pb-2">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — How We Work
            </p>
          </FadeUp>

          {/* ── HEADLINE ── */}
          <FadeUp delay={0.06} className="pb-3 md:pb-4">
            <h1 style={{
              fontFamily: "var(--font-avenir-book)",
              fontSize: "var(--fs-page-title)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}>
              Our Approach
            </h1>
          </FadeUp>

          <FadeUp delay={0.12} className="pb-2">
            <p className="max-w-[58ch]" style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--text-muted)" }}>
              Every stage has a purpose. Nothing moves forward until the
              current one is ready.
            </p>
          </FadeUp>

          {/* Hairline */}
          <FadeUp delay={0.16} className="mt-6 md:mt-8">
            <div className="h-px w-full bg-[var(--border-medium)]" />
          </FadeUp>

          {/* ── STEPS ── */}
          <div className="grid grid-cols-1 gap-px bg-[var(--border)] pt-px mb-16 md:grid-cols-2 lg:grid-cols-5 lg:mb-20">
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={0.2 + i * 0.07} className="bg-[var(--background)]">
                <div className="flex h-full flex-col gap-4 px-1 py-8 md:px-2 lg:px-3 lg:py-10">
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.28em", color: "var(--text-dim)" }}>
                    {step.num}
                  </p>
                  <h2 style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "clamp(1.4rem, 2vw, 1.7rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    lineHeight: 1.05,
                  }}>
                    {step.title}
                  </h2>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* ── CRAFT & MATERIALS ── */}
          <section className="section-pad border-t border-[var(--border)]">
            <FadeUp>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
                — Craft &amp; Materials
              </p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-6 max-w-[68ch] md:mt-8">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)" }}>
                Every decision in a building is also a material decision.
              </p>
              <p className="mt-5" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.95rem, 1.2vw, 1.08rem)", lineHeight: 1.8, color: "var(--text-muted)" }}>
                What something is made of determines how it ages, how it feels
                underhand, how it holds light, how it sits in its climate. We
                choose materials for what they do over time — not just how they
                read on the day they are installed.
              </p>
            </FadeUp>
            <FadeUp delay={0.16} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 md:mt-12">
              {["Wood", "Stone", "Joinery", "Sketches", "Models", "Material Boards", "Details"].map((m) => (
                <span
                  key={m}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-muted)" }}
                >
                  {m}
                </span>
              ))}
            </FadeUp>
          </section>

          {/* ── BACK / CONTACT ── */}
          <div className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12 lg:py-6 lg:pb-8">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Back to Home
              </span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Start a Conversation
              </span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
