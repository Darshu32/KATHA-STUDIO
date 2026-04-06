"use client";

import { usePathname } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function PageTransitionOverlay() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (pathname === prev.current) return;
    prev.current = pathname;

    if (reduce) return;

    void (async () => {
      /* Reset to hidden-left */
      controls.set({ clipPath: "inset(0 100% 0 0)" });
      /* Sweep in: left → right */
      await controls.start({
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 0.36, ease: [0.76, 0, 0.24, 1] },
      });
      /* Sweep out: left → right (bar exits to right) */
      await controls.start({
        clipPath: "inset(0 0% 0 100%)",
        transition: { duration: 0.36, ease: [0.76, 0, 0.24, 1] },
      });
      /* Reset silently */
      controls.set({ clipPath: "inset(0 100% 0 0)" });
    })();
  }, [pathname, controls, reduce]);

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={controls}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        backgroundColor: "#111111",
        pointerEvents: "none",
      }}
    />
  );
}
