import Link from "next/link";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: "Projects — KATHA Studio",
  description:
    "Our project portfolio is shared privately on request. Write to neha@kathastudio.co.",
};

const STUDIO_EMAIL = "neha@kathastudio.co";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8 md:px-12 lg:px-20">

          <FadeUp delay={0} className="pt-10 pb-6 md:pt-14">
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
              — Portfolio
            </p>
          </FadeUp>

          <FadeUp delay={0.06} className="pb-6 md:pb-8">
            <h1
              style={{
                fontFamily: "var(--font-avenir-book)",
                fontSize: "clamp(2.4rem, 8vw, 6rem)",
                fontWeight: 500,
                lineHeight: 0.96,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: "var(--text)",
              }}
            >
              On Request
            </h1>
          </FadeUp>

          <FadeUp delay={0.12} className="pb-10 md:pb-14">
            <p
              className="max-w-[58ch]"
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
            className="flex flex-col gap-3 pb-16 sm:flex-row sm:items-center sm:gap-6 md:pb-24"
          >
            <a
              href={`mailto:${STUDIO_EMAIL}?subject=Portfolio%20Request`}
              className="group inline-flex items-center gap-3 border border-[var(--text)] bg-[var(--background)] px-6 py-3.5 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.62rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.28em",
                color: "var(--text)",
              }}
            >
              Request Portfolio
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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

          <FadeUp
            delay={0.24}
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
                Start a Conversation
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
