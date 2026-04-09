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
  prev,
  next,
}: {
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt: string;
  fallbackBg: string;
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
    <div className="flex min-h-[100svh] flex-col bg-[var(--background)] text-[var(--text)]">
      <main className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pt-[5.2rem] pb-8 sm:px-8 md:px-12 md:pt-[5.6rem] md:pb-10 lg:px-20 lg:pt-[6rem] lg:pb-12">

        {/* ─────────── HEADING ─────────── */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-avenir-heavy)",
            fontSize: "clamp(2.2rem, 5vw, 4.4rem)",
            fontWeight: 800,
            lineHeight: 0.96,
            textTransform: "uppercase",
            letterSpacing: "0.005em",
            color: "var(--text)",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            maxWidth: "16ch",
          }}
        >
          {title}
        </motion.h1>

        {/* ─────────── SPLIT: TEXT LEFT · IMAGE RIGHT ─────────── */}
        <div className="my-8 grid flex-1 grid-cols-1 items-center gap-10 md:my-10 md:grid-cols-2 md:gap-12 lg:my-12 lg:gap-20">

          {/* Left — interactive paragraphs */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 max-w-[58ch] space-y-5 md:order-1"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.32 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* Right — 3D-tilt interactive image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="order-1 w-full md:order-2"
            style={{ perspective: "1400px" }}
          >
            <motion.div
              style={{
                rotateX: reduceMotion ? 0 : tiltX,
                rotateY: reduceMotion ? 0 : tiltY,
                transformStyle: "preserve-3d",
                backgroundColor: fallbackBg,
              }}
              className="relative aspect-[4/3] w-full overflow-hidden"
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
              {/* Cursor-following highlight */}
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
              {/* Bottom soft vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent 60%)" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ─────────── BOTTOM NAVIGATION KEYS ─────────── */}
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
