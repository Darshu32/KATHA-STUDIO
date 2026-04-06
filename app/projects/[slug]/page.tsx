import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { SiteFooter } from "@/components/page-shell";
import { FadeUp, SplitReveal } from "@/components/animations";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: `${project.title} — KATHA Studio`, description: project.philosophy };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = projects.indexOf(project);
  const prev = projects[idx - 1] ?? null;
  const next = projects[idx + 1] ?? null;

  const bg =
    project.tone === "warm" ? "bg-[#eeeae6]"
    : project.tone === "cool" ? "bg-[#e8eaec]"
    : "bg-[#f3f3f3]";

  const bg2 = project.tone === "warm" ? "bg-[#e8eaec]" : "bg-[#eeeae6]";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        {/* Hero image */}
        <div className={`w-full ${bg} aspect-[16/9] md:aspect-[16/8] relative`}>
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(0,0,0,0.05))]" />
          <div className="absolute bottom-4 left-5" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
            {project.type} — {project.location}
          </div>
        </div>

        {/* Header */}
        <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
          <div className="grid gap-10 py-14 md:gap-16 md:py-20 lg:grid-cols-[0.55fr_0.45fr] lg:gap-24 lg:py-28">
            <FadeUp delay={0} className="space-y-5">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--text-dim)" }}>
                Chapter {project.id}
              </p>
              <SplitReveal
                text={project.title}
                tag="h1"
                delay={0.08}
                style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem,4.8vw,4.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text)" }}
              />
              <div className="flex flex-wrap gap-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                <span>{project.type}</span>
                <span>{project.location}</span>
                <span>{project.year}</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.18} className="space-y-6">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "var(--text-muted)" }}>
                {project.philosophy}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                style={{ borderColor: "var(--border-medium)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text)" }}
              >
                Enquire About This Project
              </Link>
            </FadeUp>
          </div>

          {/* Gallery */}
          <FadeUp delay={0} className="grid gap-4 pb-14 sm:grid-cols-2 md:gap-5 md:pb-20 lg:pb-24">
            <div className={`${bg} aspect-[4/3] relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(0,0,0,0.04))]" />
            </div>
            <div className={`${bg2} aspect-[4/3] relative`}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(0,0,0,0.04))]" />
            </div>
          </FadeUp>

          {/* Full-width image */}
          <FadeUp delay={0.1}>
            <div className={`${bg} aspect-[4/3] w-full relative mb-14 sm:aspect-[21/9] md:mb-20 lg:mb-24`}>
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(0,0,0,0.06))]" />
            </div>
          </FadeUp>
        </div>

        {/* Prev / Next */}
        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] grid grid-cols-2 divide-x divide-[var(--border)]">
            <div>
              {prev ? (
                <Link href={`/projects/${prev.slug}`} className="flex flex-col gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>&larr; Previous</span>
                  <span style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.85rem,1.5vw,1rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--text)" }}>{prev.title}</span>
                </Link>
              ) : <div className="px-5 py-8 md:px-12 lg:px-20" />}
            </div>
            <div className="text-right">
              {next ? (
                <Link href={`/projects/${next.slug}`} className="flex flex-col items-end gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>Next &rarr;</span>
                  <span style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.85rem,1.5vw,1rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--text)" }}>{next.title}</span>
                </Link>
              ) : <div className="px-5 py-8 md:px-12 lg:px-20" />}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
