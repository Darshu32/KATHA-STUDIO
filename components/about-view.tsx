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
    <div className="flex min-h-[100svh] flex-col bg-[var(--background)] text-[var(--text)] lg:h-[100svh] lg:min-h-0 lg:overflow-hidden">
      <main className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pt-[5.2rem] pb-8 sm:px-8 md:px-12 md:pt-[5.6rem] md:pb-10 lg:px-20 lg:pt-[5.4rem] lg:pb-6">

        {/* META STRIP */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between pb-3 md:pb-4 lg:pb-5"
        >
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.62rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            color: "var(--text-dim)",
          }}>
            — The Practice
          </p>
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.26em",
            color: "var(--text-dim)",
          }}>
            Bengaluru · Est. 2022
          </p>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-avenir-book)",
            fontWeight: 500,
            fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
            lineHeight: 0.96,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "var(--text)",
          }}
        >
          Architecture
          <br />
          That Listens
        </motion.h1>

        {/* Hairline beneath headline */}
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-full origin-left bg-[var(--border-medium)] md:mt-7 lg:mt-8"
        />

        {/* MAIN COMPOSITION */}
        <div className="grid flex-1 grid-cols-1 items-start gap-10 pt-6 md:grid-cols-[1.35fr_1fr] md:gap-14 md:pt-8 lg:gap-20 lg:pt-10">

          {/* Left — paragraphs + CTA */}
          <div className="flex max-w-[58ch] flex-col">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.95rem, 1.15vw, 1.08rem)",
                lineHeight: 1.85,
                color: "var(--text)",
              }}
            >
              KATHA unfolds deliberately — a quieter architectural language,
              slower reveals, and interiors shaped through proportion,
              restraint, and material calm.
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.95rem, 1.15vw, 1.08rem)",
                lineHeight: 1.85,
                color: "var(--text-muted)",
              }}
            >
              Based in Bengaluru, India. We work across residential
              architecture, interior design, renovation, and architectural
              consultation. Every project begins with listening.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 md:mt-10"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-[var(--text)] bg-[var(--background)] px-5 py-3 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text)",
                }}
              >
                Begin a Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — stats column with hairline divider */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:border-l md:border-[var(--border-medium)] md:pl-10 lg:pl-14"
          >
            <p
              className="mb-5 md:mb-6"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                color: "var(--text-dim)",
              }}
            >
              — In Numbers
            </p>
            <div className="space-y-5 md:space-y-6 lg:space-y-7">
              {STATS.map(({ to, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.42 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-[var(--border)] pb-3 last:border-b-0 last:pb-0"
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.22em",
                      color: "var(--text-muted)",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-[var(--font-avenir-heavy)] font-extrabold text-[var(--text)]"
                    style={{
                      fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <CountUp to={to} suffix={suffix} />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* NAVIGATION */}
        <motion.nav
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:pt-7"
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
