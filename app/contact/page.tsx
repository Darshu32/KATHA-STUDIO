import Link from "next/link";
import { SiteFooter, PageHeader } from "@/components/page-shell";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: "Contact — KATHA Studio",
  description: "Begin with a clear architectural conversation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="04 — Get In Touch" title="Contact" />

        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-12 py-14 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-24 lg:py-28">
              {/* Left */}
              <FadeUp delay={0} className="space-y-7">
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4.2vw,3.8rem)", fontWeight: 600, fontStyle: "italic", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--text)" }}>
                  Begin with a clear architectural conversation.
                </h2>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem,1.35vw,1.22rem)", lineHeight: 1.65, color: "var(--text-muted)" }}>
                  Share the site, scope, and intent. We will return with a focused
                  first consultation and the strongest next step.
                </p>
                <Link
                  href="mailto:hello@kathastudio.com?subject=Consultation%20Request"
                  className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                  style={{ borderColor: "var(--border-medium)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "var(--text)" }}
                >
                  Book Consultation
                </Link>
              </FadeUp>

              {/* Right — contact details */}
              <FadeUp delay={0.14} className="grid gap-8 border-t border-[var(--border)] pt-10 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                {[
                  { label: "Email", value: "hello@kathastudio.com", href: "mailto:hello@kathastudio.com" },
                  { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { label: "Studio", value: "Ahmedabad, India", href: undefined },
                ].map(({ label, value, href }) => (
                  <div key={label} className="space-y-2">
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "var(--text-dim)" }}>
                      {label}
                    </p>
                    {href ? (
                      <a href={href} style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.78rem,1.1vw,0.92rem)", color: "var(--text-muted)" }} className="block transition-opacity hover:opacity-55">
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.78rem,1.1vw,0.92rem)", color: "var(--text-muted)" }}>{value}</p>
                    )}
                  </div>
                ))}
              </FadeUp>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
