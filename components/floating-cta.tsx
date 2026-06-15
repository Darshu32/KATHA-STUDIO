"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function FloatingCTA() {
  const pathname = usePathname();
  /* Hide on home, contact, studio (already has its own CTA), and the
   * minimal detail pages. */
  if (
    pathname === "/" ||
    pathname === "/studio" ||
    pathname === "/contact" ||
    pathname.startsWith("/projects/") ||
    pathname.startsWith("/services/")
  ) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 right-6 z-40 hidden md:block md:right-10"
    >
      <Link
        href="/contact"
        className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-medium)] bg-[var(--background)] px-6 py-3 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.6rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "var(--text)",
        }}
      >
        Start a Project
        <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
}
