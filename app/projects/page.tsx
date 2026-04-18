import Link from "next/link";
import { categories, getProjectsByCategory } from "@/lib/data";
import { FadeUp } from "@/components/animations";
import { CategoryIndex } from "@/components/category-index";

export const metadata = {
  title: "Projects — KATHA Studio",
  description:
    "Selected architectural and interior design projects by KATHA Studio — Bengaluru.",
};

export default function ProjectsPage() {
  const rows = categories.map((c) => ({
    ...c,
    count: getProjectsByCategory(c.slug).length,
  }));

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── SECTION LABEL ── */}
          <FadeUp
            delay={0}
            className="flex items-center justify-between pt-10 pb-6 md:pt-14"
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.62rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                color: "var(--text-dim)",
              }}
            >
              — Index
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                color: "var(--text-dim)",
              }}
            >
              {categories.length} Chapters
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.06} className="pb-4 md:pb-6">
            <h1
              style={{
                fontFamily: "var(--font-avenir-heavy)",
                fontSize: "clamp(2.6rem, 9vw, 7.5rem)",
                fontWeight: 800,
                lineHeight: 0.92,
                textTransform: "uppercase",
                letterSpacing: "0.005em",
                color: "var(--text)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              Projects
            </h1>
          </FadeUp>

          {/* ── Editorial standfirst + meta ── */}
          <FadeUp
            delay={0.12}
            className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-[1fr_auto] md:gap-10 md:pb-16 lg:pb-20"
          >
            <p
              className="max-w-[52ch]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "var(--text-muted)",
              }}
            >
              The practice is organised into three chapters — each its own
              way of listening, drawing, and building. Hover a chapter to
              glimpse what it holds; click to step inside.
            </p>
            <div className="flex flex-col items-start md:items-end md:text-right">
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text-dim)",
                }}
              >
                Studio · Bengaluru
              </span>
              <span
                className="mt-1"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--text-dim)",
                }}
              >
                2019 — {new Date().getFullYear()}
              </span>
            </div>
          </FadeUp>

          {/* ── CATEGORY INDEX ── */}
          <FadeUp delay={0.18} className="pb-16 md:pb-24 lg:pb-28">
            <CategoryIndex rows={rows} />
          </FadeUp>

          {/* ── BACK / ENQUIRE ── */}
          <FadeUp
            delay={0}
            className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text)",
                }}
              >
                Back to Home
              </span>
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55"
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text)",
                }}
              >
                Start a Project
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>

        </div>
      </main>
    </div>
  );
}
