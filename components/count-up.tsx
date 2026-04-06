"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      // ease-out curve
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(progress * to));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
