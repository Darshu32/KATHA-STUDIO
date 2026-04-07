import Link from "next/link";
import { SplitReveal } from "@/components/animations";
import { LineReveal } from "@/components/line-reveal";
import { MarqueeStrip } from "@/components/marquee-strip";

/* ── Shared Footer ─────────────────────────────────────────── */
export function SiteFooter() {
  return (
    <footer>
      <MarqueeStrip />
      <div className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-6 md:px-12 lg:px-20">
        <Link
          href="/"
          className="inline-flex items-end gap-2 leading-none transition-opacity hover:opacity-60"
          style={{ color: "var(--text)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontWeight: 800,
              fontSize: "clamp(1rem,1.4vw,1.25rem)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            KATHA
          </span>
          <span
            style={{
              fontFamily: "var(--font-avenir-book)",
              fontWeight: 500,
              fontSize: "clamp(1rem,1.4vw,1.25rem)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Studio
          </span>
        </Link>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--text-dim)",
          }}
        >
          &copy; {new Date().getFullYear()} Katha Studio
        </p>
      </div>
      </div>
    </footer>
  );
}

/* ── Section page header ───────────────────────────────────── */
export function PageHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-16 md:px-12 md:py-20 lg:px-20 lg:py-28">
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.62rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "var(--text-dim)",
        }}
        className="mb-5"
      >
        {index}
      </p>
      <SplitReveal
        text={title}
        tag="h1"
        delay={0.1}
        style={{
          fontFamily: "var(--font-avenir-heavy)",
          fontSize: "clamp(2.2rem,6vw,5.5rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.01em",
          lineHeight: 1.05,
          color: "var(--text)",
        }}
      />
      <LineReveal className="mt-8 h-[1px] w-16 bg-[var(--text)] opacity-20" />
    </div>
  );
}
