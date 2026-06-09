import Link from "next/link";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: "Projects — KATHA Studio",
  description:
    "Our project portfolio is shared privately on request. Write to neha@kathastudio.co.",
};

const STUDIO_EMAIL = "neha@kathastudio.co";

/* The portfolio itself is shared privately. This quiet index tells a
 * visitor what the body of work holds — drawn from the studio's own
 * disciplines, not invented projects. */
const portfolioIndex = [
  {
    num: "01",
    title: "Architecture",
    note: "Homes and buildings shaped around light, proportion and the people who use them.",
  },
  {
    num: "02",
    title: "Interiors",
    note: "Calm, tactile spaces made through materiality and thoughtful detailing.",
  },
  {
    num: "03",
    title: "Renovation",
    note: "Existing places evolved while keeping the character worth holding on to.",
  },
  {
    num: "04",
    title: "Landscapes & Drawings",
    note: "Courtyards, thresholds and studies — the ground a building arrives through.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] lg:flex lg:h-[100svh] lg:flex-col lg:overflow-hidden">
      <main className="flex-1 pt-[4.2rem] lg:flex lg:flex-col lg:pt-[3.2rem]">
        <div className="mx-auto flex w-full max-w-[78rem] flex-1 flex-col px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── TWO-COLUMN EDITORIAL BODY ── */}
          <div className="grid flex-1 grid-cols-1 gap-12 pt-10 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:pt-0">

            {/* LEFT — invitation */}
            <div>
              <FadeUp delay={0} className="pb-6">
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "var(--fs-caption)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.32em",
                    color: "var(--text-dim)",
                  }}
                >
                  — Portfolio
                </p>
              </FadeUp>

              <FadeUp delay={0.06} className="pb-6 md:pb-8">
                <h1
                  style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "var(--fs-page-title)",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                  }}
                >
                  On Request
                </h1>
              </FadeUp>

              <FadeUp delay={0.12} className="pb-9 md:pb-10">
                <p
                  className="max-w-[52ch]"
                  style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                  }}
                >
                  Our work spans homes, landscapes, and drawings — quietly built
                  over years. We share the full portfolio privately, on request.
                  Write to us with a note about your project or simply your
                  curiosity, and we will send across a curated selection.
                </p>
              </FadeUp>

              <FadeUp
                delay={0.18}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
              >
                <a
                  href={`mailto:${STUDIO_EMAIL}?subject=Portfolio%20Request`}
                  className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-medium)] bg-[var(--background)] px-7 py-3.5 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.66rem",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--text)",
                  }}
                >
                  Request Portfolio
                  <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                  }}
                >
                  {STUDIO_EMAIL}
                </a>
              </FadeUp>
            </div>

            {/* RIGHT — what the work holds */}
            <FadeUp
              delay={0.24}
              className="lg:border-l lg:border-[var(--border)] lg:pl-16 xl:pl-20"
            >
              <p
                className="mb-7 md:mb-8"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "var(--fs-caption)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.32em",
                  color: "var(--text-dim)",
                }}
              >
                — What the Work Holds
              </p>

              <ul>
                {portfolioIndex.map((item) => (
                  <li
                    key={item.num}
                    className="flex items-baseline gap-5 border-t border-[var(--border)] py-5 last:border-b"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        color: "var(--text-dim)",
                        minWidth: "1.6rem",
                      }}
                    >
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <h2
                        style={{
                          fontFamily: "var(--font-avenir-book)",
                          fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.2,
                          color: "var(--text)",
                        }}
                      >
                        {item.title}
                      </h2>
                      <p
                        className="mt-1.5 max-w-[40ch]"
                        style={{
                          fontFamily: "var(--font-avenir-book)",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          color: "var(--text-muted)",
                        }}
                      >
                        {item.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* ── FOOTER ── */}
          <FadeUp
            delay={0.3}
            className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] py-8 pb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:mt-0 lg:py-6 lg:pb-6"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55"
            >
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">
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
                Start a Conversation
              </span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeUp>

        </div>
      </main>
    </div>
  );
}
