"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

/* ─────────────────────────────────────────────
   FadeUp — wraps any content with a scroll-
   triggered fade + upward slide animation.
───────────────────────────────────────────── */
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={
        reduce
          ? {}
          : inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 28 }
      }
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SplitReveal — splits a heading into words,
   each word slides up from behind a mask on
   scroll-into-view.
───────────────────────────────────────────── */
type Tag = "h1" | "h2" | "h3" | "p";

export function SplitReveal({
  text,
  tag = "h1",
  className,
  style,
  delay = 0,
}: {
  text: string;
  tag?: Tag;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-4% 0px",
  });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  // Dynamically pick the motion element
  const MotionEl = (motion as unknown as Record<string, React.ElementType>)[tag];

  return (
    <MotionEl ref={ref} className={className} style={style}>
      {words.map((word: string, i: number) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            marginRight: i < words.length - 1 ? "0.28em" : 0,
          }}
        >
          <motion.span
            initial={reduce ? false : { y: "108%", opacity: 0 }}
            animate={
              reduce
                ? {}
                : inView
                ? { y: 0, opacity: 1 }
                : { y: "108%", opacity: 0 }
            }
            transition={{
              duration: 0.68,
              delay: delay + i * 0.065,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionEl>
  );
}
