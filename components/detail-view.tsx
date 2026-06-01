"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactElement } from "react";

type NavItem = { href: string; label: string };

export function DetailView({
  title,
  paragraphs,
  image,
  imageAlt,
  fallbackBg,
  eyebrow,
  meta,
  tagline,
  scope,
  imageCaption,
  ctaHref = "/contact",
  ctaLabel = "Begin a Project",
  prev,
  next,
}: {
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt: string;
  fallbackBg: string;
  eyebrow?: string;
  meta?: string;
  tagline?: string;
  scope?: string[];
  imageCaption?: string;
  ctaHref?: string;
  ctaLabel?: string;
  prev: NavItem | null;
  next: NavItem | null;
}): ReactElement {
  const reduceMotion = useReducedMotion();

  /* ── Mouse-tracked 3D tilt on the image ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 18, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 18, mass: 0.6 });
  const tiltY = useTransform(smoothX, [0, 1], [10, -10]);
  const tiltX = useTransform(smoothY, [0, 1], [-8, 8]);
  const lightX = useTransform(smoothX, [0, 1], ["20%", "80%"]);
  const lightY = useTransform(smoothY, [0, 1], ["20%", "80%"]);
  const lightOpacity = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
    lightOpacity.set(1);
  };
  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    lightOpacity.set(0);
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-[var(--background)] text-[var(--text)] lg:h-[100svh] lg:min-h-0 lg:overflow-hidden">
      <main className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pt-[5.2rem] pb-8 sm:px-8 md:px-12 md:pt-[5.6rem] md:pb-10 lg:px-20 lg:pt-[5.4rem] lg:pb-6">

        {/* ─────────── META STRIP ─────────── */}
        {(eyebrow || meta) && (
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
              {eyebrow ? `— ${eyebrow}` : ""}
            </p>
            {meta && (
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.26em",
                color: "var(--text-dim)",
              }}>
                {meta}
              </p>
            )}
          </motion.div>
        )}

        {/* ─────────── HEADING ─────────── */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-avenir-book)",
            fontSize: "clamp(2.2rem, 4.6vw, 4rem)",
            fontWeight: 500,
            lineHeight: 0.96,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "var(--text)",
          }}
        >
          {title}
        </motion.h1>

        {/* Tagline */}
        {tagline && (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-[52ch] md:mt-5"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.78rem, 0.9vw, 0.92rem)",
              fontWeight: 500,
              lineHeight: 1.55,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
            }}
          >
            {tagline}
          </motion.p>
        )}

        {/* Hairline beneath the headline + tagline block */}
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-full origin-left bg-[var(--border-medium)] md:mt-7 lg:mt-7"
        />

        {/* ─────────── SPLIT: TEXT LEFT · IMAGE RIGHT ─────────── */}
        <div className="grid flex-1 grid-cols-1 items-stretch gap-8 pt-6 md:grid-cols-[1.15fr_1fr] md:gap-12 md:pt-7 lg:gap-16 lg:pt-8">

          {/* Left — lead paragraph, scope sheet, CTA */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 flex flex-col gap-6 md:order-1 md:gap-7 lg:justify-between lg:gap-8"
          >
            {/* Lead paragraph (primary) + supporting paragraphs (muted) */}
            <div className="space-y-4 max-w-[52ch]">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.32 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: i === 0
                      ? "clamp(1rem, 1.15vw, 1.12rem)"
                      : "clamp(0.92rem, 1.05vw, 1.02rem)",
                    fontWeight: i === 0 ? 500 : 400,
                    lineHeight: 1.7,
                    color: i === 0 ? "var(--text)" : "var(--text-muted)",
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Scope sheet — editorial fact strip */}
            {scope && scope.length > 0 && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-[var(--border)] pt-5"
              >
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.56rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.32em",
                    color: "var(--text-dim)",
                  }}
                >
                  — Scope
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 lg:grid-cols-4">
                  {scope.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(0.78rem, 0.9vw, 0.88rem)",
                        fontWeight: 500,
                        color: "var(--text)",
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.5rem",
                          fontWeight: 600,
                          letterSpacing: "0.18em",
                          color: "var(--text-dim)",
                          minWidth: "1.4rem",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href={ctaHref}
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
                {ctaLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — image + caption */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="order-1 flex w-full min-h-0 flex-col md:order-2"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              style={{
                rotateX: reduceMotion ? 0 : tiltX,
                rotateY: reduceMotion ? 0 : tiltY,
                transformStyle: "preserve-3d",
                backgroundColor: fallbackBg,
              }}
              className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1"
            >
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={imageAlt}
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover select-none"
                />
              )}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: useTransform(
                      [lightX, lightY],
                      ([x, y]) =>
                        `radial-gradient(circle 240px at ${x} ${y}, rgba(255,255,255,0.18), transparent 60%)`
                    ),
                    opacity: lightOpacity,
                    mixBlendMode: "overlay",
                  }}
                />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent 60%)" }}
              />
            </motion.div>

            {/* Image caption */}
            {imageCaption && (
              <div className="mt-3 flex items-center justify-between gap-4">
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.56rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.32em",
                    color: "var(--text-dim)",
                  }}
                >
                  {imageCaption}
                </p>
                <span
                  aria-hidden
                  className="h-px flex-1 bg-[var(--border)]"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* ─────────── BOTTOM NAVIGATION KEYS ─────────── */}
        <motion.nav
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mt-7 md:pt-7"
        >
          {prev ? <NavKey nav={prev} dir="prev" /> : <span />}
          {next ? <NavKey nav={next} dir="next" /> : <span />}
        </motion.nav>
      </main>
    </div>
  );
}

/* ─────────────────── nav key — magnetic hover ─────────────────── */

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
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.56rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            color: "var(--text-dim)",
          }}
        >
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
