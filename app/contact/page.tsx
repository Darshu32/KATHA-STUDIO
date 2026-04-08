import { getAdjacentNav } from "@/lib/nav-order";
import { FadeUp } from "@/components/animations";
import { ContactForm } from "@/components/contact-form";
import { SideNav, MobileNav } from "@/components/side-nav";

export const metadata = {
  title: "Contact — KATHA Studio",
  description: "Begin with a clear architectural conversation.",
};

const contactDetails = [
  { label: "Email",  value: "hello@kathastudio.com", href: "mailto:hello@kathastudio.com" },
  { label: "Phone",  value: "+91 98765 43210",        href: "tel:+919876543210"           },
  { label: "Studio", value: "Ahmedabad, India",       href: undefined                     },
];

export default function ContactPage() {
  const { prev, next, index } = getAdjacentNav("/contact");

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">

      <SideNav prev={prev} next={next} />

      <main className="pt-[4.5rem]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 md:px-16">

          {/* ── SECTION LABEL + COUNTER ── */}
          <FadeUp delay={0} className="flex items-center justify-between pt-10 pb-6 md:pt-14">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.36em", color: "var(--text-dim)" }}>
              — Contact
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, letterSpacing: "0.18em", color: "var(--text-dim)" }}>
              {String(index + 1).padStart(2, "0")} / 09
            </p>
          </FadeUp>

          {/* ── TITLE ── */}
          <FadeUp delay={0.08} className="pb-10 md:pb-12">
            <h1 style={{
              fontFamily: "var(--font-avenir-heavy)",
              fontSize: "clamp(2.1rem, 7.5vw, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--text)",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}>
              Begin a<br />Conversation
            </h1>
            <p className="mt-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-muted)" }}>
              We respond within two working days
            </p>
          </FadeUp>

          {/* ── CONTACT FORM + DETAILS ── */}
          <FadeUp delay={0.14}>
            <div className="mb-6 h-px w-10" style={{ backgroundColor: "var(--border-medium)" }} />

            <div className="grid gap-10 md:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              {/* Form */}
              <div>
                <p className="mb-6" style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.88rem, 1.2vw, 1rem)", lineHeight: 1.85, color: "var(--text-muted)" }}>
                  Share the site, scope, and intent — we'll return with a focused first
                  consultation and the strongest next step.
                </p>
                <ContactForm />
              </div>

              {/* Details */}
              <div className="space-y-6 border-t border-[var(--border)] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "var(--text-dim)" }}>
                  Or reach us directly
                </p>
                <div className="space-y-5">
                  {contactDetails.map(({ label, value, href }) => (
                    <div key={label} className="space-y-1">
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.52rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="block transition-opacity hover:opacity-60"
                          style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(0.85rem, 1.1vw, 0.98rem)", color: "var(--text)" }}>
                          {value}
                        </a>
                      ) : (
                        <p style={{ fontFamily: "var(--font-avenir-book)", fontSize: "clamp(0.85rem, 1.1vw, 0.98rem)", color: "var(--text)" }}>
                          {value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <div className="pb-16 md:pb-24" />

          <MobileNav prev={prev} next={next} />
        </div>
      </main>
    </div>
  );
}
