"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate as animateValue,
} from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import Lenis from "lenis";
import { MarqueeStrip } from "@/components/marquee-strip";
import { HomeStory } from "@/components/home-story";
import { WhyKatha } from "@/components/why-katha";
import { services } from "@/lib/data";

/* ─────────────────────────── CONSTANTS ────────────────────── */

/* Intro plays once per full page load. The flag survives client-side
   navigation (so returning to "/" doesn't replay it) but resets on a
   hard reload. */
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
    label: "Studio",
    tagline: "Who we are",
    href: "/studio",
    accent: "#c8a882",
    darkBg: "#1c1409",
    image: "/images/home/studio.webp",
    focal: "50% 60%",
  },
  ...services.map((s, i) => ({
    id: String(i + 1).padStart(2, "0"),
    label: s.title,
    tagline: s.category,
    href: `/services/${s.slug}`,
    ...toneCards[s.tone],
    image: s.image,
    focal: s.focal ?? "50% 50%",
  })),
  {
    id: String(services.length + 1).padStart(2, "0"),
    label: "Contact",
    tagline: "Start a conversation",
    href: "/contact",
    accent: "#b4a090",
    darkBg: "#1a1411",
    image: "/images/home/contact.webp",
    focal: "50% 70%",
  },
];

/* Each service card shows its own project-type kicker rather than a
 * blanket "SERVICE". Keyed by the service slug. */
const serviceCardLabels: Record<string, string> = {
  architecture: "RESIDENCE",
  interiors:    "INTERIOR",
  renovation:   "RENOVATION",
  advisory:     "ADVISORY",
};

/* Derive editorial category label from href */
function getCardCategory(href: string): string {
  if (href === "/")        return "INTRO";
  if (href === "/studio")  return "STUDIO";
  if (href === "/contact") return "CONTACT";
  if (href.startsWith("/services/")) {
    const slug = href.slice("/services/".length);
    return serviceCardLabels[slug] ?? "SERVICE";
  }
  if (href.startsWith("/services")) return "SERVICE";
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
  priority = false,
}: {
  card: (typeof allCards)[number];
  isActive: boolean;
  isDragging: boolean;
  priority?: boolean;
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
            style={{ objectPosition: card.focal ?? "50% 50%" }}
            onError={() => setImageFailed(true)}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            /* Card art is already pre-optimized webp (watermark-cropped, q80,
               <160KB). Skip Next's on-the-fly optimizer: it re-fetches a
               variant on every carousel re-render, and the dev optimizer
               can't keep up — neighbours flash to the dark fallback. Serving
               the static file directly is instant, cache-stable, flicker-free. */
            unoptimized
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
        style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.85)" }}
      />

      {/* Radial top glow */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 60%)`,
        }}
      />

      {/* Ambient center glow */}
      <motion.div
        animate={{ opacity: isActive ? 0.7 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(circle at 50% 55%, rgba(255,255,255,0.10) 0%, transparent 70%)`,
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
              ? "#ffffff"
              : hasImage
              ? "rgba(255,255,255,0.7)"
              : "rgba(255,255,255,0.45)",
          }}
        >
          ↗
        </motion.span>
      </div>
    </Link>
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

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */

export function SiteExperience() {
  useLenisScroll();

  const reduceMotion = useReducedMotion();
  /* Intro brand sequence — types "KATHA STUDIO" then settles into the
     header to reveal the page. Plays once per full load (introHasPlayed).
     `introComplete` gates the hero + carousel enter animations. */
  const [introComplete, setIntroComplete] = useState(introHasPlayed);

  const handleIntroSettled = useCallback(() => {
    introHasPlayed = true;
    setIntroComplete(true);
  }, []);

  /* Safety guard — never let the page stay hidden behind the intro.
     framer-motion tweens pause when the tab is backgrounded (rAF stops),
     so a fallback timeout and a visibility listener guarantee the intro
     resolves even if the settle animation never fires. */
  useEffect(() => {
    if (introComplete) return;
    const fallback = window.setTimeout(() => {
      introHasPlayed = true;
      setIntroComplete(true);
    }, 5000);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        introHasPlayed = true;
        setIntroComplete(true);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(fallback);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [introComplete]);

  /* Lock scroll while the intro is on screen */
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [introComplete]);

  const [activeIndex, setActiveIndex] = useState(Math.floor(allCards.length / 2));
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
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

  /* After the bloom entrance settles, glide focus to the ABOUT card so
   * the carousel's "story" starts at the beginning before auto-play
   * advances through it line by line. */
  useEffect(() => {
    if (!introComplete || reduceMotion) return;
    const middleIdx = Math.floor(allCards.length / 2);
    const maxWave = Math.max(middleIdx, allCards.length - 1 - middleIdx);
    /* Last card enters at 0.3 + maxWave*0.45 + 0.82 duration. */
    const entranceMs = (0.3 + maxWave * 0.45 + 0.82) * 1000;
    const t = setTimeout(() => {
      setActiveIndex(0);
      if (isMobile) {
        snapMobileTo(0);
      } else {
        scrollToIndex(0);
      }
    }, entranceMs + 300);
    return () => clearTimeout(t);
  }, [introComplete, reduceMotion, isMobile, scrollToIndex, snapMobileTo]);

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
      <main className="relative flex min-h-[100svh] flex-col pt-[4.2rem]">

        {/* ── HERO SECTION ── */}
        <section
          className="relative overflow-hidden px-6 pt-1 pb-2 sm:px-8 sm:pt-2 sm:pb-2 md:px-12 md:pt-2 md:pb-3 lg:px-20 lg:pt-3 lg:pb-4"
        >
          <div className="relative z-[1] grid grid-cols-1 items-start gap-9 lg:grid-cols-12 lg:gap-12">

            {/* Headline */}
            <div className="lg:col-span-7 lg:pr-4">
              <motion.p
                initial={false}
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
                className="mb-4 font-[var(--font-avenir-book)] font-medium uppercase tracking-[0.24em] text-[var(--text-dim)]"
                style={{ fontSize: "var(--fs-caption)" }}
              >
                Architecture · Interiors · Renovation · Landscape
              </motion.p>
              <motion.h1
                initial={false}
                animate={
                  introComplete || reduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 28 }
                }
                transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="site-hero-title font-[var(--font-avenir-book)] font-light leading-[1.02] text-[var(--text)]"
                style={{
                  fontSize: "var(--fs-hero)",
                  letterSpacing: "-0.02em",
                  overflowWrap: "break-word",
                  textWrap: "balance",
                }}
              >
                Every space has a story,{" "}
                {/* Break only on larger screens; on mobile the line flows
                    naturally so "waiting" continues after "story". The space
                    sits before the break so desktop has no stray indent. */}
                <br className="hidden md:block" />
                waiting to be built.
              </motion.h1>

              {/* Cycling mystery phrase */}
              <motion.div
                initial={false}
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
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-[var(--font-avenir-book)] font-light text-[var(--text-muted)]"
                      style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.95rem)", letterSpacing: "-0.01em" }}
                    >
                      {mysteryPhrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Right: Subheading + positioning + CTA (PDF hero spec) */}
            <motion.div
              initial={false}
              animate={
                introComplete || reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{
                duration: 0.8,
                delay: reduceMotion ? 0 : 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-full lg:col-span-5 lg:max-w-[400px] lg:justify-self-end"
            >
              <p
                className="font-[var(--font-inter)]"
                style={{ fontSize: "var(--fs-body)", lineHeight: 1.85, color: "var(--text-muted)", letterSpacing: "-0.005em" }}
              >
                At Katha Studio, every project begins with listening. We take the
                time to understand people, place and purpose before shaping
                spaces that feel personal, timeless and deeply connected to the
                lives they support.
              </p>
              <p
                className="mt-5 font-[var(--font-inter)] uppercase"
                style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", lineHeight: 1.7, color: "var(--text-dim)" }}
              >
                Based in Bengaluru · Working Across India · Open to Select
                International Collaborations
              </p>
              <Link
                href="/contact"
                data-cursor="Enter"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                style={{
                  borderColor: "var(--border-medium)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.64rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "var(--text)",
                }}
              >
                Start a Conversation
                <span className="accent-arrow transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── CARD CAROUSEL / STACK ── */}
        <motion.section
          initial={false}
          animate={introComplete || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-7 flex flex-1 flex-col justify-center pb-5 md:mt-10 md:pb-6">
          {/* Ambient hairline sweep at top boundary */}
          <div className="relative mx-auto mb-3 h-px max-w-[88rem] opacity-70 md:mb-4">
            <div className="hairline-sweep" />
          </div>
          {isMobile ? (
            /* ── Mobile: Framer Motion Drag Wave Carousel ── */
            <motion.div
              initial={false}
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
                          initial={false}
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
                                    fontFamily: "var(--font-inter)",
                                    fontSize: "clamp(0.6rem, 2.4vw, 0.68rem)",
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.24em",
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
                            <NavCardContent card={card} isActive={isActive} isDragging={isDragging} priority={i < 2} />
                          </motion.div>

                          {/* Caption — label with a quiet tagline · index line
                              beneath. Left-aligned and tied to the text, so nothing
                              floats off to the card's far edge. */}
                          <motion.div
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 5 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-3"
                          >
                            <p style={{ fontFamily: "var(--font-avenir-book)", fontSize: "1.02rem", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.1 }}>
                              {card.label}
                            </p>
                            <p className="mt-1.5 flex items-center gap-2" style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)" }}>
                              <span className="min-w-0 truncate">{card.tagline}</span>
                              <span aria-hidden style={{ color: "var(--text-dim)" }}>·</span>
                              <span className="shrink-0" style={{ letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                                {String(i + 1).padStart(2, "0")} / {String(allCards.length).padStart(2, "0")}
                              </span>
                            </p>
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
                  const entranceDelay: number = reduceMotion
                    ? 0
                    : wave === 0
                    ? 0.3
                    : 0.3 + wave * 0.45;
                  const entranceDuration = wave === 0 ? 0.85 : 0.82;

                  /* Entrance cascade, gated on `introComplete` (same safe
                     pattern as the hero + mobile cards). `initial={false}` means
                     each card mounts at whatever `animate` resolves to on first
                     render: before the intro settles that's the hidden state, so
                     the cards bloom in one-by-one the moment the intro completes.
                     The intro is guaranteed to resolve (5s fallback + the
                     visibilitychange listener above), so cards can never stay
                     stuck invisible even if a background tab pauses rAF. */
                  const enterDir = i === activeIndex ? 0 : i > activeIndex ? 1 : -1;
                  const initialState = false;
                  const restState = {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    x: 0,
                    y: 0,
                  };
                  const hiddenState = {
                    opacity: 0,
                    scale: wave === 0 ? 0.92 : 0.86,
                    filter: "blur(8px)",
                    x: enterDir * 64,
                    y: 0,
                  };
                  const animateState =
                    introComplete || reduceMotion ? restState : hiddenState;

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
                      style={{ perspective: "900px", width: "clamp(220px, 23vw, 340px)" }}
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
                                fontFamily: "var(--font-inter)",
                                fontSize: "clamp(0.6rem, 0.72vw, 0.7rem)",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.24em",
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
                          scale: isActive ? 1 : 0.9,
                          y: isActive ? -6 : 0,
                          height: [324, 288, 254, 224, 200][Math.min(wave, 4)],
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
                          priority={i < 2}
                        />
                      </motion.div>

                      {/* Caption — label with a quiet tagline · index line beneath.
                          Left-aligned and tied to the text, so nothing floats off
                          to the card's far edge. */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-3"
                      >
                        <p style={{
                          fontFamily: "var(--font-avenir-book)",
                          fontSize: "clamp(0.92rem, 1.1vw, 1.05rem)",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          color: "var(--text)",
                          lineHeight: 1.1,
                        }}>
                          {card.label}
                        </p>
                        <p className="mt-1.5 flex items-center gap-2" style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.5rem, 0.6vw, 0.58rem)",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color: "var(--text-muted)",
                        }}>
                          <span className="min-w-0 truncate">{card.tagline}</span>
                          <span aria-hidden style={{ color: "var(--text-dim)" }}>·</span>
                          <span className="shrink-0" style={{ letterSpacing: "0.22em", color: "var(--text-dim)" }}>
                            {String(i + 1).padStart(2, "0")} / {String(allCards.length).padStart(2, "0")}
                          </span>
                        </p>
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

      {/* ── WHY KATHA (after the hero + carousel) ── */}
      <WhyKatha />

      {/* ── HOMEPAGE STORY (PDF sections 2–13) ── */}
      <HomeStory />

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[88rem] px-6 py-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-end">
            <p className="font-[var(--font-inter)] text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[var(--text-dim)] sm:text-[0.6rem]">
              &copy; {new Date().getFullYear()} Katha Studio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
