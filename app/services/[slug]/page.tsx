import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { FadeUp } from "@/components/animations";
import { SideNav, MobileNav } from "@/components/side-nav";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: `${service.title} — KATHA Studio`, description: service.desc };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const { prev, next, index } = getAdjacentNav(`/services/${slug}`);

  const fallbackBg =
    service.tone === "warm" ? "#eeeae6"
    : service.tone === "cool" ? "#e8eaec"
    : "#f3f3f3";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">

      <SideNav prev={prev} next={next} />

      <main className="pt-[4.5rem]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-16">

          {/* ── SECTION LABEL + COUNTER ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — Service
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
              {service.title}
            </h1>
            <p className="mt-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-muted)" }}>
              {service.category}
            </p>
          </FadeUp>

          {/* ── LANDSCAPE IMAGE ── */}
          <FadeUp delay={0.16} className="mb-10 md:mb-12">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9", backgroundColor: fallbackBg }}
            >
              {service.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,rgba(0,0,0,0.15))]" />
            </div>
          </FadeUp>

          {/* ── INFO BELOW IMAGE ── */}
          <FadeUp delay={0.1} className="pb-16 md:pb-24">
            <div className="mb-8 h-px w-10" style={{ backgroundColor: "var(--border-medium)" }} />
            <div className="space-y-6" style={{ maxWidth: "58ch" }}>
              {(service.paragraphs ?? [service.desc]).map((para, i) => (
                <p key={i} style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(0.88rem, 1.35vw, 1.05rem)",
                  lineHeight: 2,
                  color: "var(--text-muted)",
                }}>
                  {para}
                </p>
              ))}
            </div>
          </FadeUp>

          <MobileNav prev={prev} next={next} />
        </div>
      </main>
    </div>
  );
}
