import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { DetailView } from "@/components/detail-view";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — KATHA Studio`, description: project.philosophy };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentNav(`/projects/${slug}`);

  const fallbackBg =
    project.tone === "warm" ? "#eeeae6"
    : project.tone === "cool" ? "#e8eaec"
    : "#f3f3f3";

  return (
    <DetailView
      title={project.title}
      paragraphs={[project.philosophy]}
      image={project.image}
      imageAlt={project.title}
      fallbackBg={fallbackBg}
      prev={prev}
      next={next}
    />
  );
}
