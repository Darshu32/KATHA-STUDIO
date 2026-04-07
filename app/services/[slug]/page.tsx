import Link from "next/link";
import { notFound } from "next/navigation";
import { services, projects } from "@/lib/data";
import { SiteFooter } from "@/components/page-shell";
import { FadeUp, SplitReveal } from "@/components/animations";
import { ParallaxHero } from "@/components/parallax-hero";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return { title: `${service.title} — KATHA Studio`, description: service.desc };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const idx = services.indexOf(service);
  const prev = services[idx - 1] ?? null;
  const next = services[idx + 1] ?? null;

  const bg =
    service.tone === "warm" ? "bg-[#eeeae6]"
    : service.tone === "cool" ? "bg-[#e8eaec]"
    : "bg-[#f3f3f3]";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        {/* Hero */}
        <ParallaxHero
          bgClass={bg}
          outerClass="w-full aspect-[16/9] md:aspect-[16/7]"
          label={service.category}
        />

        {/* Header */}
        <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
          <div className="grid gap-10 py-14 md:gap-16 md:py-20 lg:grid-cols-[0.55fr_0.45fr] lg:gap-24 lg:py-28">
            <FadeUp delay={0} className="space-y-4">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--text-dim)" }}>
                {service.id} — Services
              </p>
              <SplitReveal
                text={service.title}
                tag="h1"
                delay={0.08}
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5.2vw,5rem)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.02, letterSpacing: "-0.02em", color: "var(--text)" }}
              />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                {service.category}
              </p>
            </FadeUp>
            <FadeUp delay={0.18} className="space-y-7">
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.05rem,1.4vw,1.28rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>
                {service.desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                style={{ borderColor: "var(--border-medium)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text)" }}
              >
                Book a Consultation
              </Link>
            </FadeUp>
          </div>

          {/* Related Projects */}
          <FadeUp delay={0} className="border-t border-[var(--border)] py-14 md:py-20 lg:py-24">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-5 w-[2px] bg-[var(--text)]" />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Related Projects
              </p>
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-12">
              {projects.map((project, pi) => {
                const projBg =
                  project.tone === "warm" ? "bg-[#eeeae6]" : project.tone === "cool" ? "bg-[#e8eaec]" : "bg-[#f3f3f3]";
                return (
                  <FadeUp key={project.slug} delay={pi * 0.1}>
                  <Link href={`/projects/${project.slug}`} className="group block space-y-3 transition-opacity hover:opacity-75">
                    <div className={`${projBg} aspect-[4/3] w-full relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(0,0,0,0.04))]" />
                      <div className="absolute bottom-3 left-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                        {project.id}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem,1.5vw,1.3rem)", fontWeight: 600, fontStyle: "italic", letterSpacing: "-0.01em", lineHeight: 1.1, color: "var(--text)" }}>
                        {project.title}
                      </p>
                      <div className="flex flex-wrap gap-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-dim)" }}>
                        <span>{project.type}</span>
                        <span>{project.year}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text)", borderBottom: "1px solid var(--border-medium)", paddingBottom: "2px", display: "inline-block" }}>
                        Read More &rarr;
                      </span>
                    </div>
                  </Link>
                  </FadeUp>
                );
              })}
            </div>
          </FadeUp>
        </div>

        {/* Prev / Next */}
        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] grid grid-cols-2 divide-x divide-[var(--border)]">
            <div>
              {prev ? (
                <Link href={`/services/${prev.slug}`} className="flex flex-col gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>&larr; Previous</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem,1.7vw,1.25rem)", fontWeight: 600, fontStyle: "italic", letterSpacing: "-0.01em", color: "var(--text)" }}>{prev.title}</span>
                </Link>
              ) : <div className="px-5 py-8 md:px-12 lg:px-20" />}
            </div>
            <div className="text-right">
              {next ? (
                <Link href={`/services/${next.slug}`} className="flex flex-col items-end gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>Next &rarr;</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem,1.7vw,1.25rem)", fontWeight: 600, fontStyle: "italic", letterSpacing: "-0.01em", color: "var(--text)" }}>{next.title}</span>
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
