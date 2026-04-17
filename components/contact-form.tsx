"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

/* E.164-ish phone validation.
   Accepts an optional leading "+", followed by digits, spaces, dashes,
   dots, or parentheses. After stripping separators we require between
   8 and 15 digits — the ITU E.164 range. */
function isValidPhone(raw: string): boolean {
  if (!/^[+\d\s().\-]+$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  /* Auto-return to idle 5s after a success or error so the user
     can submit again without the button looking frozen. */
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    // Client-side phone validation — fail fast before hitting the API.
    if (!isValidPhone(payload.phone)) {
      setPhoneError("Please enter a valid phone number (8–15 digits).");
      setErrorMsg("Please check the highlighted field.");
      setStatus("error");
      return;
    }
    setPhoneError("");

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body?.ok === false) {
        const msg = body?.error ?? `Request failed (${res.status}).`;
        console.error("[contact] submission failed", res.status, body);
        setErrorMsg(msg);
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("[contact] network error", err);
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const fieldLabelStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: "0.56rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: "var(--text-dim)",
  };

  const inputClass =
    "w-full border-b bg-transparent py-3 font-[var(--font-inter)] text-[var(--text)] outline-none transition-colors duration-300 placeholder:text-[var(--text-dim)] focus:border-[var(--text)]";
  const inputStyle: React.CSSProperties = {
    borderColor: "var(--border-medium)",
    fontSize: "clamp(0.85rem,1vw,0.95rem)",
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6" noValidate>
      {/* Name + Email row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2">
          <span style={fieldLabelStyle}>Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            disabled={status === "submitting"}
            className={inputClass}
            style={inputStyle}
          />
        </label>
        <label className="block space-y-2">
          <span style={fieldLabelStyle}>Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            disabled={status === "submitting"}
            className={inputClass}
            style={inputStyle}
          />
        </label>
      </div>

      {/* Phone */}
      <label className="block space-y-2">
        <span style={fieldLabelStyle}>Phone</span>
        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="[+\d\s().\-]{8,}"
          placeholder="+91 98765 43210"
          disabled={status === "submitting"}
          onInput={() => {
            if (phoneError) setPhoneError("");
          }}
          aria-invalid={phoneError ? true : undefined}
          className={inputClass}
          style={{
            ...inputStyle,
            borderColor: phoneError ? "#c85a3c" : inputStyle.borderColor,
          }}
        />
        {phoneError && (
          <span
            className="block pt-1 font-[var(--font-inter)]"
            style={{ fontSize: "0.72rem", color: "#c85a3c" }}
          >
            {phoneError}
          </span>
        )}
      </label>

      {/* Message */}
      <label className="block space-y-2">
        <span style={fieldLabelStyle}>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={2000}
          placeholder="Tell us a little about your space, timeline, or the feeling you'd like to create…"
          disabled={status === "submitting"}
          className={`${inputClass} resize-y`}
          style={inputStyle}
        />
      </label>

      {/* Submit + status */}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative inline-flex items-center justify-center overflow-hidden border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            borderColor: "var(--border-medium)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.68rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--text)",
          }}
        >
          <span className="relative z-[1] inline-flex items-center gap-2">
            {status === "submitting" ? (
              <>
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-current" />
                Sending
              </>
            ) : status === "success" ? (
              "Sent ✓"
            ) : (
              <>
                Send Enquiry
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </>
            )}
          </span>
        </button>

        {/* Status messages */}
        <div className="min-h-[1.5em] flex-1 sm:text-right">
          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-[var(--font-avenir-book)] italic"
                style={{
                  fontSize: "clamp(0.78rem,1vw,0.9rem)",
                  color: "var(--text-muted)",
                }}
              >
                — Thank you. We&apos;ll be in touch within two working days.
              </motion.p>
            )}
            {status === "error" && errorMsg && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="font-[var(--font-inter)]"
                style={{
                  fontSize: "clamp(0.72rem,0.95vw,0.85rem)",
                  color: "#c85a3c",
                }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
