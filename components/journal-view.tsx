"use client";

import Link from "next/link";
import { notes, publishedNotes } from "@/lib/data";
import { FadeUp } from "@/components/animations";
import { useLanguage } from "@/components/language-provider";
import type { Dictionary } from "@/lib/i18n/dictionary";

const eyebrow = {
  fontFamily: "var(--font-inter)",
  fontSize: "var(--fs-caption)",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.32em",
  color: "var(--text-dim)",
};

const microLabel = {
  fontFamily: "var(--font-inter)",
  fontSize: "0.58rem",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.26em",
};

function noteCategory(t: Dictionary, category: string): string {
  const map = t.noteCategories as Record<string, string>;
  return map[category] ?? category;
}

function noteText(t: Dictionary, slug: string) {
  return (t.notes as Record<string, { title: string; excerpt: string; paragraphs: string[] }>)[slug];
}

export function JournalView() {
  const { t } = useLanguage();
  const forthcoming = notes.filter((n) => n.status === "forthcoming");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto w-full max-w-[46rem] px-5 sm:px-8 md:px-10">

          {/* ── MASTHEAD ── */}
          <FadeUp className="pt-12 md:pt-16">
            <p style={eyebrow}>{t.journalPage.eyebrow}</p>
          </FadeUp>

          <FadeUp delay={0.06} className="mt-5">
            <h1
              style={{
                fontFamily: "var(--font-avenir-book)",
                fontSize: "var(--fs-page-title)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              {t.journalPage.title}
            </h1>
          </FadeUp>

          <FadeUp delay={0.12} className="mt-6 max-w-[44ch]">
            <p
              style={{
                fontFamily: "var(--font-avenir-book)",
                fontSize: "clamp(0.98rem, 1.2vw, 1.12rem)",
                lineHeight: 1.72,
                color: "var(--text-muted)",
              }}
            >
              {t.journalPage.intro}
            </p>
          </FadeUp>

          {/* ── THE INDEX — titles only, each opens its own reading page.
                Keeps the page short however many pieces are published. ── */}
          <div className="mt-12 md:mt-16">
            {publishedNotes.map((note, i) => {
              const title = noteText(t, note.slug)?.title ?? note.title;
              return (
                <FadeUp key={note.slug} delay={0.04 + i * 0.05}>
                  <Link
                    href={`/journal/${note.slug}`}
                    className={`group block ${
                      i === 0 ? "border-t border-[var(--border-medium)]" : "border-t border-[var(--border)]"
                    } py-7 transition-opacity hover:opacity-100 md:py-8`}
                  >
                    {/* Category · date */}
                    <div className="flex items-center gap-3">
                      <span style={{ ...microLabel, color: "var(--accent)" }}>
                        {noteCategory(t, note.category)}
                      </span>
                      <span aria-hidden className="h-px w-6" style={{ backgroundColor: "var(--border-medium)" }} />
                      <span style={{ ...microLabel, color: "var(--text-dim)" }}>
                        {[note.date, note.readTime].filter(Boolean).join(" · ")}
                      </span>
                    </div>

                    {/* Title with arrow */}
                    <h2
                      className="mt-3 flex items-start justify-between gap-4"
                      style={{
                        fontFamily: "var(--font-avenir-book)",
                        fontSize: "clamp(1.5rem, 3.4vw, 2.2rem)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        color: "var(--text)",
                      }}
                    >
                      <span className="transition-opacity duration-300 group-hover:opacity-60">{title}</span>
                      <span
                        aria-hidden
                        className="accent-arrow mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ fontSize: "0.9rem" }}
                      >
                        ↗
                      </span>
                    </h2>
                  </Link>
                </FadeUp>
              );
            })}
          </div>

          {/* ── FORTHCOMING — one quiet line ── */}
          {forthcoming.length > 0 && (
            <FadeUp className="mt-16 border-t border-[var(--border)] pt-8 md:mt-24">
              <p style={{ ...microLabel, color: "var(--text-dim)" }}>
                {t.journalPage.inPreparation} — {forthcoming.map((n) => noteText(t, n.slug)?.title ?? n.title).join(" · ")}
              </p>
            </FadeUp>
          )}

          {/* ── FOOTER ── */}
          <div className="mt-14 flex items-center justify-between border-t border-[var(--border)] py-8 pb-16 md:mt-20">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ ...microLabel, color: "var(--text)" }}>{t.nav.backToHome}</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ ...microLabel, color: "var(--text)" }}>{t.journalPage.stayInTouch}</span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
