import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryBySlug,
  getProjectsByCategory,
} from "@/lib/data";
import { FadeUp } from "@/components/animations";
import { ListingCard } from "@/components/listing-card";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.title} — KATHA Studio`,
    description: cat.tagline,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const items = getProjectsByCategory(cat.slug);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── SECTION LABEL + CHAPTER INDEX ── */}
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
              — Chapter {cat.index}
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
              {items.length === 0
                ? "In preparation"
                : `${String(items.length).padStart(2, "0")} ${
                    items.length === 1 ? "Work" : "Works"
                  }`}
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.06} className="pb-4 md:pb-6">
            <h1
              style={{
                fontFamily: "var(--font-avenir-heavy)",
                fontSize: "clamp(2.4rem, 7.5vw, 6rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "var(--text)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {cat.title}
            </h1>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.62rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.26em",
                color: "var(--text-muted)",
              }}
            >
              KATHA Studio · Bengaluru
            </p>
          </FadeUp>

          {/* ── Tagline ── */}
          <FadeUp delay={0.12} className="pb-10 md:pb-14">
            <p
              className="max-w-[52ch]"
              style={{
                fontFamily: "var(--font-avenir-book)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.7,
                color: "var(--text-muted)",
              }}
            >
              {cat.tagline}
            </p>
          </FadeUp>

          {/* ── GRID or EMPTY STATE ── */}
          <FadeUp delay={0.18} className="pb-16 md:pb-24">
            <div
              className="mb-8 h-px w-10"
              style={{ backgroundColor: "var(--border-medium)" }}
            />

            {items.length > 0 ? (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-14">
                {items.map((project, i) => (
                  <FadeUp key={project.slug} delay={0.22 + i * 0.08}>
                    <ListingCard
                      href={`/projects/${project.category}/${project.slug}`}
                      tone={project.tone}
                      topLabel={project.type}
                      image={project.image}
                      imageAlt={project.title}
                    >
                      <div className="space-y-2 pt-1">
                        <h2
                          style={{
                            fontFamily: "var(--font-avenir-heavy)",
                            fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                            color: "var(--text)",
                            lineHeight: 1.1,
                          }}
                        >
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-0 gap-y-1">
                          {[project.location, project.year].map((tag, j) => (
                            <span
                              key={j}
                              style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "0.62rem",
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.22em",
                                color: "var(--text-dim)",
                              }}
                            >
                              {j > 0 && (
                                <span style={{ margin: "0 0.45rem", opacity: 0.35 }}>·</span>
                              )}
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ListingCard>
                  </FadeUp>
                ))}
              </div>
            ) : (
              /* ── Editorial empty state ── */
              <div
                className="flex min-h-[38vh] flex-col items-start justify-center gap-6 border-t border-b border-[var(--border)] py-16 md:py-24"
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.34em",
                    color: "var(--text-dim)",
                  }}
                >
                  ◆ In the darkroom
                </span>
                <p
                  className="max-w-[44ch]"
                  style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "clamp(1.35rem, 2.4vw, 2rem)",
                    lineHeight: 1.4,
                    color: "var(--text)",
                  }}
                >
                  This chapter is being set in type. New work will arrive here soon — shaped, photographed, and ready to be read.
                </p>
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
                    Ask about this chapter
                  </span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            )}
          </FadeUp>

          {/* ── BACK TO PROJECTS / ENQUIRE ── */}
          <FadeUp
            delay={0}
            className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12"
          >
            <Link
              href="/projects"
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
                All Chapters
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
