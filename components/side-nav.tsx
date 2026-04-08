import Link from "next/link";
import type { NavItem } from "@/lib/nav-order";

export function SideNav({
  prev,
  next,
}: {
  prev: NavItem | null;
  next: NavItem | null;
}) {
  return (
    <>
      {/* ── LEFT (Previous) ── */}
      {prev && (
        <Link
          href={prev.href}
          className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 px-3 py-10 opacity-35 transition-opacity duration-300 hover:opacity-100 md:flex"
          aria-label={`Previous: ${prev.label}`}
        >
          <div
            className="h-16 w-px"
            style={{ backgroundColor: "var(--border-medium)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.48rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.26em",
              color: "var(--text)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            ← {prev.label}
          </span>
        </Link>
      )}

      {/* ── RIGHT (Next) ── */}
      {next && (
        <Link
          href={next.href}
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 px-3 py-10 opacity-35 transition-opacity duration-300 hover:opacity-100 md:flex"
          aria-label={`Next: ${next.label}`}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.48rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.26em",
              color: "var(--text)",
              writingMode: "vertical-rl",
            }}
          >
            {next.label} →
          </span>
          <div
            className="h-16 w-px"
            style={{ backgroundColor: "var(--border-medium)" }}
          />
        </Link>
      )}
    </>
  );
}

/** Mobile bottom prev/next bar */
export function MobileNav({
  prev,
  next,
}: {
  prev: NavItem | null;
  next: NavItem | null;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] py-8 md:hidden">
      {prev ? (
        <Link
          href={prev.href}
          className="flex min-w-0 flex-1 flex-col gap-1 transition-opacity active:opacity-60"
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.26em",
              color: "var(--text-dim)",
            }}
          >
            ← Prev
          </span>
          <span
            className="truncate"
            style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "0.78rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            {prev.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex min-w-0 flex-1 flex-col items-end gap-1 transition-opacity active:opacity-60"
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.26em",
              color: "var(--text-dim)",
            }}
          >
            Next →
          </span>
          <span
            className="truncate text-right"
            style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "0.78rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--text)",
              maxWidth: "100%",
            }}
          >
            {next.label}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
