"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";
import { HeaderLanguageMenu } from "@/components/header-language-menu";
import { whatWeDo, sectors } from "@/lib/data";

type NavEntry = {
  href: string;
  labelKey: "studio" | "approach" | "services" | "journal" | "contact";
  num: string;
};

const mobileNavItems: NavEntry[] = [
  { href: "/studio",   labelKey: "studio",   num: "01" },
  { href: "/approach", labelKey: "approach", num: "02" },
  { href: "/services", labelKey: "services", num: "03" },
  { href: "/journal",  labelKey: "journal",  num: "04" },
  { href: "/contact",  labelKey: "contact",  num: "05" },
];

export function PersistentNavbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const backLink = pathname === "/" ? null : { href: "/", label: t.nav.home };

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  /* Close overlay on route change */
  useEffect(() => {
    setIsNavOpen(false);
    setServicesOpen(false);
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
            className="inline-flex shrink-0 items-end gap-3 leading-none transition-opacity hover:opacity-60"
            style={{ color: "var(--text)" }}
          >
            <span style={{ fontFamily: "var(--font-avenir-heavy)", fontWeight: 800, fontSize: "clamp(1.05rem,1.85vw,1.6rem)", textTransform: "uppercase", letterSpacing: "-0.025em" }}>
              KATHA
            </span>
            <span style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 600, fontSize: "clamp(1.05rem,1.85vw,1.6rem)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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

            {/* Language switcher — globe icon, present on every page */}
            <HeaderLanguageMenu />

            {/* Dark mode toggle — present in the header on every page */}
            <button
              type="button"
              onClick={() => setIsDark((p) => !p)}
              aria-label={isDark ? "Switch to light" : "Switch to dark"}
              className="h-[1.25rem] w-[2.6rem] rounded-full bg-[var(--text)] transition-colors duration-500 hover:opacity-65"
            />

            {/* Hamburger — all screens */}
            <button
              type="button"
              onClick={() => setIsNavOpen((p) => !p)}
              aria-label={isNavOpen ? "Close menu" : "Open menu"}
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
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

      {/* ── Full-Screen Navigation Overlay ── */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[49] flex flex-col"
            style={{ backgroundColor: "var(--background)", paddingTop: "4rem" }}
          >
            {/* Nav items */}
            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8 [&>*]:shrink-0" style={{ justifyContent: "safe center" }}>
              {mobileNavItems.map((item, i) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/services" && pathname.startsWith("/services"));

                const rowStyle = {
                  fontFamily: "var(--font-avenir-book)",
                  fontSize: "clamp(1.95rem, 9vw, 2.9rem)",
                  fontWeight: 300,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.04em",
                  color: "var(--text)",
                  lineHeight: 1.05,
                };
                const numStyle = {
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  color: "var(--text-dim)",
                  minWidth: "1.8rem",
                };

                const subItemStyle = {
                  fontFamily: "var(--font-avenir-book)",
                  fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
                  fontWeight: 400,
                  letterSpacing: "0.01em",
                  color: "var(--text)",
                  lineHeight: 1.2,
                };
                const groupLabelStyle = {
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.28em",
                  color: "var(--text-dim)",
                };

                /* Services expands in place to reveal both groups. */
                if (item.labelKey === "services") {
                  const groups = [
                    { label: t.nav.whatWeDo, items: whatWeDo },
                    { label: t.nav.whatWeBuild, items: sectors },
                  ];
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.055, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen((p) => !p)}
                        aria-expanded={servicesOpen}
                        className="group flex w-full items-baseline gap-4 border-b border-[var(--border)] py-4 text-left"
                        style={{ opacity: isActive || servicesOpen ? 1 : 0.55 }}
                      >
                        <span style={numStyle}>{item.num}</span>
                        <span className="flex-1" style={rowStyle}>
                          {t.nav.services}
                        </span>
                        <motion.span
                          animate={{ rotate: servicesOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="inline-block"
                          style={{ fontSize: "1.4rem", fontWeight: 300, color: "var(--text-dim)", alignSelf: "center", lineHeight: 1 }}
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-6 py-5 pl-[2.8rem] md:gap-7">
                              {groups.map((group) => (
                                <div key={group.label}>
                                  <p style={groupLabelStyle}>{group.label}</p>
                                  <div className="mt-3 flex flex-col gap-2.5 md:gap-3">
                                    {group.items.map((s) => {
                                      const svc = t.services[s.slug as keyof typeof t.services];
                                      const active = pathname === `/services/${s.slug}`;
                                      return (
                                        <Link
                                          key={s.slug}
                                          href={`/services/${s.slug}`}
                                          className="transition-opacity hover:opacity-100"
                                          style={{ ...subItemStyle, opacity: active ? 1 : 0.62 }}
                                        >
                                          {svc?.title ?? s.title}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                              <Link
                                href="/services"
                                className="inline-flex items-center gap-2 transition-opacity hover:opacity-100"
                                style={{ ...groupLabelStyle, opacity: 0.62 }}
                              >
                                {t.nav.allServices}
                                <span aria-hidden>→</span>
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

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
                      <span style={numStyle}>{item.num}</span>
                      <span
                        className="flex-1 transition-opacity group-hover:opacity-100"
                        style={rowStyle}
                      >
                        {t.nav[item.labelKey]}
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
                {t.nav.locationLine}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
