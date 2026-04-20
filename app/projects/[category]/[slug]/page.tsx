import { notFound } from "next/navigation";
import { projects, getCategoryBySlug } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { DetailView } from "@/components/detail-view";
import { ProjectDetailView } from "@/components/project-detail-view";

export function generateStaticParams() {
  return projects.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const project = projects.find(
    (p) => p.category === category && p.slug === slug
  );
  if (!project) return {};
  return {
    title: `${project.title} — KATHA Studio`,
    description: project.philosophy,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const project = projects.find(
    (p) => p.category === category && p.slug === slug
  );
  if (!project) notFound();

  const { prev, next } = getAdjacentNav(`/projects/${category}/${slug}`);

  const fallbackBg =
    project.tone === "warm"
      ? "#1c1409"
      : project.tone === "cool"
      ? "#0c1219"
      : "#111610";
  const accent =
    project.tone === "warm"
      ? "#c8a882"
      : project.tone === "cool"
      ? "#8b9eb4"
      : "#a8b49c";

  /* Split philosophy on double line breaks or sentences for the editorial
   * layout. If there's no gallery, fall back to the simpler DetailView. */
  const paragraphs = project.philosophy
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);
  const safeParagraphs = paragraphs.length > 0 ? paragraphs : [project.philosophy];

  if (project.gallery && project.gallery.length > 0) {
    return (
      <ProjectDetailView
        project={project}
        paragraphs={safeParagraphs}
        prev={prev}
        next={next}
        fallbackBg={fallbackBg}
        accent={accent}
      />
    );
  }

  const lightFallbackBg =
    project.tone === "warm"
      ? "#eeeae6"
      : project.tone === "cool"
      ? "#e8eaec"
      : "#f3f3f3";

  return (
    <DetailView
      title={project.title}
      paragraphs={[project.philosophy]}
      image={project.image}
      imageAlt={project.title}
      fallbackBg={lightFallbackBg}
      prev={prev}
      next={next}
    />
  );
}
