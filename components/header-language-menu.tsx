"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { languages } from "@/lib/languages";
import { useLanguage } from "@/components/language-provider";

/* Header language switcher — a quiet globe icon that opens the same language
 * list offered at the intro door, so the visitor can change language from any
 * page. Sits in the header alongside the dark-mode and menu toggles. */
export function HeaderLanguageMenu() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click / Escape */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-[0.15rem] transition-opacity hover:opacity-60 lg:gap-[0.5rem]"
        style={{ color: "var(--text)" }}
      >
        {/* Base size 15 keeps the mobile/tablet header untouched; on desktop the
           glyph scales up to ~32px so it reads as large as the KATHA STUDIO wordmark. */}
        <Globe size={15} strokeWidth={1.5} aria-hidden className="lg:h-[2rem] lg:w-[2rem]" />
        <span
          className="text-[0.56rem] lg:text-[1.2rem]"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
          }}
        >
          {language.code}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            /* data-lenis-prevent lets the list scroll natively rather than being
               captured by the page's Lenis smooth-scroll. */
            data-lenis-prevent
            className="absolute right-0 top-full z-[60] mt-3 max-h-[20rem] w-[15rem] overflow-y-auto overscroll-contain rounded-2xl border py-2"
            style={{
              borderColor: "var(--border-medium)",
              backgroundColor: "var(--background)",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {languages.map((l) => {
              const active = l.code === language.code;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setOpen(false);
                    }}
                    className="flex w-full items-baseline justify-between gap-3 px-5 py-2.5 text-left transition-opacity hover:opacity-100"
                    style={{
                      fontFamily: "var(--font-inter)",
                      opacity: active ? 1 : 0.62,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        letterSpacing: "0.02em",
                        color: "var(--text)",
                      }}
                    >
                      {l.native}
                    </span>
                    <span
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: "var(--text-dim)",
                      }}
                    >
                      {active ? "●" : l.english}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
