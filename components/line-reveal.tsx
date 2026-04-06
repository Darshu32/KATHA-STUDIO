"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function LineReveal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { scaleX: 0 }}
      animate={reduce ? {} : inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: 0 }}
      className={className}
    />
  );
}
