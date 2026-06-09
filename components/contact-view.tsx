"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

type NavItem = { href: string; label: string };

const contactDetails = [
  { label: "Email",  value: "neha@kathastudio.co", href: "mailto:neha@kathastudio.co" },
  { label: "Phone",  value: "+91 70195 98600",     href: "tel:+917019598600"          },
  { label: "Studio", value: "Bengaluru, India",    href: undefined                    },
  {
    label: "Portfolio",
    value: "Available on request — write to us",
    href: "mailto:neha@kathastudio.co?subject=Portfolio%20Request",
  },
];

export function ContactView({ prev, next }: { prev: NavItem | null; next: NavItem | null }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[100svh] flex-col bg-[var(--background)] text-[var(--text)] lg:h-[100svh] lg:min-h-0 lg:overflow-hidden">
      <main className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col px-5 pt-[5.2rem] pb-8 sm:px-8 md:px-12 md:pt-[5.6rem] md:pb-10 lg:px-20 lg:pt-[5.4rem] lg:pb-6">

        {/* META STRIP */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pb-3 md:pb-4 lg:pb-5"
        >
          <p style={{
            fontFamily: "var(--font-inter)",
            fontSize: "var(--fs-caption)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            color: "var(--text-dim)",
          }}>
            — Get in Touch
          </p>
        </motion.div>

        {/* HEADING */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-avenir-book)",
            fontSize: "var(--fs-page-title)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--text)",
          }}
        >
          Begin a<br />conversation
        </motion.h1>

        {/* Hairline beneath headline */}
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 h-px w-full origin-left bg-[var(--border-medium)] md:mt-7 lg:mt-8"
        />

        {/* SPLIT: FORM LEFT · DETAILS RIGHT */}
        <div className="grid flex-1 grid-cols-1 items-stretch gap-10 pt-6 md:grid-cols-[1.4fr_1fr] md:gap-14 md:pt-8 lg:gap-20 lg:pt-10">

          {/* Left — form */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col justify-between"
          >
            <ContactForm />
          </motion.div>

          {/* Right — direct contact details */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 md:border-l md:border-[var(--border-medium)] md:pl-10 lg:space-y-6 lg:pl-14"
          >
            {contactDetails.map(({ label, value, href }, i) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="space-y-1.5"
              >
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.56rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: "var(--text-dim)",
                }}>
                  {label}
                </p>
                {href ? (
                  <a href={href} className="block transition-opacity hover:opacity-60"
                    style={{
                      fontFamily: "var(--font-avenir-book)",
                      fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                      fontWeight: 500,
                      color: "var(--text)",
                    }}>
                    {value}
                  </a>
                ) : (
                  <p style={{
                    fontFamily: "var(--font-avenir-book)",
                    fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}>
                    {value}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* NAVIGATION */}
        <motion.nav
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6 md:pt-7"
        >
          {prev ? <NavKey nav={prev} dir="prev" /> : <span />}
          {next ? <NavKey nav={next} dir="next" /> : <span />}
        </motion.nav>
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
      <motion.span
        whileHover={{ x: isNext ? 6 : -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="inline-block text-[var(--text)]"
        style={{ fontSize: "1.05rem" }}
      >
        {isNext ? "→" : "←"}
      </motion.span>
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
