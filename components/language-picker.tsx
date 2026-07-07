"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { languages, type Language } from "@/lib/languages";

/* The "choose your language at the door" dropdown surfaced beneath the intro
 * wordmark. Custom-built (not a native <select>) so it carries the same
 * editorial weight as the rest of the site. */
export function LanguagePicker({
  value,
  onChange,
}: {
  value: Language;
  onChange: (code: string) => void;
}) {
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
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-w-[13rem] items-center justify-between gap-4 rounded-full border px-6 py-3 transition-colors duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
        style={{
          borderColor: "var(--border-medium)",
          fontFamily: "var(--font-inter)",
          color: "var(--text)",
        }}
      >
        <span style={{ fontSize: "0.82rem", letterSpacing: "0.04em" }}>
          {value.native}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "0.7rem", lineHeight: 1 }}
        >
          ⌄
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            /* data-lenis-prevent lets the wheel/touch scroll this list natively
               instead of being captured by the page's Lenis smooth-scroll —
               without it only the first few languages are reachable. */
            data-lenis-prevent
            className="absolute left-1/2 top-full z-[2] mt-2 max-h-[18rem] w-[16rem] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border py-2 backdrop-blur-md"
            style={{
              borderColor: "var(--border-medium)",
              backgroundColor: "var(--navbar-bg)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {languages.map((l) => {
              const active = l.code === value.code;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(l.code);
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
