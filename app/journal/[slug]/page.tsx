import { notFound } from "next/navigation";
import { publishedNotes } from "@/lib/data";
import { JournalArticleView } from "@/components/journal-article-view";

export function generateStaticParams() {
  return publishedNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = publishedNotes.find((n) => n.slug === slug);
  if (!note) return {};
  return { title: `${note.title} — KATHA Studio Journal`, description: note.excerpt };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = publishedNotes.findIndex((n) => n.slug === slug);
  if (idx === -1) notFound();

  const note = publishedNotes[idx];
  const prev = publishedNotes[idx - 1] ?? null;
  const next = publishedNotes[idx + 1] ?? null;

  return (
    <JournalArticleView
      note={note}
      prev={prev ? { slug: prev.slug, title: prev.title } : null}
      next={next ? { slug: next.slug, title: next.title } : null}
    />
  );
}
