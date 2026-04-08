import Link from "next/link";
import { getAdjacentNav } from "@/lib/nav-order";
import { FadeUp } from "@/components/animations";
import { CountUp } from "@/components/count-up";
import { SideNav, MobileNav } from "@/components/side-nav";

export const metadata = {
  title: "About — KATHA Studio",
  description: "Architecture and interiors shaped through proportion, restraint, and material calm.",
};

export default function AboutPage() {
  const { prev, next, index } = getAdjacentNav("/about");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">

      <SideNav prev={prev} next={next} />

      <main className="pt-[4.5rem]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-16">

          {/* ── SECTION LABEL + COUNTER ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.32em", color: "var(--text-dim)" }}>
              — About
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
              {String(index + 1).padStart(2, "0")} / 09
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.08} className="pb-10 md:pb-12">
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
              Katha Studio
            </h1>
            <p className="mt-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-muted)" }}>
              Architecture & Interior Design · Ahmedabad
            </p>
          </FadeUp>

          {/* ── ABOUT CONTENT ── */}
          <FadeUp delay={0.14} className="space-y-6 pb-10 md:pb-14">
            <div className="mb-6 h-px w-10" style={{ backgroundColor: "var(--border-medium)" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.88rem, 1.35vw, 1.05rem)", lineHeight: 2, color: "var(--text-muted)", maxWidth: "52ch" }}>
              KATHA unfolds deliberately — a quieter architectural language, slower reveals,
              and interiors shaped through proportion, restraint, and material calm.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.88rem, 1.35vw, 1.05rem)", lineHeight: 2, color: "var(--text-muted)", maxWidth: "52ch" }}>
              Based in Ahmedabad, India. We work across residential architecture,
              interior design, renovation, and architectural consultation.
              Every project begins with listening.
            </p>
            <Link href="/contact" className="group mt-4 inline-flex items-center gap-3 transition-opacity hover:opacity-55">
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text)" }}>
                Get in Touch
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </FadeUp>

          {/* ── STATS ── */}
          <FadeUp delay={0} className="border-t border-[var(--border)] py-10 md:py-14">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x divide-[var(--border)]">
              {[
                { to: 12, suffix: "+", label: "Projects Completed" },
                { to: 4,  suffix: "",  label: "Years of Practice"  },
                { to: 3,  suffix: "",  label: "Design Disciplines" },
              ].map(({ to, suffix, label }) => (
                <div key={label} className="space-y-2 sm:px-6 sm:first:pl-0 sm:last:pr-0 md:px-10">
                  <p className="font-[var(--font-avenir-heavy)] font-extrabold text-[var(--text)]"
                    style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    <CountUp to={to} suffix={suffix} />
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <MobileNav prev={prev} next={next} />
        </div>
      </main>
    </div>
  );
}
