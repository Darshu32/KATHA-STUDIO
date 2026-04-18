import { notFound } from "next/navigation";
import { projects, getCategoryBySlug } from "@/lib/data";
import { getAdjacentNav } from "@/lib/nav-order";
import { DetailView } from "@/components/detail-view";

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
      fallbackBg={fallbackBg}
      prev={prev}
      next={next}
    />
  );
}
