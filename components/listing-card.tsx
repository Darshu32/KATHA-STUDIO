"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";
import type { Tone } from "@/lib/data";

const toneMap: Record<Tone, { accent: string; darkBg: string }> = {
  warm: { accent: "#c8a882", darkBg: "#1c1409" },
  cool: { accent: "#8b9eb4", darkBg: "#0c1219" },
  default: { accent: "#a8b49c", darkBg: "#111610" },
};

export function ListingCard({
  href,
  tone,
  topLabel,
  children,
}: {
  href: string;
  tone: Tone;
  topLabel: string;
  children: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const { accent, darkBg } = toneMap[tone];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={href} data-cursor="View" className="block space-y-4">
        {/* ── Dark image card ── */}
        <motion.div
          animate={{
            y: hovered ? -10 : 0,
            boxShadow: hovered
              ? `0 30px 70px -18px ${accent}4d, 0 0 90px -28px ${accent}40, 0 0 0 1px ${accent}22`
              : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
          style={{ backgroundColor: darkBg }}
        >
          {/* Accent top line */}
          <motion.div
            animate={{
              scaleX: hovered ? 1 : 0.4,
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 z-[2] origin-center"
            style={{ height: "2px", backgroundColor: accent }}
          />

          {/* Radial top glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.45 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${accent}22 0%, transparent 62%)`,
            }}
          />

          {/* Ambient side glow */}
          <motion.div
            animate={{ opacity: hovered ? 0.8 : 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `radial-gradient(circle at 50% 55%, ${accent}18 0%, transparent 70%)`,
            }}
          />

          {/* Bottom vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
            }}
          />

          {/* Top row: label + arrow */}
          <div className="absolute top-0 left-0 right-0 z-[3] flex items-start justify-between p-5 md:p-6">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                color: `${accent}88`,
              }}
            >
              {topLabel}
            </span>
            <motion.span
              animate={{
                x: hovered ? 4 : 0,
                y: hovered ? -4 : 0,
                scale: hovered ? 1.25 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "0.9rem",
                color: hovered ? accent : `${accent}75`,
              }}
            >
              ↗
            </motion.span>
          </div>
        </motion.div>

        {/* Info below */}
        <motion.div
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </Link>
    </motion.div>
  );
}
