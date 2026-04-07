"use client";

/*
 * ClickRipple
 * ───────────
 * Every pointer click spawns a soft ink ripple that expands from the
 * click point and fades away. Works for both mouse and touch. Disabled
 * when `prefers-reduced-motion` is set.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function ClickRipple() {
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    let counter = 0;
    const handle = (e: PointerEvent) => {
      // Ignore clicks on interactive elements that already have their own
      // tactile feedback (buttons handle their own press state better).
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, [role='button'], input, textarea, select"))
        return;

      const id = ++counter;
      const r: Ripple = { id, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, r]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((x) => x.id !== id));
      }, 900);
    };

    window.addEventListener("pointerdown", handle);
    return () => window.removeEventListener("pointerdown", handle);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9995] overflow-hidden"
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.35 }}
            animate={{ width: 320, height: 320, opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-full border"
            style={{
              left: r.x,
              top: r.y,
              transform: "translate(-50%, -50%)",
              borderColor: "var(--text)",
              borderWidth: "1px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
