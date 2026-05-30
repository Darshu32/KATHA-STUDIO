import Link from "next/link";
import { services } from "@/lib/data";
import { FadeUp } from "@/components/animations";
import { ListingCard } from "@/components/listing-card";

export const metadata = {
  title: "Services — KATHA Studio",
  description: "Architectural and interior design services by KATHA Studio — Bengaluru.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)] lg:flex lg:h-[100svh] lg:min-h-0 lg:flex-col lg:overflow-hidden">
      <main className="pt-[4.2rem] lg:flex lg:flex-1 lg:flex-col lg:min-h-0">
        <div className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── SECTION LABEL ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14 lg:pt-6 lg:pb-3">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — What We Offer
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
              {services.length} Services
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.06} className="pb-10 md:pb-12 lg:pb-4">
            <h1 style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--text)",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}>
              Services
            </h1>
            <p className="mt-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-muted)" }}>
              Architecture & Interior Design · Bengaluru
            </p>
          </FadeUp>

          {/* ── SERVICES GRID ── */}
          <FadeUp delay={0.12} className="pb-16 md:pb-24 lg:flex-1 lg:pb-4">
            <div className="mb-8 h-px w-10 lg:mb-4" style={{ backgroundColor: "var(--border-medium)" }} />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-6">
              {services.map((service, i) => (
                <FadeUp key={service.slug} delay={0.16 + i * 0.08}>
                  <ListingCard
                    href={`/services/${service.slug}`}
                    tone={service.tone}
                    topLabel={service.category}
                    image={service.image}
                    imageAlt={service.title}
                  >
                    <div className="space-y-2 pt-1">
                      <h2 style={{
                        fontFamily: "var(--font-avenir-heavy)",
                        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: "var(--text)",
                        lineHeight: 1.1,
                      }}>
                        {service.title}
                      </h2>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                        {service.category}
                      </p>
                    </div>
                  </ListingCard>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* ── BACK / ENQUIRE ── */}
          <FadeUp delay={0} className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12 lg:py-4 lg:pb-5">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Back to Home
              </span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Get in Touch
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>

        </div>
      </main>
    </div>
  );
}
