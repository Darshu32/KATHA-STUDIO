"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Category } from "@/lib/data";

/** An editorial, full-width list of portfolio chapters.
 *  Each row lifts its letters in a staggered wave on hover
 *  and slides a preview image in from the right. */

export type IndexRow = Category & { count: number };

const ACCENT = "#b8451f"; // burnt vermillion — matches email template

function Title({
  text,
  active,
  reduceMotion,
}: {
  text: string;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  const chars = Array.from(text);
  return (
    <span
      className="inline-flex flex-wrap"
      style={{
        fontFamily: "var(--font-avenir-heavy)",
        fontWeight: 800,
        fontSize: "clamp(1.8rem, 5.8vw, 4.8rem)",
        textTransform: "uppercase",
        letterSpacing: "0.01em",
        lineHeight: 0.95,
        color: "var(--text)",
      }}
    >
      {chars.map((ch, i) => {
        const isSpace = ch === " ";
        return (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: active ? -8 : 0,
                    color: active && i === 0 ? ACCENT : "var(--text)",
                  }
            }
            transition={{
              duration: 0.45,
              delay: active ? i * 0.025 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ whiteSpace: "pre" }}
          >
            {isSpace ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </span>
  );
}

export function CategoryIndex({ rows }: { rows: IndexRow[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative"
      /* Reset hover when cursor leaves the index — fixes held-hover
         glitches when a user drags off the right edge. */
      onMouseLeave={() => setHoverIdx(null)}
    >
      {/* Heavy top rule */}
      <div className="h-px w-full" style={{ backgroundColor: "var(--text)" }} />
      <div
        className="mt-[3px] h-px w-full"
        style={{ backgroundColor: "var(--text)" }}
      />

      {rows.map((row, i) => {
        const active = hoverIdx === i;
        const countText =
          row.count === 0
            ? "In preparation"
            : `${String(row.count).padStart(2, "0")} ${
                row.count === 1 ? "Work" : "Works"
              }`;

        return (
          <motion.div
            key={row.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.8,
              delay: 0.15 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            onHoverStart={() => setHoverIdx(i)}
            onHoverEnd={() => setHoverIdx((cur) => (cur === i ? null : cur))}
            onFocusCapture={() => setHoverIdx(i)}
            onBlurCapture={() => setHoverIdx((cur) => (cur === i ? null : cur))}
            className="relative border-b border-dashed"
            style={{ borderColor: "var(--border-medium)" }}
          >
            <Link
              href={`/projects/${row.slug}`}
              className="group relative block"
              aria-label={`${row.title} — ${countText}`}
            >
              {/* ── Preview image panel (slides in from right on hover) ── */}
              {row.image && (
                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    clipPath: active
                      ? "inset(0% 0% 0% 0%)"
                      : "inset(0% 0% 0% 100%)",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pointer-events-none absolute right-0 top-0 bottom-0 z-[1] hidden w-[46%] overflow-hidden md:block"
                >
                  <Image
                    src={row.image}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  {/* Left-edge gradient so image fades into page background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to left, rgba(0,0,0,0) 24%, var(--background) 92%)",
                    }}
                  />
                  {/* Soft bottom vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 40%)",
                    }}
                  />
                </motion.div>
              )}

              {/* Sweeping accent baseline on hover */}
              <motion.div
                aria-hidden
                initial={false}
                animate={{
                  scaleX: active ? 1 : 0,
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-[-1px] left-0 z-[2] h-[2px] origin-left"
                style={{ width: "100%", backgroundColor: ACCENT }}
              />

              {/* ── Row content ── */}
              <div className="relative z-[2] grid grid-cols-[auto_1fr_auto] items-center gap-5 py-10 sm:gap-8 md:py-14 lg:py-16">
                {/* Roman numeral */}
                <motion.span
                  animate={{
                    color: active ? ACCENT : "var(--text-dim)",
                    x: active ? 4 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
                    fontWeight: 500,
                    letterSpacing: "0.34em",
                    minWidth: "3.2ch",
                  }}
                >
                  {row.index}
                </motion.span>

                {/* Title + italic descriptor */}
                <div className="min-w-0">
                  <Title
                    text={row.title}
                    active={active}
                    reduceMotion={reduceMotion}
                  />
                  <motion.p
                    initial={false}
                    animate={{
                      opacity: active ? 1 : 0.55,
                      y: active ? 0 : 4,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mt-3 max-w-[46ch]"
                    style={{
                      fontFamily: "var(--font-avenir-book)",
                      fontSize: "clamp(0.88rem, 1.05vw, 1.05rem)",
                      lineHeight: 1.55,
                      color: "var(--text-muted)",
                    }}
                  >
                    — {row.tagline}
                  </motion.p>
                </div>

                {/* Count + arrow */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <motion.span
                    animate={{
                      opacity: active ? 0.35 : 0.85,
                    }}
                    transition={{ duration: 0.35 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "clamp(0.56rem, 0.78vw, 0.64rem)",
                      fontWeight: 500,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                      whiteSpace: "nowrap",
                    }}
                    className="hidden sm:inline"
                  >
                    {countText}
                  </motion.span>
                  <motion.span
                    animate={{
                      x: active ? 10 : 0,
                      color: active ? ACCENT : "var(--text)",
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                      display: "inline-block",
                      lineHeight: 1,
                    }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Heavy bottom rule */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--text)" }}
      />
      <div
        className="mt-[3px] h-px w-full"
        style={{ backgroundColor: "var(--text)" }}
      />
    </div>
  );
}
