"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Note } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import type { Dictionary } from "@/lib/i18n/dictionary";

type NoteRef = { slug: string; title: string };

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

export function JournalArticleView({
  note,
  prev,
  next,
}: {
  note: Note;
  prev: NoteRef | null;
  next: NoteRef | null;
}) {
  const reduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const nt = noteText(t, note.slug);
  const title = nt?.title ?? note.title;
  const excerpt = nt?.excerpt ?? note.excerpt;
  const paragraphs = nt?.paragraphs?.length ? nt.paragraphs : note.paragraphs;
  const category = noteCategory(t, note.category);

  const prevTitle = prev ? noteText(t, prev.slug)?.title ?? prev.title : null;
  const nextTitle = next ? noteText(t, next.slug)?.title ?? next.title : null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto w-full max-w-[46rem] px-5 sm:px-8 md:px-10">

          {/* ── Back to journal ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pt-10 md:pt-14"
          >
            <Link href="/journal" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ ...microLabel, color: "var(--text)" }}>{t.journalPage.eyebrow}</span>
            </Link>
          </motion.div>

          {/* ── Category · date ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-3 md:mt-14"
          >
            <span style={{ ...microLabel, color: "var(--accent)" }}>{category}</span>
            <span aria-hidden className="h-px w-6" style={{ backgroundColor: "var(--border-medium)" }} />
            <span style={{ ...microLabel, color: "var(--text-dim)" }}>
              {[note.date, note.readTime].filter(Boolean).join(" · ")}
            </span>
          </motion.div>

          {/* ── Title ── */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
            style={{
              fontFamily: "var(--font-avenir-book)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            {title}
          </motion.h1>

          {/* ── Lede ── */}
          {excerpt && (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[54ch]"
              style={{
                fontFamily: "var(--font-avenir-book)",
                fontSize: "clamp(1.08rem, 1.5vw, 1.25rem)",
                fontWeight: 500,
                lineHeight: 1.55,
                color: "var(--text-muted)",
              }}
            >
              {excerpt}
            </motion.p>
          )}

          {/* Hairline */}
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 h-px w-full origin-left bg-[var(--border-medium)] md:mt-10"
          />

          {/* ── Body ── */}
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 md:mt-10"
          >
            {paragraphs.map((para, j) => (
              <p
                key={j}
                className={j === 0 ? "" : "mt-6"}
                style={{
                  fontFamily: "var(--font-avenir-book)",
                  fontSize: "clamp(1.02rem, 1.25vw, 1.12rem)",
                  fontWeight: 400,
                  lineHeight: 1.9,
                  color: "var(--text)",
                }}
              >
                {para}
              </p>
            ))}
          </motion.article>

          {/* ── Prev / next articles ── */}
          <nav className="mt-16 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:mt-20">
            {prev ? (
              <Link href={`/journal/${prev.slug}`} className="group inline-flex max-w-full flex-col gap-1.5">
                <span style={{ ...microLabel, color: "var(--text-dim)" }}>← {t.nav.previous}</span>
                <span
                  className="transition-opacity duration-300 group-hover:opacity-70"
                  style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(0.98rem, 1.3vw, 1.15rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.25 }}
                >
                  {prevTitle}
                </span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/journal/${next.slug}`} className="group inline-flex max-w-full flex-col gap-1.5 sm:items-end sm:text-right">
                <span style={{ ...microLabel, color: "var(--text-dim)" }}>{t.nav.next} →</span>
                <span
                  className="transition-opacity duration-300 group-hover:opacity-70"
                  style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(0.98rem, 1.3vw, 1.15rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.25 }}
                >
                  {nextTitle}
                </span>
              </Link>
            ) : <span />}
          </nav>

          {/* ── Footer ── */}
          <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] py-8 pb-16">
            <Link href="/journal" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ ...microLabel, color: "var(--text)" }}>{t.journalPage.eyebrow}</span>
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
