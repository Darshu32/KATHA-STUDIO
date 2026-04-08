import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { DetailView } from "@/components/detail-view";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: `${service.title} — KATHA Studio`, description: service.desc };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const { prev, next } = getAdjacentNav(`/services/${slug}`);

  const fallbackBg =
    service.tone === "warm" ? "#eeeae6"
    : service.tone === "cool" ? "#e8eaec"
    : "#f3f3f3";

  const paragraphs = service.paragraphs ?? [service.desc];

  return (
    <DetailView
      title={service.title}
      paragraphs={paragraphs}
      image={service.image}
      imageAlt={service.title}
      fallbackBg={fallbackBg}
      prev={prev}
      next={next}
    />
  );
}
