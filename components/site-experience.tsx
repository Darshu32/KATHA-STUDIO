"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import Lenis from "lenis";
import { MarqueeStrip } from "@/components/marquee-strip";

/* ─────────────────────────── CONSTANTS ────────────────────── */

let introHasPlayed = false;

const brandLetters = ["K", "A", "T", "H", "A"];

const navCards = [
  {
    id: "01",
    label: "About",
    tagline: "Who we are",
    href: "/about",
    accent: "#c8a882",
    darkBg: "#1c1409",
    image: "/images/home/about.jpg",
  },
  {
    id: "02",
    label: "Projects",
    tagline: "Selected work",
    href: "/projects",
    accent: "#8b9eb4",
    darkBg: "#0c1219",
    image: "/images/home/projects.jpg",
  },
  {
    id: "03",
    label: "Services",
    tagline: "What we offer",
    href: "/services",
    accent: "#a8b49c",
    darkBg: "#111610",
    image: "/images/home/services.jpg",
  },
  {
    id: "04",
    label: "Contact",
    tagline: "Start a conversation",
    href: "/contact",
    accent: "#b4a090",
    darkBg: "#1a1411",
    image: "/images/home/contact.jpg",
  },
];

/* Cycling mystery phrases — rotate under the hero headline */
const mysteryPhrases = [
  "Spaces that hold their breath",
  "The quieter, the more alive",
  "What stays after the drawing ends",
  "Light, patience, a single gesture",
  "Architecture, in its lower voice",
];

/* ─────────────────────── BRAND WORDMARK ───────────────────── */

export function BrandWordmark({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-end gap-2 leading-none text-[var(--text)] ${className ?? ""}`}
    >
      <span
        className={`font-[var(--font-avenir-heavy)] font-extrabold uppercase tracking-[0.04em] ${compact ? "" : "text-[clamp(1.6rem,8vw,7rem)]"}`}
        style={compact ? { fontSize: "clamp(1rem,1.4vw,1.4rem)" } : undefined}
      >
        KATHA
      </span>
      <span
        className={`font-[var(--font-avenir-book)] font-medium uppercase tracking-[0.08em] ${compact ? "" : "text-[clamp(1.6rem,8vw,7rem)]"}`}
        style={compact ? { fontSize: "clamp(1rem,1.4vw,1.4rem)" } : undefined}
      >
        Studio
      </span>
    </span>
  );
}

/* ──────────────────── INTRO BRAND SEQUENCE ────────────────── */

function IntroBrandSequence({
  visible,
  onSettled,
}: {
  visible: boolean;
  onSettled: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"letters" | "hold" | "settle">("letters");

  /* ── Cursor-reactive parallax ── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 18, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 18, mass: 0.6 });
  const translateX = useTransform(smoothX, [0, 1], [-26, 26]);
  const translateY = useTransform(smoothY, [0, 1], [-14, 14]);
  const tiltY = useTransform(smoothX, [0, 1], [6, -6]);
  const tiltX = useTransform(smoothY, [0, 1], [-4, 4]);

  useEffect(() => {
    if (!visible) return;
    const t1 = window.setTimeout(
      () => setPhase("hold"),
      reduceMotion ? 500 : 3400
    );
    const t2 = window.setTimeout(
      () => setPhase("settle"),
      reduceMotion ? 1000 : 5200
    );
    const t3 = window.setTimeout(
      () => onSettled(),
      reduceMotion ? 1400 : 6800
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, reduceMotion, onSettled]);

  /* Track cursor — only during letters/hold phase */
  useEffect(() => {
    if (reduceMotion || !visible || phase === "settle") return;
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [visible, reduceMotion, phase, mouseX, mouseY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={
            phase === "settle"
              ? reduceMotion
                ? { opacity: 0, transition: { duration: 0.4 } }
                : {
                    opacity: [1, 1, 0],
                    scale: [1, 0.22, 0.22],
                    x: ["0vw", "-32vw", "-32vw"],
                    y: ["0vh", "-40vh", "-40vh"],
                    transition: {
                      duration: 1.5,
                      times: [0, 0.65, 1],
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
              : { opacity: 1 }
          }
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="pointer-events-auto fixed inset-0 z-[65] flex items-center justify-center bg-[var(--background)] transition-colors duration-500"
          style={{ perspective: "1400px" }}
        >
          {/* Cursor-reactive parallax wrapper */}
          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    x: translateX,
                    y: translateY,
                    rotateY: tiltY,
                    rotateX: tiltX,
                    transformStyle: "preserve-3d",
                  }
            }
            className="flex w-full items-center justify-center px-6 md:px-12 lg:px-20"
          >
            <div className="flex flex-wrap items-end justify-center gap-x-3 gap-y-1 sm:gap-x-4">
              <div className="flex">
                {brandLetters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 60, rotateX: -90, filter: "blur(12px)" }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
                    }
                    transition={{
                      delay: reduceMotion ? 0 : 0.3 + index * 0.42,
                      duration: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -16,
                            scale: 1.08,
                            letterSpacing: "0.06em",
                            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                          }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : { scale: 0.92, transition: { duration: 0.12 } }
                    }
                    className="cursor-pointer select-none font-[var(--font-avenir-heavy)] text-[clamp(2.2rem,11vw,8.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em] text-[var(--text)]"
                    style={{ perspective: "600px" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, x: 36, filter: "blur(10px)" }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0, filter: "blur(0px)" }
                }
                transition={{
                  delay: reduceMotion ? 0.2 : 2.6,
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 10,
                        letterSpacing: "0.14em",
                        transition: { duration: 0.45 },
                      }
                }
                className="cursor-pointer select-none font-[var(--font-avenir-book)] text-[clamp(2rem,10vw,8.5rem)] font-medium uppercase leading-[0.9] tracking-[0.06em] text-[var(--text-muted)]"
              >
                Studio
              </motion.span>
            </div>
          </motion.div>
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
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

/* ─────────────────────── CARD CONTENT ─────────────────────── */

function NavCardContent({
  card,
  isActive,
  isDragging,
}: {
  card: (typeof navCards)[number];
  isActive: boolean;
  isDragging: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = !!card.image && !imageFailed;

  return (
    <Link
      href={card.href}
      data-cursor="Enter"
      draggable={false}
      onClick={(e) => {
        if (isDragging) e.preventDefault();
      }}
      className="relative flex h-full flex-col justify-between overflow-hidden p-6 md:p-7"
    >
      {/* Image (if present) — zooms on active */}
      {hasImage && (
        <motion.div
          animate={{ scale: isActive ? 1.06 : 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={card.image!}
            alt={card.label}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
            priority
          />
          {/* Darken layer — clears a touch on active */}
          <motion.div
            animate={{ opacity: isActive ? 0.35 : 0.6 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>
      )}

      {/* Accent line — top */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.3,
          scaleX: isActive ? 1 : 0.4,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-[2] origin-center"
        style={{ height: "2px", backgroundColor: card.accent }}
      />

      {/* Radial top glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${card.accent}22 0%, transparent 60%)`,
        }}
      />

      {/* Ambient center glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.7 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${card.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Bottom vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 52%)",
        }}
      />

      {/* Top row: number + arrow */}
      <div className="relative z-[3] flex items-start justify-between">
        <span
          className="font-[var(--font-inter)] font-medium uppercase tracking-[0.32em]"
          style={{
            fontSize: "clamp(0.56rem, 0.8vw, 0.62rem)",
            color: hasImage ? "rgba(255,255,255,0.78)" : `${card.accent}88`,
          }}
        >
          {card.id}
        </span>
        <motion.span
          animate={{
            x: isActive ? 4 : 0,
            y: isActive ? -4 : 0,
            scale: isActive ? 1.22 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(0.8rem, 1vw, 0.92rem)",
            color: isActive
              ? card.accent
              : hasImage
              ? "rgba(255,255,255,0.7)"
              : `${card.accent}70`,
          }}
        >
          ↗
        </motion.span>
      </div>

      {/* Bottom: label + tagline */}
      <motion.div
        animate={{ y: isActive ? -2 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[3] space-y-[6px]"
      >
        <p
          className="font-[var(--font-avenir-heavy)] font-extrabold uppercase leading-none tracking-[0.02em]"
          style={{
            fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
            color: hasImage ? "#ffffff" : card.accent,
            textShadow: hasImage
              ? "0 2px 18px rgba(0,0,0,0.4)"
              : undefined,
          }}
        >
          {card.label}
        </p>
        <p
          className="font-[var(--font-avenir-book)] font-medium uppercase tracking-[0.2em]"
          style={{
            fontSize: "clamp(0.58rem, 0.8vw, 0.68rem)",
            color: hasImage ? "rgba(255,255,255,0.72)" : `${card.accent}80`,
          }}
        >
          {card.tagline}
        </p>

        {/* Active-state affordance: "Enter ↗" hint */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pt-3"
        >
          <span
            className="font-[var(--font-inter)] font-medium uppercase tracking-[0.3em]"
            style={{
              fontSize: "0.52rem",
              color: card.accent,
              borderBottom: `1px solid ${card.accent}70`,
              paddingBottom: "2px",
            }}
          >
            Enter
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */

export function SiteExperience() {
  useLenisScroll();

  const [introComplete, setIntroComplete] = useState(introHasPlayed);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  /* Hero spotlight cursor — follows mouse, creates a soft light reveal */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const smoothSpotX = useSpring(spotX, { stiffness: 80, damping: 22 });
  const smoothSpotY = useSpring(spotY, { stiffness: 80, damping: 22 });
  const spotlightBg = useTransform(
    [smoothSpotX, smoothSpotY],
    ([x, y]) =>
      `radial-gradient(circle 380px at ${x}% ${y}%, color-mix(in srgb, var(--text) 5%, transparent) 0%, transparent 70%)`
  );

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const handleIntroSettled = useCallback(() => {
    introHasPlayed = true;
    setIntroComplete(true);
  }, []);

  /* Lock scroll during intro */
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [introComplete]);

  /* Detect mobile viewport */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Cycling mystery phrases under the hero */
  useEffect(() => {
    if (!introComplete || reduceMotion) return;
    const id = window.setInterval(() => {
      setPhraseIndex((n) => (n + 1) % mysteryPhrases.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [introComplete, reduceMotion]);

  /* Hero spotlight — track cursor over the hero section */
  useEffect(() => {
    if (!introComplete || reduceMotion || isMobile) return;
    const el = heroSectionRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spotX.set(Math.max(0, Math.min(100, x)));
      spotY.set(Math.max(0, Math.min(100, y)));
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [introComplete, reduceMotion, isMobile, spotX, spotY]);

  /* Compute horizontal drag constraints (desktop only) */
  useEffect(() => {
    if (!introComplete || isMobile) return;
    const calc = () => {
      if (innerRef.current && outerRef.current) {
        const maxDrag = Math.max(
          0,
          innerRef.current.scrollWidth - outerRef.current.offsetWidth
        );
        setDragConstraints({ left: -maxDrag, right: 0 });
      }
    };
    const timer = setTimeout(calc, 100);
    window.addEventListener("resize", calc);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calc);
    };
  }, [introComplete, isMobile]);

  /* IntersectionObserver — mobile scroll-based active detection */
  useEffect(() => {
    if (!isMobile || !introComplete) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestRatio = 0;
        let bestIndex = -1;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) bestIndex = idx;
          }
        });
        if (bestIndex >= 0 && bestRatio > 0.35) {
          setActiveIndex(bestIndex);
        }
      },
      {
        rootMargin: "-28% 0px -28% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    const refs = mobileCardRefs.current;
    refs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, introComplete]);

  return (
    <div className="page-shell bg-[var(--background)] text-[var(--text)] transition-colors duration-500">
      <IntroBrandSequence visible={!introComplete} onSettled={handleIntroSettled} />

      <main className="relative pt-[4.5rem]">

        {/* ── HERO SECTION ── */}
        <motion.section
          ref={heroSectionRef}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={introComplete || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative overflow-hidden px-6 pt-10 pb-10 sm:px-8 sm:pt-14 sm:pb-12 md:px-12 md:pt-16 md:pb-14 lg:px-20 lg:pt-20 lg:pb-16"
        >
          {/* Cinematic spotlight — cursor-following light reveal (desktop only) */}
          {!isMobile && !reduceMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{ background: spotlightBg }}
            />
          )}

          <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">

            {/* Left: Headline */}
            <div className="flex-shrink-0">
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={
                  introComplete || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                transition={{
                  duration: 0.7,
                  delay: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-2 font-[var(--font-avenir-book)] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]"
                style={{ fontSize: "clamp(0.65rem, 1vw, 0.85rem)" }}
              >
                For the
              </motion.p>
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={
                  introComplete || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 28 }
                }
                transition={{
                  duration: 0.9,
                  delay: reduceMotion ? 0 : 0.44,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-[var(--font-avenir-heavy)] font-extrabold uppercase leading-[0.88] tracking-[0.02em] text-[var(--text)]"
                style={{ fontSize: "clamp(2.4rem, 7vw, 5.8rem)" }}
              >
                Architecture
                <br />
                That Breathes
              </motion.h1>

              {/* Cycling mystery phrase */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={
                  introComplete || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: 0.8,
                  delay: reduceMotion ? 0 : 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 flex items-center gap-3"
              >
                <span
                  aria-hidden
                  className="block h-px w-8 bg-[var(--text-dim)]"
                />
                <div className="relative h-[1.3em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-[var(--font-avenir-book)] italic text-[var(--text-muted)]"
                      style={{ fontSize: "clamp(0.74rem, 1.05vw, 0.92rem)" }}
                    >
                      {mysteryPhrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right: Tagline — visible on all screens */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={
                introComplete || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.62,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-full font-[var(--font-inter)] leading-[1.75] text-[var(--text-muted)] md:max-w-[240px] lg:max-w-[300px]"
              style={{ fontSize: "clamp(0.78rem, 1vw, 0.88rem)" }}
            >
              We design spaces that mirror your vision, your calm, and your
              story — because architecture is not just built, it&apos;s lived.
            </motion.p>
          </div>
        </motion.section>

        {/* ── CARD CAROUSEL / STACK ── */}
        <section className="pb-16 md:pb-28">
          {isMobile ? (
            /* ── Mobile: Vertical Stack with scroll-triggered active ── */
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={
                introComplete || reduceMotion ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.6 }}
              className="flex flex-col gap-5 px-6 pb-4"
            >
              {navCards.map((card, i) => {
                const isActive = activeIndex === i;
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      mobileCardRefs.current[i] = el;
                    }}
                    data-index={i}
                    className="flex w-full justify-center"
                  >
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
                      animate={
                        introComplete || reduceMotion
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 60 }
                      }
                      transition={{
                        duration: 0.9,
                        delay: reduceMotion ? 0 : 0.75 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.92,
                          y: isActive ? -6 : 0,
                          opacity: isActive ? 1 : 0.4,
                          boxShadow: isActive
                            ? `0 26px 60px -18px ${card.accent}55, 0 0 90px -28px ${card.accent}48, 0 0 0 1px ${card.accent}26`
                            : "0 0 0 0 rgba(0,0,0,0)",
                        }}
                        transition={{
                          scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.45 },
                          boxShadow: { duration: 0.55 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl"
                        style={{
                          height: "min(44vh, 22rem)",
                          backgroundColor: card.darkBg,
                        }}
                      >
                        <NavCardContent
                          card={card}
                          isActive={isActive}
                          isDragging={false}
                        />
                      </motion.div>
                      {/* Mobile: active card progress indicator */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="mx-auto mt-3 flex items-center justify-center gap-2"
                      >
                        <span
                          className="font-[var(--font-inter)] font-medium uppercase tracking-[0.32em] text-[var(--text-dim)]"
                          style={{ fontSize: "0.54rem" }}
                        >
                          {String(i + 1).padStart(2, "0")} / {String(navCards.length).padStart(2, "0")}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* ── Desktop: Horizontal Carousel (drag-enabled) ── */
            <div ref={outerRef} className="overflow-hidden">
              <motion.div
                ref={innerRef}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0.06}
                dragMomentum
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setTimeout(() => setIsDragging(false), 80)}
                initial="hidden"
                animate={introComplete ? "visible" : "hidden"}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduceMotion ? 0 : 0.14,
                      delayChildren: reduceMotion ? 0 : 0.75,
                    },
                  },
                }}
                className="flex gap-3 px-8 md:gap-4 md:px-12 lg:justify-center lg:px-20 cursor-grab active:cursor-grabbing select-none"
              >
                {navCards.map((card, i) => {
                  const isActive = activeIndex === i;

                  return (
                    <motion.div
                      key={card.id}
                      variants={{
                        hidden: reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 120, rotateX: -12, filter: "blur(10px)" },
                        visible: reduceMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 1,
                              y: 0,
                              rotateX: 0,
                              filter: "blur(0px)",
                              transition: {
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                              },
                            },
                      }}
                      className="flex-shrink-0"
                      style={{ perspective: "900px" }}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.06 : 0.9,
                          y: isActive ? -26 : 0,
                          opacity: isActive ? 1 : 0.52,
                          boxShadow: isActive
                            ? `0 30px 70px -18px ${card.accent}4d, 0 0 90px -28px ${card.accent}40, 0 0 0 1px ${card.accent}22`
                            : "0 0 0 0 rgba(0,0,0,0)",
                        }}
                        transition={{
                          scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.4 },
                          boxShadow: { duration: 0.55 },
                        }}
                        onHoverStart={() => setActiveIndex(i)}
                        whileTap={{ scale: isActive ? 1.03 : 0.87 }}
                        className="overflow-hidden rounded-2xl"
                        style={{
                          width: "clamp(200px, 22vw, 290px)",
                          height: "clamp(360px, 60vh, 540px)",
                          backgroundColor: card.darkBg,
                        }}
                      >
                        <NavCardContent
                          card={card}
                          isActive={isActive}
                          isDragging={isDragging}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          )}
        </section>
      </main>

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[88rem] px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between">
            <BrandWordmark compact />
            <p className="font-[var(--font-inter)] text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[var(--text-dim)] sm:text-[0.6rem]">
              &copy; {new Date().getFullYear()} Katha Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
