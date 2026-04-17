"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/count-up";

type NavItem = { href: string; label: string };

const STATS = [
  { to: 12, suffix: "+", label: "Projects Completed" },
  { to: 4,  suffix: "",  label: "Years of Practice"  },
  { to: 3,  suffix: "",  label: "Design Disciplines" },
];

export function AboutView({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[100svh] flex-col bg-[var(--background)] text-[var(--text)]">
      <main className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pt-[5.2rem] pb-8 sm:px-8 md:px-12 md:pt-[5.6rem] md:pb-10 lg:px-20 lg:pt-[6rem] lg:pb-12">

        {/* HEADING */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.4rem)",
            lineHeight: 0.96,
            textTransform: "uppercase",
            color: "var(--text)",
          }}
          className="inline-flex flex-wrap items-end gap-x-[0.35em] leading-none"
        >
          <span
            style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontWeight: 800,
              letterSpacing: "0.005em",
            }}
          >
            Katha
          </span>
          <span
            style={{
              fontFamily: "var(--font-avenir-book)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            Studio
          </span>
        </motion.h1>

        {/* SPLIT: PARAGRAPHS LEFT · STATS RIGHT */}
        <div className="my-8 grid flex-1 grid-cols-1 items-center gap-10 md:my-10 md:grid-cols-2 md:gap-12 lg:my-12 lg:gap-20">

          {/* Left — paragraphs */}
          <div className="max-w-[58ch] space-y-5">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { color: "var(--text)", x: 4 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.95rem, 1.18vw, 1.08rem)",
                lineHeight: 1.9,
                color: "var(--text-muted)",
                cursor: "default",
                transition: "color 0.4s ease",
              }}
            >
              KATHA unfolds deliberately — a quieter architectural language, slower
              reveals, and interiors shaped through proportion, restraint, and
              material calm.
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { color: "var(--text)", x: 4 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.95rem, 1.18vw, 1.08rem)",
                lineHeight: 1.9,
                color: "var(--text-muted)",
                cursor: "default",
                transition: "color 0.4s ease",
              }}
            >
              Based in Bengaluru, India. We work across residential architecture,
              interior design, renovation, and architectural consultation. Every
              project begins with listening.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="pt-2"
            >
              <Link href="/contact" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-55">
                <span style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text)",
                }}>
                  Get in Touch
                </span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — stats */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-4 lg:gap-8"
          >
            {STATS.map(({ to, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="space-y-3 border-l border-[var(--border-medium)] pl-4 first:border-l-0 first:pl-0 sm:pl-6 md:pl-4 lg:pl-8"
                style={{ cursor: "default" }}
              >
                <p
                  className="font-[var(--font-avenir-heavy)] font-extrabold text-[var(--text)]"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <CountUp to={to} suffix={suffix} />
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--text-dim)",
                  lineHeight: 1.4,
                }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* NAVIGATION */}
        <motion.nav
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6 md:pt-7"
        >
          {prev ? <NavKey nav={prev} dir="prev" /> : <span />}
          {next ? <NavKey nav={next} dir="next" /> : <span />}
        </motion.nav>
      </main>
    </div>
  );
}

function NavKey({ nav, dir }: { nav: NavItem; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link
      href={nav.href}
      className={`group relative inline-flex min-w-0 items-center gap-3 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      <motion.span
        whileHover={{ x: isNext ? 6 : -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="inline-block text-[var(--text)]"
        style={{ fontSize: "1.05rem" }}
      >
        {isNext ? "→" : "←"}
      </motion.span>
      <span className="flex min-w-0 flex-col">
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.56rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          color: "var(--text-dim)",
        }}>
          {isNext ? "Next" : "Previous"}
        </span>
        <span
          className="truncate transition-opacity duration-300 group-hover:opacity-70"
          style={{
            fontFamily: "var(--font-avenir-heavy)",
            fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "var(--text)",
            lineHeight: 1.1,
            maxWidth: "60vw",
          }}
        >
          {nav.label}
        </span>
      </span>
    </Link>
  );
}
