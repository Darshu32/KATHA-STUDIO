import Link from "next/link";
import { services } from "@/lib/data";
import { SiteFooter, PageHeader } from "@/components/page-shell";

export const metadata = {
  title: "Services — KATHA Studio",
  description: "Architectural design, interiors, renovation, and consultation by KATHA Studio.",
};

const toneClass = (tone: string) =>
  tone === "warm" ? "bg-[#eeeae6]" : tone === "cool" ? "bg-[#e8eaec]" : "bg-[#f3f3f3]";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="03 — What We Offer" title="Services" />

        <div className="border-t border-[rgba(17,17,17,0.1)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-x-6 gap-y-14 py-14 sm:grid-cols-2 md:gap-x-10 md:gap-y-16 md:py-20 lg:gap-x-12 lg:gap-y-20 lg:py-20">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block space-y-4 transition-opacity hover:opacity-75"
                >
                  {/* Image */}
                  <div className={`${toneClass(service.tone)} aspect-[4/3] w-full relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.2),rgba(0,0,0,0.04))]" />
                    <div className="absolute bottom-3 left-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "rgba(17,17,17,0.3)" }}>
                      {service.id}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <p style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(0.95rem,1.5vw,1.05rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "#111" }}>
                      {service.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(17,17,17,0.28)" }}>
                      {service.category}
                    </p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.78rem,1.1vw,0.9rem)", lineHeight: 1.8, color: "var(--text-muted)" }}>
                      {service.desc}
                    </p>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "#111", borderBottom: "1px solid rgba(17,17,17,0.3)", paddingBottom: "2px", display: "inline-block" }}>
                      Read More &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
