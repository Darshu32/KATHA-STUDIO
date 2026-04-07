import { SiteFooter, PageHeader } from "@/components/page-shell";
import { FadeUp } from "@/components/animations";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact — KATHA Studio",
  description: "Begin with a clear architectural conversation.",
};

const contactDetails = [
  {
    label: "Email",
    value: "hello@kathastudio.com",
    href: "mailto:hello@kathastudio.com",
  },
  {
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    label: "Studio",
    value: "Ahmedabad, India",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="04 — Get In Touch" title="Contact" />

        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-10 py-8 md:gap-14 md:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-14">
              {/* Left — form */}
              <FadeUp delay={0} className="space-y-6">
                <div className="space-y-3">
                  <h2
                    style={{
                      fontFamily: "var(--font-avenir-heavy)",
                      fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
                      fontWeight: 800,
                      lineHeight: 1.08,
                      letterSpacing: "0.01em",
                      color: "var(--text)",
                      textTransform: "uppercase",
                    }}
                  >
                    Begin a conversation
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-avenir-book)",
                      fontSize: "clamp(0.82rem,1.05vw,0.95rem)",
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                    }}
                  >
                    Share the site, scope, and intent. We will return with a
                    focused first consultation and the strongest next step —
                    usually within two working days.
                  </p>
                </div>

                <ContactForm />
              </FadeUp>

              {/* Right — contact details */}
              <FadeUp
                delay={0.14}
                className="space-y-8 border-t border-[var(--border)] pt-10 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0"
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.58rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.28em",
                      color: "var(--text-dim)",
                    }}
                    className="mb-4"
                  >
                    Or reach us directly
                  </p>
                  <div className="space-y-5">
                    {contactDetails.map(({ label, value, href }) => (
                      <div key={label} className="space-y-1">
                        <p
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.56rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.26em",
                            color: "var(--text-dim)",
                          }}
                        >
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            data-cursor="Contact"
                            style={{
                              fontFamily: "var(--font-avenir-book)",
                              fontSize: "clamp(0.88rem,1.15vw,1rem)",
                              color: "var(--text)",
                            }}
                            className="block border-b border-transparent transition-[opacity,border-color] duration-300 hover:border-[var(--border-medium)] hover:opacity-70"
                          >
                            {value}
                          </a>
                        ) : (
                          <p
                            style={{
                              fontFamily: "var(--font-avenir-book)",
                              fontSize: "clamp(0.88rem,1.15vw,1rem)",
                              color: "var(--text)",
                            }}
                          >
                            {value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--border)] pt-6">
                  <p
                    style={{
                      fontFamily: "var(--font-avenir-book)",
                      fontSize: "clamp(0.72rem,0.95vw,0.82rem)",
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                      fontStyle: "italic",
                    }}
                  >
                    Prefer a slower read? Send a note any time — we answer
                    every enquiry by hand, not by template.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
