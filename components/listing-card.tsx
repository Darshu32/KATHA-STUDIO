"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { Tone } from "@/lib/data";

const toneMap: Record<Tone, { accent: string; darkBg: string }> = {
  warm: { accent: "#c8a882", darkBg: "#1c1409" },
  cool: { accent: "#8b9eb4", darkBg: "#0c1219" },
  default: { accent: "#a8b49c", darkBg: "#111610" },
};

type Rect = { top: number; left: number; width: number; height: number };

export function ListingCard({
  href,
  tone,
  topLabel,
  image,
  imageAlt,
  expandOnClick = false,
  children,
}: {
  href: string;
  tone: Tone;
  topLabel: string;
  image?: string;
  imageAlt?: string;
  /** When true & image is present, clicking plays a fullscreen image
   *  expand animation before navigating. Leave false for service/about
   *  cards where instant navigation is still correct. */
  expandOnClick?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [rect, setRect] = useState<Rect | null>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const { accent, darkBg } = toneMap[tone];
  const hasImage = !!image && !imageFailed;
  const canExpand = expandOnClick && hasImage;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!canExpand) return;
    /* Respect modifier keys — new tab, new window, save-as still work */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!imageBoxRef.current) return;
    e.preventDefault();
    const r = imageBoxRef.current.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    setExpanding(true);
    /* Navigate just before the bloom fully settles so the detail page
     * mounts underneath and the overlay can fade away onto the hero. */
    window.setTimeout(() => router.push(href), 720);
  };

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="block space-y-4"
        aria-label={imageAlt ?? topLabel}
      >
        {/* ── Dark image card ── */}
        <motion.div
          ref={imageBoxRef}
          animate={{
            y: hovered ? -10 : 0,
            opacity: expanding ? 0 : 1,
          }}
          transition={{
            y: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2, delay: expanding ? 0.05 : 0 },
          }}
          className="relative aspect-[4/3] w-full overflow-hidden"
          style={{ backgroundColor: darkBg }}
        >
          {/* Image (if provided and loaded) */}
          {hasImage && (
            <motion.div
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={image!}
                alt={imageAlt ?? topLabel}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                onError={() => setImageFailed(true)}
              />
              {/* Image darkening overlay on idle, clears on hover */}
              <motion.div
                animate={{ opacity: hovered ? 0.25 : 0.55 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 bg-black"
              />
            </motion.div>
          )}

          {/* Accent top line */}
          <motion.div
            animate={{
              scaleX: hovered ? 1 : 0.4,
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 right-0 z-[2] origin-center"
            style={{ height: "2px", backgroundColor: accent }}
          />

          {/* Radial top glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.45 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${accent}22 0%, transparent 62%)`,
            }}
          />

          {/* Ambient side glow */}
          <motion.div
            animate={{ opacity: hovered ? 0.8 : 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `radial-gradient(circle at 50% 55%, ${accent}18 0%, transparent 70%)`,
            }}
          />

          {/* Bottom vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
            }}
          />

          {/* Top row: label + arrow */}
          <div className="absolute top-0 left-0 right-0 z-[3] flex items-start justify-between p-5 md:p-6">
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.58rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.32em",
                color: hasImage ? "rgba(255,255,255,0.85)" : `${accent}88`,
              }}
            >
              {topLabel}
            </span>
            <motion.span
              animate={{
                x: hovered ? 4 : 0,
                y: hovered ? -4 : 0,
                scale: hovered ? 1.25 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "0.9rem",
                color: hovered ? accent : hasImage ? "rgba(255,255,255,0.75)" : `${accent}75`,
              }}
            >
              ↗
            </motion.span>
          </div>
        </motion.div>

        {/* Info below */}
        <motion.div
          animate={{ y: hovered ? -2 : 0, opacity: expanding ? 0 : 1 }}
          transition={{
            y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.22 },
          }}
        >
          {children}
        </motion.div>
      </Link>

      {/* ── Fullscreen expand overlay (portaled) ── */}
      {typeof window !== "undefined" && canExpand && (
        <FullscreenExpand
          active={expanding}
          rect={rect}
          image={image!}
          imageAlt={imageAlt ?? topLabel}
          accent={accent}
          darkBg={darkBg}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────── Fullscreen bloom overlay ──────────────────
 * Clones the card image into a fixed-position motion.div that
 * animates from the card's DOMRect out to fill the viewport.
 * ────────────────────────────────────────────────────────────── */

function FullscreenExpand({
  active,
  rect,
  image,
  imageAlt,
  accent,
  darkBg,
}: {
  active: boolean;
  rect: Rect | null;
  image: string;
  imageAlt: string;
  accent: string;
  darkBg: string;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {active && rect && (
        <>
          {/* Backdrop that fades in underneath — masks the list behind */}
          <motion.div
            key="expand-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[95]"
            style={{ backgroundColor: darkBg }}
          />

          {/* The growing image tile */}
          <motion.div
            key="expand-tile"
            initial={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: 0,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }}
            transition={{
              duration: 0.72,
              ease: [0.85, 0, 0.15, 1],
            }}
            className="pointer-events-none fixed z-[96] overflow-hidden"
            style={{ backgroundColor: darkBg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full select-none object-cover"
              draggable={false}
            />

            {/* Slow parallax zoom-in on the image for a cinematic feel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, transparent 45%, ${accent}14 80%, rgba(0,0,0,0.28) 100%)`,
              }}
            />

            {/* Top accent hairline — echoes the card's detail */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 right-0 origin-left"
              style={{ height: "2px", backgroundColor: accent }}
            />

            {/* Bottom vignette for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
              }}
            />
          </motion.div>

          {/* Editorial label that flashes in during the bloom */}
          <motion.span
            key="expand-label"
            initial={{ opacity: 0, y: 8, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-[97] -translate-x-1/2 whitespace-nowrap"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.56rem",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.82)",
            }}
          >
            Entering · {imageAlt}
          </motion.span>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
