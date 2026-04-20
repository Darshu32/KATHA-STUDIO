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
  useScroll,
  animate as animateValue,
} from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import Lenis from "lenis";
import { MarqueeStrip } from "@/components/marquee-strip";
import { categories, services } from "@/lib/data";

/* ─────────────────────────── CONSTANTS ────────────────────── */

let introHasPlayed = false;

const brandLetters = ["K", "A", "T", "H", "A"];
const studioLetters = ["S", "T", "U", "D", "I", "O"];

const toneCards = {
  warm:    { accent: "#c8a882", darkBg: "#1c1409" },
  cool:    { accent: "#8b9eb4", darkBg: "#0c1219" },
  default: { accent: "#a8b49c", darkBg: "#111610" },
};

const allCards = [
  {
    id: "00",
    label: "About",
    tagline: "Who we are",
    href: "/about",
    accent: "#c8a882",
    darkBg: "#1c1409",
    image: "/images/about/Screenshot 2026-04-08 132119.png",
  },
  ...categories.map((c, i) => ({
    id: String(i + 1).padStart(2, "0"),
    label: c.title,
    tagline: c.tagline,
    href: `/projects/${c.slug}`,
    ...toneCards[c.tone],
    image: c.image,
  })),
  ...services.map((s) => ({
    id: s.id,
    label: s.title,
    tagline: s.category,
    href: `/services/${s.slug}`,
    ...toneCards[s.tone],
    image: s.image,
  })),
  {
    id: "09",
    label: "Contact",
    tagline: "Start a conversation",
    href: "/contact",
    accent: "#b4a090",
    darkBg: "#1a1411",
    image: "/images/home/Screenshot 2026-04-08 132135.png",
  },
];

/* Derive editorial category label from href */
function getCardCategory(href: string): string {
  if (href === "/")                  return "INTRO";
  if (href === "/about")             return "ABOUT";
  if (href.startsWith("/projects"))  return "PROJECT";
  if (href.startsWith("/services"))  return "SERVICE";
  if (href === "/contact")           return "CONTACT";
  return "";
}

/* Cycling mystery phrases — rotate under the hero headline */
const mysteryPhrases = [
  "Spaces that hold their breath",
  "The quieter, the more alive",
  "What stays after the drawing ends",
  "Light, patience, a single gesture",
  "Architecture, in its lower voice",
];

/* Whispered lines that appear after idle timeout */
const idleWhispers = [
  "— still here?",
  "— take your time",
  "— the quietest architecture wins",
  "— stay a moment longer",
  "— we noticed you",
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
      reduceMotion ? 300 : 2400
    );
    const t2 = window.setTimeout(
      () => setPhase("settle"),
      reduceMotion ? 500 : 2550
    );
    const t3 = window.setTimeout(
      () => onSettled(),
      reduceMotion ? 800 : 3500
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
                      duration: 0.9,
                      times: [0, 0.55, 1],
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
              {/* KATHA — typewriter letter by letter */}
              <div className="flex items-end">
                {brandLetters.map((letter, index) => {
                  const delay = reduceMotion ? 0 : 0.4 + index * 0.13;
                  return (
                    <motion.span
                      key={`brand-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay, duration: 0.01 }}
                      className="select-none font-[var(--font-avenir-heavy)] text-[clamp(2rem,10vw,8.5rem)] font-extrabold uppercase leading-[0.9] tracking-[0.02em] text-[var(--text)]"
                    >
                      {letter}
                    </motion.span>
                  );
                })}

              </div>

              {/* STUDIO — typewriter letter by letter */}
              <div className="flex items-end">
                {studioLetters.map((letter, index) => {
                  const delay = reduceMotion ? 0 : 1.2 + index * 0.13;
                  return (
                    <motion.span
                      key={`studio-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay, duration: 0.01 }}
                      className="select-none font-[var(--font-avenir-book)] text-[clamp(2rem,10vw,8.5rem)] font-medium uppercase leading-[0.9] tracking-[0.06em] text-[var(--text)]"
                    >
                      {letter}
                    </motion.span>
                  );
                })}

              </div>
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
  card: (typeof allCards)[number];
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
          {/* Darken layer — minimal, keeps images vibrant */}
          <motion.div
            animate={{ opacity: isActive ? 0.18 : 0.22 }}
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

      {/* Bottom vignette — subtle, preserves image brightness */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 45%)",
        }}
      />

      {/* Top row: arrow only */}
      <div className="relative z-[3] flex items-start justify-end">
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
    </Link>
  );
}

/* ──────────────────── DRIFTING DRAFTING MARKS ───────────────
 *
 * Small decorative elements that float around the hero on infinite
 * sine-wave paths. Each has its own speed and phase so they never
 * sync up. Creates an ambient "living page" feel.
 * ──────────────────────────────────────────────────────────── */

type DriftMark = {
  content: string;
  top: string;
  left: string;
  size: string;
  letterSpacing: string;
  duration: number;
  delay: number;
  dx: number; // horizontal drift amplitude
  dy: number; // vertical drift amplitude
  opacity: number;
  italic?: boolean;
};

const driftMarks: DriftMark[] = [
  {
    content: "№ 01",
    top: "18%",
    left: "6%",
    size: "0.58rem",
    letterSpacing: "0.32em",
    duration: 11,
    delay: 0,
    dx: 14,
    dy: 10,
    opacity: 0.22,
  },
  {
    content: "—",
    top: "32%",
    left: "88%",
    size: "1.4rem",
    letterSpacing: "0",
    duration: 13,
    delay: 1.5,
    dx: 18,
    dy: 12,
    opacity: 0.14,
  },
  {
    content: "•",
    top: "72%",
    left: "14%",
    size: "0.6rem",
    letterSpacing: "0",
    duration: 9,
    delay: 2.8,
    dx: 10,
    dy: 14,
    opacity: 0.2,
  },
  {
    content: "23.02° N",
    top: "80%",
    left: "82%",
    size: "0.55rem",
    letterSpacing: "0.3em",
    duration: 14,
    delay: 0.6,
    dx: 16,
    dy: 8,
    opacity: 0.18,
  },
  {
    content: "/ ii",
    top: "26%",
    left: "72%",
    size: "0.7rem",
    letterSpacing: "0.15em",
    duration: 12,
    delay: 3.6,
    dx: 12,
    dy: 10,
    opacity: 0.16,
    italic: true,
  },
  {
    content: "·",
    top: "58%",
    left: "46%",
    size: "0.9rem",
    letterSpacing: "0",
    duration: 10,
    delay: 4.2,
    dx: 8,
    dy: 12,
    opacity: 0.14,
  },
];

function DriftingMarks({ visible }: { visible: boolean }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {driftMarks.map((m, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={
            visible
              ? {
                  opacity: [0, m.opacity, m.opacity, 0],
                  x: [0, m.dx, -m.dx * 0.6, 0],
                  y: [0, -m.dy, m.dy * 0.5, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: {
              duration: m.duration,
              times: [0, 0.2, 0.8, 1],
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute font-[var(--font-inter)] font-medium uppercase"
          style={{
            top: m.top,
            left: m.left,
            fontSize: m.size,
            letterSpacing: m.letterSpacing,
            color: "var(--text-dim)",
            fontStyle: m.italic ? "italic" : "normal",
            textTransform: "uppercase",
          }}
        >
          {m.content}
        </motion.span>
      ))}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */

export function SiteExperience() {
  useLenisScroll();

  const [introComplete, setIntroComplete] = useState(introHasPlayed);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(Math.floor(allCards.length / 2));
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [whisper, setWhisper] = useState("");
  const idleTimerRef = useRef<number | null>(null);

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

  /* Scroll-linked parallax for hero elements */
  const { scrollY, scrollYProgress } = useScroll();
  const heroHeadlineY = useTransform(scrollY, [0, 600], [0, -40]);
  const heroTaglineY = useTransform(scrollY, [0, 600], [0, -12]);
  const driftLayerY = useTransform(scrollY, [0, 600], [0, 60]);
  const scrollProgressY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const dragX = useMotionValue(0);

  /* ── Auto-play refs ── */
  const activeIndexRef = useRef(Math.floor(allCards.length / 2));
  const interactingRef = useRef(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  /* Mobile carousel — pointer-driven with spring smoothing */
  const mobileDragX   = useMotionValue(0);
  const mobileSmoothX = useSpring(mobileDragX, { stiffness: 220, damping: 26, mass: 0.9 });
  const mobileStepRef   = useRef(0);
  const mobileTouchRef  = useRef({ startX: 0, startVal: 0, startTime: 0 });
  const mobileDragActive = useRef(false);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const pauseInteraction = useCallback(() => {
    interactingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const resumeInteraction = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => { interactingRef.current = false; }, 3500);
  }, []);

  /* Snap mobile carousel to a card index — animates raw value, spring follows */
  const snapMobileTo = useCallback((index: number, instant = false) => {
    const clamped = Math.max(0, Math.min(allCards.length - 1, index));
    const target  = -(clamped * mobileStepRef.current);
    if (instant) {
      mobileDragX.set(target);
    } else {
      animateValue(mobileDragX, target, { type: "spring", stiffness: 260, damping: 28, mass: 0.92 });
    }
    setActiveIndex(clamped);
  }, [mobileDragX]);

  const scrollToIndex = useCallback((index: number, instant = false) => {
    if (!innerRef.current || !outerRef.current) return;
    const child = innerRef.current.children[index] as HTMLElement | undefined;
    if (!child) return;
    const outerWidth = outerRef.current.offsetWidth;
    const target = -(child.offsetLeft - outerWidth / 2 + child.offsetWidth / 2);
    /* Only clamp once bounds have been measured */
    const boundsReady = rightBoundRef.current !== 0 || leftBoundRef.current !== 0;
    const clamped = boundsReady
      ? Math.min(rightBoundRef.current, Math.max(leftBoundRef.current, target))
      : target;
    if (instant) { dragX.set(clamped); }
    else { animateValue(dragX, clamped, { type: "spring", stiffness: 190, damping: 26, mass: 0.95 }); }
  }, [dragX]);

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

  /* Idle reveal — after 8s of no cursor/touch movement, show a whisper */
  useEffect(() => {
    if (!introComplete || reduceMotion) return;

    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        const pick =
          idleWhispers[Math.floor(Math.random() * idleWhispers.length)];
        setWhisper(pick);
        setIsIdle(true);
      }, 8000);
    };

    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("touchstart", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle);

    return () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
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
  const rightBoundRef = useRef(0);
  const leftBoundRef = useRef(0);

  useEffect(() => {
    if (!introComplete || isMobile) return;
    const calcAndCenter = (instant = true) => {
      if (!innerRef.current || !outerRef.current) return;
      const outerWidth = outerRef.current.offsetWidth;
      const firstCard = innerRef.current.children[0] as HTMLElement | undefined;
      const lastCard = innerRef.current.children[allCards.length - 1] as HTMLElement | undefined;
      if (!firstCard || !lastCard) return;
      /* Allow rightward scroll so first card can be centered */
      const right = Math.max(0, outerWidth / 2 - firstCard.offsetWidth / 2 - firstCard.offsetLeft);
      /* Allow leftward scroll so last card can be centered */
      const left = -(lastCard.offsetLeft + lastCard.offsetWidth / 2 - outerWidth / 2);
      rightBoundRef.current = right;
      leftBoundRef.current = left;
      setDragConstraints({ left, right });
      /* Bounds are set — now center the active card */
      scrollToIndex(activeIndexRef.current, instant);
    };
    const timer = setTimeout(() => calcAndCenter(true), 80);
    const onResize = () => calcAndCenter(true);
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introComplete, isMobile]);

  /* Auto-play: advance one card every 1s, loop back to first */
  useEffect(() => {
    if (!introComplete || reduceMotion) return;

    const start = setTimeout(() => {
      autoPlayTimerRef.current = setInterval(() => {
        if (interactingRef.current) return;
        const current = activeIndexRef.current;
        const next = (current + 1) % allCards.length;
        const isLoop = next === 0;
        setActiveIndex(next);

        if (isMobile) {
          snapMobileTo(next, isLoop);
        } else {
          if (isLoop) {
            scrollToIndex(0, true);
          } else {
            scrollToIndex(next);
          }
        }
      }, 2000);
    }, 2600);

    return () => {
      clearTimeout(start);
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [introComplete, reduceMotion, isMobile, scrollToIndex, snapMobileTo]);

  /* Mobile: measure card step = 80vw + 3vw gap */
  useEffect(() => {
    if (!isMobile) return;
    const calc = () => { mobileStepRef.current = window.innerWidth * 0.83; };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isMobile]);

  /* Mobile: sync activeIndex from smoothed position.
     Guarded against redundant setState calls — the spring emits many "change"
     events per second while settling, and re-rendering every card on each
     emission was what made vertical scrolling feel "stuck". */
  useEffect(() => {
    if (!isMobile) return;
    return mobileSmoothX.on("change", (x) => {
      if (mobileStepRef.current === 0) return;
      const raw = Math.round(-x / mobileStepRef.current);
      const idx = Math.max(0, Math.min(allCards.length - 1, raw));
      if (idx !== activeIndexRef.current) setActiveIndex(idx);
    });
  }, [isMobile, mobileSmoothX]);

  /* Mobile: snap to initial card once intro completes */
  useEffect(() => {
    if (!introComplete || !isMobile) return;
    const t = setTimeout(() => snapMobileTo(activeIndexRef.current, true), 160);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introComplete, isMobile]);

  return (
    <div className="page-shell bg-[var(--background)] text-[var(--text)] transition-colors duration-500">
      <IntroBrandSequence visible={!introComplete} onSettled={handleIntroSettled} />

      {/* ── Floating scroll progress indicator (right edge) ── */}
      {!reduceMotion && introComplete && (
        <div
          aria-hidden
          className="pointer-events-none fixed right-3 top-1/2 z-40 hidden h-48 -translate-y-1/2 md:right-5 md:block lg:right-7"
        >
          <div
            className="relative h-full w-px"
            style={{ backgroundColor: "var(--border)" }}
          >
            <motion.span
              className="absolute -left-[3px] block h-[7px] w-[7px] rounded-full"
              style={{
                top: scrollProgressY,
                backgroundColor: "var(--text)",
              }}
            />
          </div>
        </div>
      )}

      <main className="relative flex min-h-[100svh] flex-col pt-[4.2rem]">

        {/* ── HERO SECTION ── */}
        <motion.section
          ref={heroSectionRef}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={introComplete || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative overflow-hidden px-6 pt-1 pb-2 sm:px-8 sm:pt-2 sm:pb-2 md:px-12 md:pt-2 md:pb-3 lg:px-20 lg:pt-3 lg:pb-4"
        >
          {/* Cinematic spotlight — cursor-following light reveal (desktop only) */}
          {!isMobile && !reduceMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0"
              style={{ background: spotlightBg }}
            />
          )}

          {/* Drifting drafting marks — ambient "antigravity" layer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={reduceMotion ? undefined : { y: driftLayerY }}
          >
            <DriftingMarks visible={introComplete} />
          </motion.div>

          <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">

            {/* Left: Headline */}
            <motion.div
              className="flex-shrink-0"
              style={reduceMotion ? undefined : { y: heroHeadlineY }}
            >
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
                  reduceMotion
                    ? { opacity: 1 }
                    : introComplete
                    ? {
                        opacity: 1,
                        y: [0, -3, 0],
                        scale: [1, 1.006, 1],
                      }
                    : { opacity: 0, y: 28 }
                }
                transition={{
                  opacity: { duration: 0.9, delay: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] },
                  y: introComplete
                    ? { duration: 6, delay: 1.4, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 6, delay: 1.4, repeat: Infinity, ease: "easeInOut" },
                }}
                className="font-[var(--font-avenir-heavy)] font-extrabold uppercase leading-[0.88] tracking-[0.02em] text-[var(--text)]"
                style={{
                  fontSize: "clamp(1.75rem, 6.2vw, 4.8rem)",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
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

              {/* Idle whisper — fades in after 8s of no motion */}
              <div className="relative mt-3 h-[1.3em]">
                <AnimatePresence mode="wait">
                  {isIdle && !reduceMotion && (
                    <motion.span
                      key={whisper}
                      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-[var(--font-avenir-book)] italic text-[var(--text-dim)]"
                      style={{ fontSize: "clamp(0.68rem, 0.95vw, 0.82rem)" }}
                    >
                      {whisper}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Interactive Tagline — word-by-word reveal with hover lift */}
            <motion.div
              style={reduceMotion ? undefined : { y: heroTaglineY }}
              className="max-w-full md:max-w-[300px] lg:max-w-[340px]"
            >
              <p
                className="font-[var(--font-inter)] leading-[1.85]"
                style={{ fontSize: "clamp(0.82rem, 1.02vw, 0.95rem)", color: "var(--text-muted)" }}
              >
                {([
                  { t: "In" },
                  { t: "every" },
                  { t: "before" },
                  { t: "and" },
                  { t: "after" },
                  { t: "lies" },
                  { t: "a" },
                  { t: "story" },
                  { t: "of" },
                  { t: "becoming" },
                  { t: "—" },
                  { t: "of" },
                  { t: "materials" },
                  { t: "meeting" },
                  { t: "purpose," },
                  { t: "of" },
                  { t: "light" },
                  { t: "learning" },
                  { t: "its" },
                  { t: "path," },
                  { t: "of" },
                  { t: "details" },
                  { t: "that" },
                  { t: "only" },
                  { t: "patience" },
                  { t: "could" },
                  { t: "perfect." },
                ] as { t: string }[]).map((w, i, arr) => (
                  <motion.span
                    key={i}
                    initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={
                      introComplete || reduceMotion
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 10, filter: "blur(4px)" }
                    }
                    transition={{
                      duration: 0.6,
                      delay: reduceMotion ? 0 : 0.68 + i * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="interactive-word"
                    style={{
                      display: "inline-block",
                      marginRight: i === arr.length - 1 ? 0 : "0.3em",
                      fontFamily: "inherit",
                      fontStyle: "normal",
                      fontWeight: 700,
                      color: "var(--text)",
                      cursor: "default",
                      transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.35s",
                    }}
                  >
                    {w.t}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── CARD CAROUSEL / STACK ── */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={introComplete || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-1 flex-col justify-center pb-6 md:pb-8 lg:pb-10">
          {/* Ambient hairline sweep at top boundary */}
          <div className="relative mx-auto mb-3 h-px max-w-[88rem] opacity-70 md:mb-5">
            <div className="hairline-sweep" />
          </div>
          {isMobile ? (
            /* ── Mobile: Framer Motion Drag Wave Carousel ── */
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={introComplete || reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.55 }}
              className="relative"
            >
              {/* Clipping shell — pointer events drive the spring */}
              <div
                className="overflow-x-clip"
                style={{ paddingLeft: "10vw", paddingTop: "2.5rem", touchAction: "pan-y", userSelect: "none" }}
                onPointerDown={(e) => {
                  mobileTouchRef.current = { startX: e.clientX, startVal: mobileDragX.get(), startTime: Date.now() };
                  mobileDragActive.current = false;
                  setIsDragging(false);
                  (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                  pauseInteraction();
                }}
                onPointerMove={(e) => {
                  if (!(e.buttons & 1)) return;
                  const dx = e.clientX - mobileTouchRef.current.startX;
                  if (Math.abs(dx) > 6) {
                    mobileDragActive.current = true;
                    setIsDragging(true);
                  }
                  const raw     = mobileTouchRef.current.startVal + dx;
                  const maxLeft = -(allCards.length - 1) * mobileStepRef.current;
                  /* Rubber-band resistance at both ends */
                  let x = raw;
                  if (raw > 0)        x = raw * 0.14;
                  if (raw < maxLeft)  x = maxLeft + (raw - maxLeft) * 0.14;
                  mobileDragX.set(x);
                }}
                onPointerUp={(e) => {
                  const dx  = e.clientX - mobileTouchRef.current.startX;
                  const dt  = Math.max(1, Date.now() - mobileTouchRef.current.startTime);
                  const vx  = (dx / dt) * 1000;
                  const raw = -mobileDragX.get() / mobileStepRef.current;
                  let target = Math.round(raw);
                  if (vx < -480) target = Math.min(allCards.length - 1, Math.floor(raw) + 1);
                  if (vx >  480) target = Math.max(0, Math.ceil(raw) - 1);
                  snapMobileTo(Math.max(0, Math.min(allCards.length - 1, target)));
                  setTimeout(() => { mobileDragActive.current = false; setIsDragging(false); }, 80);
                  resumeInteraction();
                }}
              >
                <motion.div
                  style={{ x: mobileSmoothX, display: "flex", gap: "3vw" }}
                >
                  {allCards.map((card, i) => {
                    const isActive = activeIndex === i;
                    const wave = Math.abs(i - activeIndex);
                    const entranceDelay = reduceMotion ? 0 : 0.7 + wave * 0.15;
                    const entranceDuration = wave === 0 ? 0.7 : 0.88;
                    /* Wave physics */
                    const waveY       = isActive ? -6 : Math.min(wave * 7, 22);
                    const waveOpacity = isActive ? 1  : Math.max(0.42, 0.82 - wave * 0.14);
                    const waveScale   = isActive ? 1  : Math.max(0.80, 0.96 - wave * 0.07);

                    return (
                      <div
                        key={card.href}
                        ref={(el) => { mobileCardRefs.current[i] = el; }}
                        className="shrink-0"
                        style={{ width: "80vw" }}
                      >
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 48 }}
                          animate={introComplete || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
                          transition={{ duration: entranceDuration, delay: entranceDelay, ease: [0.22, 1, 0.36, 1] }}
                          className="relative"
                        >
                          {/* Editorial category label — left-aligned above the active card */}
                          {isActive && (
                              <div
                                className="pointer-events-none absolute z-[4] flex items-center"
                                style={{ top: "-2.05rem", left: "0", gap: "0.7rem" }}
                              >
                                <span
                                  aria-hidden
                                  className="inline-block"
                                  style={{ width: "1.5px", height: "clamp(15px, 4.2vw, 19px)", backgroundColor: "var(--text)" }}
                                />
                                <span
                                  style={{
                                    fontFamily: "var(--font-avenir-heavy)",
                                    fontSize: "clamp(0.82rem, 3.6vw, 0.96rem)",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.07em",
                                    color: "var(--text)",
                                    lineHeight: 1,
                                  }}
                                >
                                  {getCardCategory(card.href)}
                                </span>
                              </div>
                            )}

                          {/* Card shell */}
                          <motion.div
                            animate={{
                              scale: waveScale,
                              y: waveY,
                              opacity: waveOpacity,
                            }}
                            transition={{
                              scale:     { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                              y:         { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                              opacity:   { duration: 0.38 },
                            }}
                            whileTap={{ scale: isActive ? 0.97 : 0.92 }}
                            className="relative w-full overflow-hidden"
                            style={{ height: "min(56vw, 26rem)", backgroundColor: card.darkBg }}
                          >
                            <NavCardContent card={card} isActive={isActive} isDragging={isDragging} />
                          </motion.div>

                          {/* Label + counter below active card */}
                          <motion.div
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 5 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-3 flex items-end justify-between px-0.5"
                          >
                            <div className="min-w-0">
                              <p style={{ fontFamily: "var(--font-avenir-heavy)", fontSize: "0.84rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em", color: "var(--text)", lineHeight: 1.1 }}>
                                {card.label}
                              </p>
                              <p className="mt-1 truncate" style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
                                {card.tagline}
                              </p>
                            </div>
                            <span className="shrink-0 pl-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.26em", color: "var(--text-dim)" }}>
                              {String(i + 1).padStart(2, "0")} / {String(allCards.length).padStart(2, "0")}
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Dot pagination — tap to jump */}
              <div className="mt-5 flex items-center justify-center gap-[5px]">
                {allCards.map((c, i) => (
                  <motion.button
                    key={i}
                    onClick={() => { snapMobileTo(i); pauseInteraction(); resumeInteraction(); }}
                    animate={{
                      width:   activeIndex === i ? "1.5rem" : "0.32rem",
                      opacity: activeIndex === i ? 1 : 0.25,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[2px] rounded-full"
                    style={{ backgroundColor: "var(--text)" }}
                    aria-label={`Go to ${c.label}`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Desktop: Horizontal Carousel (drag-enabled) ── */
            <div className="relative">
              <button
                aria-label="Previous"
                onClick={() => { const next = Math.max(0, activeIndex - 1); setActiveIndex(next); scrollToIndex(next); pauseInteraction(); resumeInteraction(); }}
                disabled={activeIndex === 0}
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] transition-opacity hover:opacity-80 disabled:opacity-20 md:left-4"
                style={{ color: "var(--text)" }}
              >←</button>
              <button
                aria-label="Next"
                onClick={() => { const next = Math.min(allCards.length - 1, activeIndex + 1); setActiveIndex(next); scrollToIndex(next); pauseInteraction(); resumeInteraction(); }}
                disabled={activeIndex === allCards.length - 1}
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] transition-opacity hover:opacity-80 disabled:opacity-20 md:right-4"
                style={{ color: "var(--text)" }}
              >→</button>
            <div ref={outerRef} className="overflow-x-clip py-6 -my-6">
              <motion.div
                ref={innerRef}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0.1}
                dragMomentum={false}
                style={{ x: dragX }}
                onDragStart={() => { setIsDragging(true); pauseInteraction(); }}
                onDragEnd={() => {
                  setTimeout(() => setIsDragging(false), 80);
                  resumeInteraction();
                  /* Snap to nearest card after drag — fixes "stuck" feel */
                  if (!innerRef.current || !outerRef.current) return;
                  const outerWidth = outerRef.current.offsetWidth;
                  const currentX = dragX.get();
                  let bestIdx = 0;
                  let bestDist = Infinity;
                  Array.from(innerRef.current.children).forEach((child, i) => {
                    const el = child as HTMLElement;
                    const cardCenter = el.offsetLeft + el.offsetWidth / 2;
                    const cardTarget = -(cardCenter - outerWidth / 2);
                    const dist = Math.abs(cardTarget - currentX);
                    if (dist < bestDist) { bestDist = dist; bestIdx = i; }
                  });
                  setActiveIndex(bestIdx);
                  scrollToIndex(bestIdx);
                }}
                className="flex gap-3 px-8 md:gap-4 md:px-12 cursor-grab active:cursor-grabbing select-none"
              >
                {allCards.map((card, i) => {
                  const isActive = activeIndex === i;
                  /* Sequenced cascade:
                   *   1. Active card arrives first at center (scale-in from blur)
                   *   2. Right cards fly in from the right edge, staggered outward
                   *   3. Left cards fly in from the left edge, staggered outward
                   */
                  const wave = Math.abs(i - activeIndex);
                  const direction = i < activeIndex ? -1 : 1;
                  const isRight = i > activeIndex;
                  const rightOffset = i - activeIndex;
                  const leftOffset  = activeIndex - i;
                  const numRight    = allCards.length - 1 - activeIndex;
                  let entranceDelay: number;
                  if (reduceMotion) {
                    entranceDelay = 0;
                  } else if (wave === 0) {
                    entranceDelay = 0.25;
                  } else if (isRight) {
                    entranceDelay = 0.85 + (rightOffset - 1) * 0.11;
                  } else {
                    entranceDelay = 0.85 + numRight * 0.11 + (leftOffset - 1) * 0.11;
                  }
                  const entranceDuration = wave === 0 ? 0.8 : 0.78;

                  const initialState = reduceMotion
                    ? false
                    : wave === 0
                    ? {
                        opacity: 0,
                        scale: 1.18,
                        filter: "blur(12px)",
                        x: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.86,
                        filter: "blur(6px)",
                        x: direction * (260 + wave * 90),
                        y: 0,
                      };

                  const animateState =
                    introComplete || reduceMotion
                      ? {
                          opacity: 1,
                          scale: 1,
                          filter: "blur(0px)",
                          x: 0,
                          y: 0,
                        }
                      : initialState;

                  return (
                    <motion.div
                      key={card.href}
                      initial={initialState}
                      animate={animateState}
                      transition={{
                        duration: entranceDuration,
                        delay: entranceDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex-shrink-0"
                      style={{ perspective: "900px", width: "clamp(180px, 19vw, 260px)" }}
                    >
                      {/* Editorial category label — left-aligned above active card, Minale + Mann style */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={`cat-${card.href}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-none absolute z-[4] flex items-center"
                            style={{ top: "-2.35rem", left: "0", gap: "0.75rem" }}
                          >
                            <span
                              aria-hidden
                              className="inline-block"
                              style={{ width: "1.5px", height: "clamp(16px, 1.4vw, 20px)", backgroundColor: "var(--text)" }}
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-avenir-heavy)",
                                fontSize: "clamp(0.86rem, 1.05vw, 1.02rem)",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--text)",
                                lineHeight: 1,
                              }}
                            >
                              {getCardCategory(card.href)}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        animate={{
                          scale: isActive ? 1.04 : 0.9,
                          y: isActive ? -6 : 0,
                          height: [320, 282, 248, 222, 202][Math.min(wave, 4)],
                          opacity: isActive ? 1 : 0.92,
                        }}
                        transition={{
                          scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                          height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.4 },
                        }}
                        onHoverStart={() => { setActiveIndex(i); pauseInteraction(); }}
                        onHoverEnd={() => resumeInteraction()}
                        whileTap={{ scale: isActive ? 1.03 : 0.87 }}
                        className="overflow-hidden"
                        style={{
                          width: "100%",
                          backgroundColor: card.darkBg,
                        }}
                      >
                        <NavCardContent
                          card={card}
                          isActive={isActive}
                          isDragging={isDragging}
                        />
                      </motion.div>

                      {/* Label + tagline + counter below — only visible on active */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-3 flex items-end justify-between gap-2 px-0.5"
                      >
                        <div className="min-w-0">
                          <p style={{
                            fontFamily: "var(--font-avenir-heavy)",
                            fontSize: "clamp(0.74rem, 0.92vw, 0.86rem)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                            color: "var(--text)",
                            lineHeight: 1.1,
                          }}>
                            {card.label}
                          </p>
                          <p className="mt-1 truncate" style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "clamp(0.5rem, 0.6vw, 0.58rem)",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "var(--text-muted)",
                          }}>
                            {card.tagline}
                          </p>
                        </div>
                        <span className="shrink-0" style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.46rem, 0.55vw, 0.54rem)",
                          letterSpacing: "0.26em",
                          color: "var(--text-dim)",
                        }}>
                          {String(i + 1).padStart(2, "0")} / {String(allCards.length).padStart(2, "0")}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
            </div>
          )}
        </motion.section>
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
