"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function FloatingCTA() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/contact") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 right-6 z-40 md:right-10"
    >
      <Link
        href="/contact"
        className="group inline-flex items-center gap-3 border border-[var(--text)] bg-[var(--background)] px-5 py-3 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.58rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "var(--text)",
        }}
      >
        Start a Project
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
}
