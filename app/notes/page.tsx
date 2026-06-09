import Link from "next/link";
import { notes, publishedNotes } from "@/lib/data";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: "Notes — KATHA Studio",
  description:
    "Reflections from the studio — on material, proportion, light, and the practice of building thoughtfully.",
};

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

export default function NotesPage() {
  const forthcoming = notes.filter((n) => n.status === "forthcoming");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto w-full max-w-[46rem] px-5 sm:px-8 md:px-10">

          {/* ── MASTHEAD ── */}
          <FadeUp className="pt-12 md:pt-16">
            <p style={eyebrow}>— From the Studio</p>
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
              Notes
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
              Our quieter writing — reflections on the way we work, the materials
              we return to, and the small observations that come from spending
              time in people&apos;s homes. A register, kept slowly.
            </p>
          </FadeUp>

          {/* ── THE NOTES, READ IN PLACE ── */}
          <div className="mt-14 md:mt-20">
            {publishedNotes.map((note, i) => (
              <FadeUp
                key={note.slug}
                delay={0.04}
                className={
                  i === 0
                    ? "border-t border-[var(--border-medium)] pt-12 md:pt-14"
                    : "mt-16 border-t border-[var(--border)] pt-12 md:mt-24 md:pt-14"
                }
              >
                <article>
                  {/* Category · date */}
                  <div className="flex items-center gap-3">
                    <span style={{ ...microLabel, color: "var(--accent)" }}>
                      {note.category}
                    </span>
                    <span
                      aria-hidden
                      className="h-px w-6"
                      style={{ backgroundColor: "var(--border-medium)" }}
                    />
                    <span style={{ ...microLabel, color: "var(--text-dim)" }}>
                      {[note.date, note.readTime].filter(Boolean).join(" · ")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-avenir-book)",
                      fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                      fontWeight: 300,
                      lineHeight: 1.06,
                      letterSpacing: "-0.02em",
                      color: "var(--text)",
                    }}
                  >
                    {note.title}
                  </h2>

                  {/* Lede */}
                  {note.excerpt && (
                    <p
                      className="mt-5 max-w-[52ch]"
                      style={{
                        fontFamily: "var(--font-avenir-book)",
                        fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                        fontWeight: 500,
                        lineHeight: 1.55,
                        color: "var(--text-muted)",
                      }}
                    >
                      {note.excerpt}
                    </p>
                  )}

                  {/* Body */}
                  <div className="mt-6">
                    {note.paragraphs.map((para, j) => (
                      <p
                        key={j}
                        className={j === 0 ? "" : "mt-5"}
                        style={{
                          fontFamily: "var(--font-avenir-book)",
                          fontSize: "clamp(1rem, 1.2vw, 1.08rem)",
                          fontWeight: 400,
                          lineHeight: 1.85,
                          color: "var(--text)",
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>

          {/* ── FORTHCOMING — one quiet line ── */}
          {forthcoming.length > 0 && (
            <FadeUp className="mt-16 border-t border-[var(--border)] pt-8 md:mt-24">
              <p style={{ ...microLabel, color: "var(--text-dim)" }}>
                In preparation — {forthcoming.map((n) => n.title).join(" · ")}
              </p>
            </FadeUp>
          )}

          {/* ── FOOTER ── */}
          <div className="mt-14 flex items-center justify-between border-t border-[var(--border)] py-8 pb-16 md:mt-20">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ ...microLabel, color: "var(--text)" }}>Back to Home</span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ ...microLabel, color: "var(--text)" }}>Stay in Touch</span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
