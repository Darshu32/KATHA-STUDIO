"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function ParallaxHero({
  bgClass,
  outerClass,
  label,
}: {
  bgClass: string;
  outerClass: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0px", "0px"] : ["0px", "80px"]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${outerClass}`}>
      <motion.div
        className={`absolute ${bgClass}`}
        style={{ y, top: "-40px", left: 0, right: 0, bottom: "-40px" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(0,0,0,0.05))]" />
      </motion.div>
      <div
        className="absolute bottom-4 left-5"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.52rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.24em",
          color: "rgba(17,17,17,0.3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {label}
      </div>
    </div>
  );
}
