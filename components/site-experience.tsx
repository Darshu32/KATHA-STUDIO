"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";

/* ─────────────────────────── CONSTANTS ────────────────────── */

// Module-level flag — survives client-side navigations so the intro
// never replays when the user returns to the home page.
let introHasPlayed = false;

const brandLetters = ["K", "A", "T", "H", "A"];

const navCards = [
  {
    id: "01",
    label: "About",
    tagline: "Who we are",
    href: "/about",
  },
  {
    id: "02",
    label: "Projects",
    tagline: "Selected work",
    href: "/projects",
  },
  {
    id: "03",
    label: "Services",
    tagline: "What we offer",
    href: "/services",
  },
  {
    id: "04",
    label: "Contact",
    tagline: "Start a conversation",
    href: "/contact",
  },
];

/* ─────────────────────── BRAND WORDMARK ───────────────────── */

export function BrandWordmark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-end gap-2 leading-none text-[var(--text)] ${className ?? ""}`}>
      <span className={`font-[var(--font-avenir-heavy)] font-extrabold uppercase tracking-[0.04em] ${compact ? "" : "text-[clamp(3rem,8vw,7rem)]"}`} style={compact ? { fontSize: "clamp(1rem,1.4vw,1.4rem)" } : undefined}>
        KATHA
      </span>
      <span className={`font-[var(--font-avenir-book)] font-medium uppercase tracking-[0.08em] ${compact ? "" : "text-[clamp(3rem,8vw,7rem)]"}`} style={compact ? { fontSize: "clamp(1rem,1.4vw,1.4rem)" } : undefined}>
        Studio
      </span>
    </span>
  );
}

/* ──────────────────── INTRO BRAND SEQUENCE ────────────────── */

function IntroBrandSequence({ visible, onSettled }: { visible: boolean; onSettled: () => void }) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"letters" | "hold" | "settle">("letters");

  useEffect(() => {
    if (!visible) return;
    const t1 = window.setTimeout(() => setPhase("hold"), reduceMotion ? 500 : 3400);
    const t2 = window.setTimeout(() => setPhase("settle"), reduceMotion ? 1000 : 5200);
    const t3 = window.setTimeout(() => onSettled(), reduceMotion ? 1400 : 6800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible, reduceMotion, onSettled]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={
            phase === "settle"
              ? reduceMotion
                ? { opacity: 0, transition: { duration: 0.4 } }
                : { opacity: [1, 1, 0], scale: [1, 0.22, 0.22], x: ["0vw", "-32vw", "-32vw"], y: ["0vh", "-40vh", "-40vh"], transition: { duration: 1.5, times: [0, 0.65, 1], ease: [0.22, 1, 0.36, 1] } }
              : { opacity: 1 }
          }
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="pointer-events-auto fixed inset-0 z-[65] flex items-center justify-center bg-[var(--background)] transition-colors duration-500"
        >
          <div className="flex max-w-[92rem] flex-col px-6 md:px-12 lg:px-20">
            <div className="flex items-end gap-x-5">
              <div className="flex">
                {brandLetters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 60, rotateX: -90, filter: "blur(12px)" }}
                    animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                    transition={{ delay: reduceMotion ? 0 : 0.3 + index * 0.42, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={reduceMotion ? undefined : { y: -12, scale: 1.06, transition: { duration: 0.35 } }}
                    whileTap={reduceMotion ? undefined : { scale: 0.94, transition: { duration: 0.12 } }}
                    className="cursor-pointer select-none font-[var(--font-avenir-heavy)] text-[clamp(3.5rem,10vw,8.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em] text-[var(--text)]"
                    style={{ perspective: "600px" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 36, filter: "blur(10px)" }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: reduceMotion ? 0.2 : 2.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { x: 10, letterSpacing: "0.14em", transition: { duration: 0.45 } }}
                className="cursor-pointer select-none font-[var(--font-avenir-book)] text-[clamp(3.5rem,10vw,8.5rem)] font-medium uppercase leading-[0.9] tracking-[0.06em] text-[var(--text-muted)]"
              >
                Studio
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────── SMOOTH SCROLL ────────────────────── */

function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */

export function SiteExperience() {
  useLenisScroll();
  const [introComplete, setIntroComplete] = useState(introHasPlayed);
  const reduceMotion = useReducedMotion();
  const handleIntroSettled = useCallback(() => {
    introHasPlayed = true;
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [introComplete]);

  return (
    <div className="page-shell bg-[var(--background)] text-[var(--text)] transition-colors duration-500">
      <IntroBrandSequence visible={!introComplete} onSettled={handleIntroSettled} />

      {/* ── 4 NAV CARDS ── */}
      <main className="pt-[4.5rem]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={introComplete || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:h-[calc(100vh-5rem)]"
        >
          {navCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={introComplete || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:h-full"
            >
              <Link
                href={card.href}
                className="group flex min-h-[30vh] flex-col justify-between border-b border-r border-[var(--border)] p-8 transition-colors duration-300 hover:bg-[var(--surface-light)] sm:min-h-[40vh] lg:h-full lg:min-h-0 lg:border-b-0 lg:p-10 last:border-r-0"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span className="font-[var(--font-inter)] font-medium uppercase tracking-[0.3em] text-[var(--text-dim)]" style={{ fontSize: "clamp(0.55rem,0.75vw,0.65rem)" }}>
                    {card.id}
                  </span>
                  <span className="text-[var(--text-dim)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ fontSize: "clamp(0.8rem,1.1vw,1rem)" }}>
                    ↗
                  </span>
                </div>

                {/* Bottom */}
                <div className="space-y-2">
                  <p className="font-[var(--font-avenir-heavy)] font-extrabold uppercase tracking-[0.02em] text-[var(--text)]" style={{ fontSize: "clamp(1.4rem,2.2vw,2.2rem)" }}>
                    {card.label}
                  </p>
                  <p className="font-[var(--font-inter)] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]" style={{ fontSize: "clamp(0.62rem,0.85vw,0.75rem)" }}>
                    {card.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[88rem] px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between">
            <BrandWordmark compact />
            <p className="font-[var(--font-inter)] text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[var(--text-dim)]">
              &copy; {new Date().getFullYear()} Katha Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
