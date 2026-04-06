import Link from "next/link";
import { notFound } from "next/navigation";
import { services, projects } from "@/lib/data";
import { SiteFooter } from "@/components/page-shell";

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
        <div className={`w-full ${bg} aspect-[16/9] md:aspect-[16/7] relative`}>
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(0,0,0,0.05))]" />
          <div className="absolute bottom-4 left-5" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "rgba(17,17,17,0.3)" }}>
            {service.category}
          </div>
        </div>

        {/* Header */}
        <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
          <div className="grid gap-10 py-14 md:gap-16 md:py-20 lg:grid-cols-[0.55fr_0.45fr] lg:gap-24 lg:py-28">
            <div className="space-y-4">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(17,17,17,0.28)" }}>
                {service.id} — Services
              </p>
              <h1 style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(1.8rem,4.8vw,4.5rem)", fontWeight: 800, lineHeight: 1.0, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111" }}>
                {service.title}
              </h1>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(17,17,17,0.35)" }}>
                {service.category}
              </p>
            </div>
            <div className="space-y-7">
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "rgba(17,17,17,0.58)" }}>
                {service.desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[#111] hover:text-white"
                style={{ borderColor: "rgba(17,17,17,0.5)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "#111" }}
              >
                Book a Consultation
              </Link>
            </div>
          </div>

          {/* Related Projects */}
          <div className="border-t border-[rgba(17,17,17,0.1)] py-14 md:py-20 lg:py-24">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-5 w-[2px] bg-[#111]" />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "#111" }}>
                Related Projects
              </p>
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-12">
              {projects.map((project) => {
                const projBg =
                  project.tone === "warm" ? "bg-[#eeeae6]" : project.tone === "cool" ? "bg-[#e8eaec]" : "bg-[#f3f3f3]";
                return (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="group block space-y-3 transition-opacity hover:opacity-75">
                    <div className={`${projBg} aspect-[4/3] w-full relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(0,0,0,0.04))]" />
                      <div className="absolute bottom-3 left-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(17,17,17,0.3)" }}>
                        {project.id}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.82rem,1.1vw,0.95rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111" }}>
                        {project.title}
                      </p>
                      <div className="flex flex-wrap gap-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(17,17,17,0.28)" }}>
                        <span>{project.type}</span>
                        <span>{project.year}</span>
                      </div>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "#111", borderBottom: "1px solid rgba(17,17,17,0.25)", paddingBottom: "2px", display: "inline-block" }}>
                        Read More &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="border-t border-[rgba(17,17,17,0.1)]">
          <div className="mx-auto max-w-[88rem] grid grid-cols-2 divide-x divide-[rgba(17,17,17,0.1)]">
            <div>
              {prev ? (
                <Link href={`/services/${prev.slug}`} className="flex flex-col gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "rgba(17,17,17,0.28)" }}>&larr; Previous</span>
                  <span style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.85rem,1.5vw,1rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111" }}>{prev.title}</span>
                </Link>
              ) : <div className="px-5 py-8 md:px-12 lg:px-20" />}
            </div>
            <div className="text-right">
              {next ? (
                <Link href={`/services/${next.slug}`} className="flex flex-col items-end gap-2 px-5 py-8 transition-opacity hover:opacity-60 md:px-12 md:py-10 lg:px-20">
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "rgba(17,17,17,0.28)" }}>Next &rarr;</span>
                  <span style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.85rem,1.5vw,1rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111" }}>{next.title}</span>
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
