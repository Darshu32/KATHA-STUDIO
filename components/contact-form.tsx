"use client";

import { useEffect, useRef, useState, type FormEvent, type FocusEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "phone" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED = /^[+\d\s().\-]+$/;
const MIN_NAME = 2;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;

function validateField(name: FieldName, value: string): string {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Please share your name.";
      if (v.length < MIN_NAME) return `Name should be at least ${MIN_NAME} characters.`;
      return "";
    case "email":
      if (!v) return "Please share your email.";
      if (!EMAIL_RE.test(v)) return "That doesn't look like a valid email.";
      return "";
    case "phone":
      if (!v) return "Please share a phone number.";
      if (!PHONE_ALLOWED.test(v)) return "Use digits, spaces, dashes, dots or parentheses only.";
      {
        const digits = v.replace(/\D/g, "");
        if (digits.length < 8 || digits.length > 15) {
          return "Phone should be between 8 and 15 digits.";
        }
      }
      return "";
    case "message":
      if (!v) return "Please share a few words.";
      if (v.length < MIN_MESSAGE) return `Just a little more — at least ${MIN_MESSAGE} characters.`;
      if (v.length > MAX_MESSAGE) return `That's a bit long — please keep it under ${MAX_MESSAGE} characters.`;
      return "";
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLen, setMessageLen] = useState<number>(0);

  const formRef = useRef<HTMLFormElement>(null);

  /* Auto-return to idle 5s after a success or error so the user
     can submit again without the button looking frozen. */
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(t);
  }, [status]);

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.currentTarget.name as FieldName;
    const msg = validateField(name, e.currentTarget.value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  }

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.currentTarget.name as FieldName;
    /* Clear the field's error the moment they start fixing it — but
       don't re-validate on every keystroke; that's nagging. */
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (name === "message") {
      setMessageLen(e.currentTarget.value.length);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    /* Validate everything on submit and surface every issue at once. */
    const allErrors: FieldErrors = {
      name: validateField("name", payload.name) || undefined,
      email: validateField("email", payload.email) || undefined,
      phone: validateField("phone", payload.phone) || undefined,
      message: validateField("message", payload.message) || undefined,
    };
    const firstBadField = (["name", "email", "phone", "message"] as FieldName[])
      .find((k) => allErrors[k]);

    if (firstBadField) {
      setErrors(allErrors);
      setErrorMsg("Please check the highlighted fields.");
      setStatus("error");
      /* Move focus to the first invalid input so the user lands on it. */
      const node = form.elements.namedItem(firstBadField) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      node?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name.trim(),
          email: payload.email.trim(),
          phone: payload.phone.trim(),
          message: payload.message.trim(),
        }),
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
      setMessageLen(0);
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

  const inputBaseClass =
    "w-full border-b bg-transparent py-3 font-[var(--font-inter)] text-[var(--text)] outline-none transition-colors duration-300 placeholder:text-[var(--text-dim)] focus:border-[var(--text)]";
  const inputBaseStyle: React.CSSProperties = {
    fontSize: "clamp(0.85rem,1vw,0.95rem)",
  };
  const errorColor = "#c85a3c";

  function fieldBorderColor(name: FieldName) {
    return errors[name] ? errorColor : "var(--border-medium)";
  }

  function inlineError(name: FieldName) {
    if (!errors[name]) return null;
    return (
      <motion.span
        key={`err-${name}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        id={`${name}-error`}
        role="alert"
        className="block pt-1 font-[var(--font-inter)]"
        style={{ fontSize: "0.72rem", color: errorColor }}
      >
        {errors[name]}
      </motion.span>
    );
  }

  const messageOver = messageLen > MAX_MESSAGE;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-6" noValidate>
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
            onBlur={handleBlur}
            onInput={handleInput}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputBaseClass}
            style={{ ...inputBaseStyle, borderColor: fieldBorderColor("name") }}
          />
          <AnimatePresence>{inlineError("name")}</AnimatePresence>
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
            onBlur={handleBlur}
            onInput={handleInput}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputBaseClass}
            style={{ ...inputBaseStyle, borderColor: fieldBorderColor("email") }}
          />
          <AnimatePresence>{inlineError("email")}</AnimatePresence>
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
          placeholder="+91 98765 43210"
          disabled={status === "submitting"}
          onBlur={handleBlur}
          onInput={handleInput}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={inputBaseClass}
          style={{ ...inputBaseStyle, borderColor: fieldBorderColor("phone") }}
        />
        <AnimatePresence>{inlineError("phone")}</AnimatePresence>
      </label>

      {/* Message */}
      <label className="block space-y-2">
        <span className="flex items-baseline justify-between gap-3">
          <span style={fieldLabelStyle}>Message</span>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
              color: messageOver ? errorColor : "var(--text-dim)",
            }}
            aria-live="polite"
          >
            {messageLen}/{MAX_MESSAGE}
          </span>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us a little about your space, timeline, or the feeling you'd like to create…"
          disabled={status === "submitting"}
          onBlur={handleBlur}
          onInput={handleInput}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputBaseClass} resize-y`}
          style={{ ...inputBaseStyle, borderColor: fieldBorderColor("message") }}
        />
        <AnimatePresence>{inlineError("message")}</AnimatePresence>
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
                  color: errorColor,
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
