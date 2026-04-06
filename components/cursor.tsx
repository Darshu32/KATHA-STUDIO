"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let rx = -100, ry = -100, tx = -100, ty = -100;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full bg-[var(--text)] transition-colors duration-500" />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998] h-7 w-7 rounded-full border border-[var(--text)] opacity-35 transition-colors duration-500" />
    </>
  );
}
