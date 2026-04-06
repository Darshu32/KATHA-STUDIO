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

        <div className="border-t border-[rgba(17,17,17,0.1)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-12 py-14 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-24 lg:py-28">
              {/* Left */}
              <FadeUp delay={0} className="space-y-7">
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem,3.8vw,3.4rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#111" }}>
                  Begin with a clear architectural conversation.
                </h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.85rem,1.3vw,1.05rem)", lineHeight: 1.9, color: "var(--text-muted)" }}>
                  Share the site, scope, and intent. We will return with a focused
                  first consultation and the strongest next step.
                </p>
                <Link
                  href="mailto:hello@kathastudio.com?subject=Consultation%20Request"
                  className="inline-flex items-center justify-center border px-7 py-4 transition-all duration-300 hover:bg-[var(--text)] hover:text-[var(--background)]"
                  style={{ borderColor: "rgba(17,17,17,0.5)", fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.22em", color: "#111" }}
                >
                  Book Consultation
                </Link>
              </FadeUp>

              {/* Right — contact details */}
              <FadeUp delay={0.14} className="grid gap-8 border-t border-[rgba(17,17,17,0.1)] pt-10 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                {[
                  { label: "Email", value: "hello@kathastudio.com", href: "mailto:hello@kathastudio.com" },
                  { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { label: "Studio", value: "Ahmedabad, India", href: undefined },
                ].map(({ label, value, href }) => (
                  <div key={label} className="space-y-2">
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.26em", color: "rgba(17,17,17,0.28)" }}>
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
