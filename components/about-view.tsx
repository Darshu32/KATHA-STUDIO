"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations";

type NavItem = { href: string; label: string };

const VALUES = [
  { title: "Thoughtfulness", body: "We consider how a space will be lived in, long after the drawings are done." },
  { title: "Craftsmanship", body: "Details are resolved with care, because they shape the everyday experience." },
  { title: "Clarity", body: "We communicate openly, so decisions are understood and never rushed." },
  { title: "Context", body: "Every design answers to its site, its climate, and the life around it." },
  { title: "Longevity", body: "We build for spaces that stay relevant as lives continue to change." },
];

/* Shared type styles */
const eyebrow = {
  fontFamily: "var(--font-inter)",
  fontSize: "var(--fs-caption)",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.32em",
  color: "var(--text-dim)",
};
const sectionHeading = {
  fontFamily: "var(--font-avenir-book)",
  fontWeight: 300,
  fontSize: "var(--fs-section)",
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  color: "var(--text)",
};
const body = {
  fontFamily: "var(--font-inter)",
  fontSize: "clamp(1rem, 1.2vw, 1.18rem)",
  lineHeight: 1.85,
  color: "var(--text-muted)",
};

export function AboutView({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="mx-auto w-full max-w-[88rem] px-5 pt-[5.6rem] pb-16 sm:px-8 md:px-12 md:pt-[6rem] md:pb-24 lg:px-20">

        {/* ── INTRO / WHY KATHA ── */}
        <section className="pt-4 md:pt-8">
          <FadeUp>
            <p style={eyebrow}>— Why Katha</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-5 md:mt-7">
            <h1 style={{ ...sectionHeading, fontSize: "var(--fs-page-title)", lineHeight: 0.96 }}>
              Katha Means
              <br />
              Story
            </h1>
          </FadeUp>
          <FadeUp delay={0.16} className="mt-7 md:mt-9">
            <div className="h-px w-full bg-[var(--border-medium)]" />
          </FadeUp>
          <FadeUp delay={0.22} className="mt-8 max-w-[62ch] md:mt-10">
            <p style={body}>
              We chose the name because every project begins with people. Every
              family brings its own way of living. Every business carries its
              own aspirations. Every site presents its own opportunities. Our
              role is to understand what matters most and translate it into
              spaces that feel meaningful, functional and enduring.
            </p>
          </FadeUp>
        </section>

        {/* ── MEET NEHA ── */}
        <section className="mt-24 grid grid-cols-1 gap-10 md:mt-36 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16">
          {/* Portrait — circular, rendered in black & white. */}
          <FadeUp className="order-2 md:order-1">
            <div className="mx-auto w-full max-w-[20rem] md:mx-0">
              <div
                className="relative aspect-square w-full overflow-hidden rounded-full border border-[var(--border-medium)]"
                style={{ backgroundColor: "var(--background)" }}
              >
                <Image
                  src="/images/about/neha-birla.jpeg"
                  alt="Portrait of Ar. Neha Birla, Founder & Principal Architect of Katha Studio"
                  fill
                  sizes="(min-width: 768px) 20rem, 80vw"
                  className="object-cover object-top grayscale"
                  priority
                />
              </div>
            </div>
          </FadeUp>

          <div className="order-1 md:order-2">
            <FadeUp>
              <p style={eyebrow}>— Meet Neha</p>
            </FadeUp>
            <FadeUp delay={0.08} className="mt-5 md:mt-7">
              <h2 style={sectionHeading}>Meet Neha</h2>
            </FadeUp>
            <FadeUp delay={0.16} className="mt-7 max-w-[54ch] md:mt-9">
              <p style={body}>
                I founded Katha Studio with a simple belief: great design begins
                with understanding people. Over the years, I have learned that
                successful projects are shaped through curiosity, attention to
                detail and meaningful collaboration.
              </p>
            </FadeUp>
            <FadeUp delay={0.24} className="mt-7 flex flex-col gap-0.5">
              <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-0.01em", color: "var(--text)" }}>
                Ar. Neha Birla
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.24em", color: "var(--text-dim)" }}>
                Founder &amp; Principal Architect
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── OUR PERSPECTIVE ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>— Our Perspective</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[68ch] md:mt-8">
            <p style={{ ...body, fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", lineHeight: 1.7, color: "var(--text)" }}>
              We believe the most meaningful spaces emerge from understanding how
              people live. Our work is guided by context, natural light,
              thoughtful planning and attention to detail. We value clarity,
              craftsmanship and spaces that continue to feel relevant as lives
              evolve.
            </p>
          </FadeUp>
        </section>

        {/* ── WHAT WE VALUE ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>— What We Value</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-8 grid grid-cols-1 gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div key={v.title} className="flex h-full flex-col gap-3 bg-[var(--background)] px-1 py-8 lg:px-3">
                <h3 style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 500, fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)", letterSpacing: "-0.01em", color: "var(--text)", lineHeight: 1.2 }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </FadeUp>
        </section>

        {/* ── WHO WE WORK WITH ── */}
        <section className="mt-24 md:mt-36">
          <FadeUp>
            <p style={eyebrow}>— Who We Work With</p>
          </FadeUp>
          <FadeUp delay={0.08} className="mt-6 max-w-[62ch] md:mt-8">
            <p style={body}>
              We collaborate with homeowners, business owners and individuals who
              value thoughtful design, clear communication and long-term quality.
            </p>
          </FadeUp>
        </section>

        {/* ── PERSONAL NOTE ── */}
        <section className="mt-24 border-t border-[var(--border)] pt-14 md:mt-36 md:pt-20">
          <FadeUp className="max-w-[62ch]">
            <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 300, fontSize: "clamp(1.35rem, 2.2vw, 2rem)", lineHeight: 1.5, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Every project represents an important chapter in someone&apos;s
              life. It is a responsibility we value deeply. Thank you for
              considering Katha Studio as part of that journey.
            </p>
          </FadeUp>
          <FadeUp delay={0.12} className="mt-6">
            <p style={{ fontFamily: "var(--font-avenir-book)", fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em", color: "var(--text)" }}>
              — Neha Birla
            </p>
          </FadeUp>
        </section>

        {/* ── NAVIGATION ── */}
        <nav className="mt-20 flex flex-col gap-4 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:mt-28">
          {prev ? <NavKey nav={prev} dir="prev" /> : <span />}
          {next ? <NavKey nav={next} dir="next" /> : <span />}
        </nav>
      </main>
    </div>
  );
}

function NavKey({ nav, dir }: { nav: NavItem; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link
      href={nav.href}
      className={`group relative inline-flex min-w-0 items-center gap-3 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="inline-block text-[var(--text)] transition-transform duration-300 group-hover:translate-x-0" style={{ fontSize: "1.05rem" }}>
        {isNext ? "→" : "←"}
      </span>
      <span className="flex min-w-0 flex-col">
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.56rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          color: "var(--text-dim)",
        }}>
          {isNext ? "Next" : "Previous"}
        </span>
        <span
          className="truncate transition-opacity duration-300 group-hover:opacity-70"
          style={{
            fontFamily: "var(--font-avenir-book)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            lineHeight: 1.2,
            maxWidth: "60vw",
          }}
        >
          {nav.label}
        </span>
      </span>
    </Link>
  );
}
