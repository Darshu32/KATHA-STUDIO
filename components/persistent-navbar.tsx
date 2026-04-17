"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mobileNavItems = [
  { href: "/",         label: "Home",     num: "00" },
  { href: "/about",    label: "About",    num: "01" },
  { href: "/projects", label: "Projects", num: "02" },
  { href: "/services", label: "Services", num: "03" },
  { href: "/contact",  label: "Contact",  num: "04" },
];

function getBackLink(pathname: string): { href: string; label: string } | null {
  if (pathname === "/") return null;
  return { href: "/", label: "Home" };
}

export function PersistentNavbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const backLink = getBackLink(pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  /* Close overlay on route change */
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isNavOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] backdrop-blur-md transition-colors duration-500"
        style={{ backgroundColor: "var(--navbar-bg)" }}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 md:px-12 md:py-5 lg:px-20">

          {/* Brand */}
          <Link
            href="/"
            className="inline-flex shrink-0 items-end gap-2 leading-none transition-opacity hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            <span style={{ fontFamily: "var(--font-avenir-heavy)", fontWeight: 800, fontSize: "clamp(1rem,1.4vw,1.25rem)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              KATHA
            </span>
            <span style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 500, fontSize: "clamp(1rem,1.4vw,1.25rem)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              STUDIO
            </span>
          </Link>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">

            {/* Back link — desktop only */}
            {backLink && (
              <Link
                href={backLink.href}
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.6rem,0.85vw,0.72rem)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text)" }}
                className="hidden transition-opacity hover:opacity-55 md:block"
              >
                &larr; {backLink.label}
              </Link>
            )}

            {/* Dark mode toggle — visible on all screens */}
            {isHome && (
              <button
                type="button"
                onClick={() => setIsDark((p) => !p)}
                aria-label={isDark ? "Switch to light" : "Switch to dark"}
                className="h-[1.25rem] w-[2.6rem] rounded-full bg-[var(--text)] transition-colors duration-500 hover:opacity-65"
              />
            )}

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setIsNavOpen((p) => !p)}
              aria-label={isNavOpen ? "Close menu" : "Open menu"}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <motion.span
                animate={isNavOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-5 origin-center"
                style={{ backgroundColor: "var(--text)" }}
              />
              <motion.span
                animate={isNavOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block h-px w-5"
                style={{ backgroundColor: "var(--text)" }}
              />
              <motion.span
                animate={isNavOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-px w-5 origin-center"
                style={{ backgroundColor: "var(--text)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Navigation Overlay ── */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[49] flex flex-col md:hidden"
            style={{ backgroundColor: "var(--background)", paddingTop: "4rem" }}
          >
            {/* Nav items */}
            <nav className="flex flex-1 flex-col justify-center px-6 py-8">
              {mobileNavItems.map((item, i) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/projects" && pathname.startsWith("/projects")) ||
                  (item.href === "/services" && pathname.startsWith("/services"));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-4 border-b border-[var(--border)] py-4"
                      style={{ opacity: isActive ? 1 : 0.55 }}
                    >
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)", minWidth: "1.8rem" }}>
                        {item.num}
                      </span>
                      <span
                        className="flex-1 transition-opacity group-hover:opacity-100"
                        style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "clamp(1.85rem, 9vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.01em", color: "var(--text)", lineHeight: 1 }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span style={{ fontSize: "0.45rem", color: "var(--text-dim)", alignSelf: "center" }}>●</span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.4 }}
              className="border-t border-[var(--border)] px-6 py-5"
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
                KATHA Studio · Bengaluru
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
