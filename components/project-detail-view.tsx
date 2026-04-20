"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import type { GalleryImage, Project } from "@/lib/data";

type NavItem = { href: string; label: string };

export function ProjectDetailView({
  project,
  paragraphs,
  fallbackBg,
  accent,
}: {
  project: Project;
  paragraphs: string[];
  /* prev/next kept in the signature so the slug page stays stable, but
   * intentionally unused in this single-screen layout. */
  prev?: NavItem | null;
  next?: NavItem | null;
  fallbackBg: string;
  accent: string;
}): ReactElement {
  const reduceMotion = useReducedMotion();

  const gallery: GalleryImage[] =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.image
      ? [{ src: project.image }]
      : [];

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const go = useCallback(
    (i: number) => {
      if (gallery.length === 0) return;
      const n = (i + gallery.length) % gallery.length;
      setActive(n);
    },
    [gallery.length]
  );

  /* Keyboard: ← / → cycle images (when lightbox is closed) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox !== null) return;
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, lightbox]);

  /* Touch swipe on the big image (mobile) */
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) go(active + 1);
      else go(active - 1);
    }
    touchStartX.current = null;
  };

  const activeImage = gallery[active];

  return (
    <div
      className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[var(--background)] text-[var(--text)]"
      style={{ paddingTop: "4.2rem" }}
    >
      {/* ── MAIN STAGE ── */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* LEFT — active image */}
        <div
          className="relative min-h-0 flex-1 overflow-hidden md:flex-[1.5]"
          style={{ backgroundColor: fallbackBg }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            {activeImage && (
              <motion.button
                key={activeImage.src}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightbox(active)}
                className="absolute inset-0 block cursor-zoom-in"
                aria-label="Open image fullscreen"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt ?? activeImage.caption ?? project.title}
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
                {/* subtle bottom vignette so caption reads cleanly */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 35%)",
                  }}
                />
                {/* accent hairline top */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0"
                  style={{ height: "2px", backgroundColor: accent, opacity: 0.7 }}
                />
                {/* expand glyph */}
                <span
                  aria-hidden
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center border border-white/30 bg-black/25 text-white backdrop-blur-sm"
                  style={{ fontSize: "0.72rem" }}
                >
                  ⤢
                </span>
                {/* caption + counter bottom-left */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <span
                    style={{
                      fontFamily: "var(--font-avenir-heavy)",
                      fontSize: "clamp(0.82rem, 1.1vw, 1rem)",
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1,
                    }}
                  >
                    {activeImage.caption ?? ""}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.52rem",
                      fontWeight: 600,
                      letterSpacing: "0.3em",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Desktop side-arrows */}
          <button
            aria-label="Previous image"
            onClick={() => go(active - 1)}
            className="absolute left-3 top-1/2 z-[3] hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:flex"
          >
            ←
          </button>
          <button
            aria-label="Next image"
            onClick={() => go(active + 1)}
            className="absolute right-3 top-1/2 z-[3] hidden h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:flex"
          >
            →
          </button>
        </div>

        {/* RIGHT — title + content */}
        <aside
          className="relative flex min-h-0 flex-col justify-between gap-6 overflow-hidden px-5 py-6 sm:px-8 md:max-w-[30rem] md:basis-[30rem] md:px-10 md:py-10 lg:max-w-[34rem] lg:basis-[34rem] lg:px-12"
        >
          <div className="min-h-0 flex-1 overflow-hidden">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.54rem",
                fontWeight: 600,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              <span
                aria-hidden
                className="inline-block"
                style={{ width: "18px", height: "2px", backgroundColor: accent }}
              />
              KATHA Studio
            </motion.p>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[14ch]"
              style={{
                fontFamily: "var(--font-avenir-heavy)",
                fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 0.98,
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "var(--text)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {project.title}
            </motion.h1>

            <div className="mt-5 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "calc(100% - 8rem)" }}>
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.28 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.85rem, 0.92vw, 0.95rem)",
                    lineHeight: 1.75,
                    color: "var(--text-muted)",
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── BOTTOM THUMB STRIP ── */}
      <div
        className="relative shrink-0 border-t border-[var(--border)]"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="scrollbar-thin flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 md:gap-3 md:px-10 md:py-4 lg:px-12">
          {gallery.map((img, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={img.src}
                onClick={() => go(i)}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group relative shrink-0 overflow-hidden"
                style={{
                  width: "clamp(68px, 9vw, 120px)",
                  aspectRatio: "16 / 10",
                  backgroundColor: fallbackBg,
                  outline: isActive ? `2px solid ${accent}` : "2px solid transparent",
                  outlineOffset: "2px",
                  transition: "outline-color 0.3s ease",
                }}
                aria-label={`Show image ${i + 1}${img.caption ? ": " + img.caption : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt ?? img.caption ?? ""}
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
                {/* Dim inactive thumbs */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 0.35 }}
                />
                {/* Tiny index badge */}
                <span
                  aria-hidden
                  className="absolute bottom-1 left-1.5"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.46rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <Lightbox
        images={gallery}
        activeIdx={lightbox}
        onClose={() => setLightbox(null)}
        onChange={setLightbox}
        projectTitle={project.title}
      />
    </div>
  );
}

/* ─────────────────────────── LIGHTBOX ──────────────────────────── */

function Lightbox({
  images,
  activeIdx,
  onClose,
  onChange,
  projectTitle,
}: {
  images: GalleryImage[];
  activeIdx: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
  projectTitle: string;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((activeIdx + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((activeIdx - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, images.length, onClose, onChange]);

  return (
    <AnimatePresence>
      {activeIdx !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/94"
          onClick={onClose}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 60) {
              if (dx < 0) onChange((activeIdx + 1) % images.length);
              else onChange((activeIdx - 1 + images.length) % images.length);
            }
            touchStartX.current = null;
          }}
        >
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 z-[2] flex items-center justify-between px-5 py-5 sm:px-8 md:px-12"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              {projectTitle}
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.56rem",
                fontWeight: 600,
                letterSpacing: "0.32em",
              }}
            >
              {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <button
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="pointer-events-auto absolute top-4 right-4 z-[3] flex h-10 w-10 items-center justify-center text-white/80 transition-opacity hover:opacity-100"
            style={{ fontSize: "1.4rem" }}
          >
            ×
          </button>

          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onChange((activeIdx - 1 + images.length) % images.length);
            }}
            className="absolute left-3 top-1/2 z-[3] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/10 md:flex"
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onChange((activeIdx + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 z-[3] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/10 md:flex"
          >
            →
          </button>

          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[86svh] max-w-[92vw] md:max-h-[88svh] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIdx].src}
              alt={images[activeIdx].alt ?? images[activeIdx].caption ?? ""}
              className="max-h-[86svh] max-w-[92vw] object-contain md:max-h-[88svh] md:max-w-[80vw]"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
