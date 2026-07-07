"use client";

import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { useLanguage } from "@/components/language-provider";

const STEP_NUMS = ["01", "02", "03", "04", "05"];

export function ApproachView() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── EYEBROW ── */}
          <FadeUp delay={0} className="pt-10 pb-3 md:pt-14 lg:pt-10 lg:pb-2">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              {t.approach.eyebrow}
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
              {t.approach.title}
            </h1>
          </FadeUp>

          <FadeUp delay={0.12} className="pb-2">
            <p className="max-w-[58ch]" style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75, color: "var(--text-muted)" }}>
              {t.approach.intro}
            </p>
          </FadeUp>

          {/* Hairline */}
          <FadeUp delay={0.16} className="mt-6 md:mt-8">
            <div className="h-px w-full bg-[var(--border-medium)]" />
          </FadeUp>

          {/* ── STEPS ── */}
          <div className="mb-16 overflow-hidden lg:mb-20">
            <div className="-ml-px -mt-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {t.approach.steps.map((step, i) => (
              <FadeUp key={STEP_NUMS[i]} delay={0.2 + i * 0.07} className="border-l border-t border-[var(--border)] bg-[var(--background)]">
                <div className="flex h-full flex-col gap-4 px-1 py-8 md:px-2 lg:px-3 lg:py-10">
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.28em", color: "var(--text-dim)" }}>
                    {STEP_NUMS[i]}
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
          </div>

          {/* ── BACK / CONTACT ── */}
          <div className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12 lg:py-6 lg:pb-8">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                {t.nav.backToHome}
              </span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                {t.approach.startConversation}
              </span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
