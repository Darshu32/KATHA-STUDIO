import Link from "next/link";
import { SiteFooter, PageHeader } from "@/components/page-shell";

export const metadata = {
  title: "About — KATHA Studio",
  description: "Architecture and interiors shaped through proportion, restraint, and material calm.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="01 — About" title="Katha Studio" />

        <div className="border-t border-[rgba(17,17,17,0.1)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-10 py-14 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-24 lg:py-28">
              <div className="space-y-5">
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "var(--text-muted)" }}>
                  KATHA unfolds deliberately — a quieter architectural language, slower reveals,
                  and interiors shaped through proportion, restraint, and material calm.
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "var(--text-muted)" }}>
                  A premium studio building residential and interior work through stronger
                  proportion, calmer materiality, and fewer but better decisions.
                </p>
              </div>
              <div className="space-y-6">
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "var(--text-muted)" }}>
                  Based in Ahmedabad, India — we work across residential architecture,
                  interior design, renovation, and architectural consultation.
                  Every project begins with listening.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                  style={{ borderColor: "rgba(17,17,17,0.5)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "#111" }}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
