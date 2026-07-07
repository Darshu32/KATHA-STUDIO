"use client";

import { useLanguage } from "@/components/language-provider";

export function MarqueeStrip() {
  const { t } = useLanguage();
  const text = t.marquee.join("  ·  ") + "  ·  ";
  return (
    <div
      className="overflow-hidden border-y border-[var(--border)] py-[0.85rem]"
      aria-hidden="true"
    >
      <div style={{ display: "flex", width: "max-content", animation: "marquee 28s linear infinite" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              whiteSpace: "nowrap",
              paddingRight: "5rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.58rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: "var(--text-dim)",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
