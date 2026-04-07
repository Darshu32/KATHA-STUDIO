"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // No custom cursor on touch/mobile devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf: number;
    let rx = -100, ry = -100, tx = -100, ty = -100;

    const applyLabel = (label: string) => {
      const has = label.length > 0;
      if (dotRef.current)  dotRef.current.style.opacity  = has ? "0" : "1";
      if (ringRef.current) {
        ringRef.current.style.width           = has ? "5rem"        : "1.75rem";
        ringRef.current.style.height          = has ? "5rem"        : "1.75rem";
        ringRef.current.style.opacity         = has ? "1"           : "0.35";
        ringRef.current.style.backgroundColor = has ? "var(--text)" : "transparent";
        ringRef.current.style.borderColor     = has ? "transparent" : "var(--text)";
      }
      if (labelRef.current) {
        labelRef.current.textContent  = label;
        labelRef.current.style.opacity = has ? "1" : "0";
      }
    };

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-cursor]");
      applyLabel(el ? (el.getAttribute("data-cursor") ?? "") : "");
    };

    const tick = () => {
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform  = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[var(--text)]"
        style={{ width: "6px", height: "6px", transition: "opacity 0.2s ease" }}
      />
      {/* Ring — expands + fills when over [data-cursor] elements */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-[var(--text)]"
        style={{
          width: "1.75rem",
          height: "1.75rem",
          opacity: 0.35,
          transition:
            "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, background-color 0.25s ease, border-color 0.25s ease",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.48rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--background)",
            opacity: 0,
            transition: "opacity 0.2s ease",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}
