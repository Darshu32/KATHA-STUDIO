import Link from "next/link";
import { projects } from "@/lib/data";
import { FadeUp } from "@/components/animations";
import { ListingCard } from "@/components/listing-card";

export const metadata = {
  title: "Projects — KATHA Studio",
  description: "Selected architectural and interior design projects by KATHA Studio — Ahmedabad.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-16">

          {/* ── SECTION LABEL ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — Selected Work
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
              {projects.length} Projects
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.06} className="pb-10 md:pb-12">
            <h1 style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "clamp(2.4rem, 7.5vw, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--text)",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}>
              Projects
            </h1>
            <p className="mt-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-muted)" }}>
              Architecture & Interior Design · Ahmedabad
            </p>
          </FadeUp>

          {/* ── PROJECTS GRID ── */}
          <FadeUp delay={0.12} className="pb-16 md:pb-24">
            <div className="mb-8 h-px w-10" style={{ backgroundColor: "var(--border-medium)" }} />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12">
              {projects.map((project, i) => (
                <FadeUp key={project.slug} delay={0.16 + i * 0.08}>
                  <ListingCard
                    href={`/projects/${project.slug}`}
                    tone={project.tone}
                    topLabel={project.type}
                    image={project.image}
                    imageAlt={project.title}
                  >
                    <div className="space-y-2 pt-1">
                      <h2 style={{
                        fontFamily: "var(--font-avenir-heavy)",
                        fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: "var(--text)",
                        lineHeight: 1.1,
                      }}>
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-0 gap-y-1">
                        {[project.location, project.year].map((tag, j) => (
                          <span key={j} style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                            {j > 0 && <span style={{ margin: "0 0.45rem", opacity: 0.35 }}>·</span>}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ListingCard>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* ── BACK / ENQUIRE ── */}
          <FadeUp delay={0} className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Back to Home
              </span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Start a Project
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>

        </div>
      </main>
    </div>
  );
}
