import { notFound } from "next/navigation";
import { cultures } from "@/data/cultures";
import CultureDetailClient from "./CultureDetailClient";

export async function generateStaticParams() {
  return cultures.map((culture) => ({
    slug: culture.slug,
  }));
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const culture = cultures.find((c) => c.slug === slug);
  
  if (!culture) {
    notFound();
  }

  // Find up to 3 related cultures from same category or province
  const relatedCultures = cultures
    .filter((c) => c.id !== culture.id && (c.category === culture.category || c.province === culture.province))
    .slice(0, 3);

  // If we don't have 3 related cultures, fill with others to ensure the section looks good
  if (relatedCultures.length < 3) {
    const additional = cultures
      .filter((c) => c.id !== culture.id && !relatedCultures.find((r) => r.id === c.id))
      .slice(0, 3 - relatedCultures.length);
    relatedCultures.push(...additional);
  }

  return <CultureDetailClient culture={culture} relatedCultures={relatedCultures} />;
}
