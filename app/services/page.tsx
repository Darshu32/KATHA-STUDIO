import { services } from "@/lib/data";
import { SiteFooter, PageHeader } from "@/components/page-shell";
import { FadeUp } from "@/components/animations";
import { ListingCard } from "@/components/listing-card";

export const metadata = {
  title: "Services — KATHA Studio",
  description: "Architectural design, interiors, renovation, and consultation by KATHA Studio.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <main className="pt-[4.5rem]">
        <PageHeader index="03 — What We Offer" title="Services" />

        <div className="border-t border-[var(--border)]">
          <div className="mx-auto max-w-[88rem] px-5 md:px-12 lg:px-20">
            <div className="grid gap-x-6 gap-y-14 py-14 sm:grid-cols-2 md:gap-x-10 md:gap-y-16 md:py-20 lg:gap-x-12 lg:gap-y-20 lg:py-20">
              {services.map((service, i) => (
                <FadeUp key={service.slug} delay={i * 0.1}>
                  <ListingCard
                    href={`/services/${service.slug}`}
                    tone={service.tone}
                    topLabel={`Service ${service.id}`}
                    image={service.image}
                    imageAlt={service.title}
                  >
                    <div className="space-y-2">
                      <p
                        style={{
                          fontFamily: "var(--font-avenir-heavy)",
                          fontSize: "clamp(0.95rem,1.5vw,1.05rem)",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.02em",
                          color: "var(--text)",
                        }}
                      >
                        {service.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.58rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color: "var(--text-dim)",
                        }}
                      >
                        {service.category}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.78rem,1.1vw,0.9rem)",
                          lineHeight: 1.8,
                          color: "var(--text-muted)",
                        }}
                      >
                        {service.desc}
                      </p>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.62rem",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.22em",
                          color: "var(--text)",
                          borderBottom: "1px solid var(--border-medium)",
                          paddingBottom: "2px",
                          display: "inline-block",
                        }}
                      >
                        Read More &rarr;
                      </span>
                    </div>
                  </ListingCard>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
