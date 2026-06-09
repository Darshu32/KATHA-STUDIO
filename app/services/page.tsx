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
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.2rem]">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col px-5 sm:px-8 md:px-12 lg:px-20">

          {/* ── EYEBROW ── */}
          <FadeUp delay={0} className="pt-10 pb-3 md:pt-14 lg:pt-9 lg:pb-2">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "var(--fs-caption)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — What We Offer
            </p>
          </FadeUp>

          {/* ── HEADLINE ── */}
          <FadeUp delay={0.06} className="pb-3 md:pb-4 lg:pb-1">
            <h1 style={{
              fontFamily: "var(--font-avenir-book)",
              fontSize: "var(--fs-page-title)",
              fontWeight: 300,
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}>
              How We Build
            </h1>
          </FadeUp>

          {/* Hairline beneath headline */}
          <FadeUp delay={0.16} className="mt-2 md:mt-3 lg:mt-2">
            <div className="h-px w-full bg-[var(--border-medium)]" />
          </FadeUp>

          {/* ── SERVICES GRID ── */}
          <FadeUp delay={0.22} className="pb-16 pt-6 md:pb-20 md:pt-8 lg:pb-6 lg:pt-6">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:gap-x-14 lg:gap-y-8">
              {services.map((service, i) => (
                <FadeUp key={service.slug} delay={0.16 + i * 0.08}>
                  <ListingCard
                    href={`/services/${service.slug}`}
                    tone={service.tone}
                    topLabel={service.category}
                    image={service.image}
                    imageAlt={service.title}
                  >
                    <div className="pt-1">
                      <h2 style={{
                        fontFamily: "var(--font-avenir-book)",
                        fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        color: "var(--text)",
                        lineHeight: 1.15,
                      }}>
                        {service.title}
                      </h2>
                    </div>
                  </ListingCard>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* ── BACK / ENQUIRE ── */}
          <div className="flex items-center justify-between border-t border-[var(--border)] py-8 pb-12 lg:py-3 lg:pb-4">
            <Link href="/" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Back to Home
              </span>
            </Link>
            <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Get in Touch
              </span>
              <span className="accent-arrow inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
