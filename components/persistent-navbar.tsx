"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getBackLink(pathname: string): { href: string; label: string } | null {
  if (pathname === "/") return null;
  if (pathname.startsWith("/projects/")) return { href: "/projects", label: "Projects" };
  if (pathname.startsWith("/services/")) return { href: "/services", label: "Services" };
  return { href: "/", label: "Home" };
}

export function PersistentNavbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const backLink = getBackLink(pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.92)] backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 py-4 md:px-12 md:py-5 lg:px-20">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-end gap-2 leading-none text-[#111] transition-opacity hover:opacity-60"
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

        {/* Right side */}
        <div className="flex items-center gap-6">
          {backLink && (
            <Link
              href={backLink.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.6rem,0.85vw,0.72rem)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.26em",
                color: "#111",
              }}
              className="transition-opacity hover:opacity-55"
            >
              &larr; {backLink.label}
            </Link>
          )}
          {isHome && (
            <button
              type="button"
              onClick={() => setIsDark((p) => !p)}
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
              className="h-[1.25rem] w-[2.6rem] rounded-full bg-[var(--text)] transition-colors duration-500 hover:opacity-65"
            />
          )}
        </div>
      </div>
    </header>
  );
}
