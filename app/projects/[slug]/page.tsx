import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { FadeUp } from "@/components/animations";
import { SideNav, MobileNav } from "@/components/side-nav";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — KATHA Studio`, description: project.philosophy };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { prev, next, index } = getAdjacentNav(`/projects/${slug}`);

  const fallbackBg =
    project.tone === "warm" ? "#eeeae6"
    : project.tone === "cool" ? "#e8eaec"
    : "#f3f3f3";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">

      <SideNav prev={prev} next={next} />

      <main className="pt-[4.5rem]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-16">

          {/* ── SECTION LABEL + COUNTER ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — Project
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
              {String(index + 1).padStart(2, "0")} / 09
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.08} className="pb-6">
            <h1 style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "clamp(2.1rem, 7.5vw, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--text)",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}>
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              {[project.type, project.location, project.year].map((tag, i) => (
                <span key={i} style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-muted)" }}>
                  {i > 0 && <span style={{ margin: "0 0.4rem", opacity: 0.35 }}>·</span>}
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* ── HERO IMAGE ── */}
          <FadeUp delay={0.16} className="mb-10 md:mb-12">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9", backgroundColor: fallbackBg }}
            >
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.2))]" />
            </div>
          </FadeUp>

          {/* ── INFO BELOW IMAGE ── */}
          <FadeUp delay={0.1} className="pb-16 md:pb-24">
            <div className="mb-6 h-px w-10" style={{ backgroundColor: "var(--border-medium)" }} />
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.88rem, 1.35vw, 1.05rem)",
              lineHeight: 2,
              color: "var(--text-muted)",
              maxWidth: "58ch",
            }}>
              {project.philosophy}
            </p>

            <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Enquire About This Project
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>

          <MobileNav prev={prev} next={next} />
        </div>
      </main>
    </div>
  );
}
