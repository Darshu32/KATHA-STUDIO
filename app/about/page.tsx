import Link from "next/link";
import { SiteFooter, PageHeader } from "@/components/page-shell";
import { FadeUp } from "@/components/animations";
import { CountUp } from "@/components/count-up";

export const metadata = {
  title: "About — KATHA Studio",
  description: "Architecture and interiors shaped through proportion, restraint, and material calm.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="01 — About" title="Katha Studio" />

        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-10 py-14 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-24 lg:py-28">
              <FadeUp delay={0} className="space-y-5">
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,1.35vw,1.22rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  KATHA unfolds deliberately — a quieter architectural language, slower reveals,
                  and interiors shaped through proportion, restraint, and material calm.
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,1.35vw,1.22rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  A premium studio building residential and interior work through stronger
                  proportion, calmer materiality, and fewer but better decisions.
                </p>
              </FadeUp>
              <FadeUp delay={0.12} className="space-y-6">
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,1.35vw,1.22rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  Based in Ahmedabad, India — we work across residential architecture,
                  interior design, renovation, and architectural consultation.
                  Every project begins with listening.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)] hover:border-[var(--text)]"
                  style={{ borderColor: "var(--border-medium)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text)" }}
                >
                  Get in Touch
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </main>

      {/* ── Stats strip ── */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
          <FadeUp>
            <div className="grid grid-cols-3 divide-x divide-[var(--border)] py-14 md:py-16">
              {[
                { to: 12, suffix: "+", label: "Projects Completed" },
                { to: 4,  suffix: "",  label: "Years of Practice"  },
                { to: 3,  suffix: "",  label: "Design Disciplines" },
              ].map(({ to, suffix, label }) => (
                <div key={label} className="px-6 first:pl-0 last:pr-0 md:px-10 space-y-3">
                  <p
                    className="text-[var(--text)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.6rem,6vw,4.8rem)",
                      fontWeight: 600,
                      fontStyle: "italic",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp to={to} suffix={suffix} />
                  </p>
                  <p
                    style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
