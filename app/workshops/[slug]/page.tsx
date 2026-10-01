import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/site/DetailLayout";
import { getWorkshop, workshops } from "@/lib/content";

export function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/workshops/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  return workshop
    ? { title: `${workshop.title} Workshop`, description: workshop.summary }
    : {};
}

export default async function WorkshopPage({ params }: PageProps<"/workshops/[slug]">) {
  const { slug } = await params;
  const workshop = getWorkshop(slug);
  if (!workshop) notFound();

  return (
    <DetailLayout
      backHref="/workshops"
      backLabel="All workshops"
      title={`${workshop.title} Workshop`}
      intro={workshop.summary}
      image={workshop.image}
      price="Contact us for pricing"
      facts={[
        { label: "Duration", value: workshop.duration ?? "Confirmed when you book" },
        { label: "Group size", value: "Small groups" },
        { label: "Location", value: "Salisbury, or on your site on request" },
      ]}
      bookHref={`/book?service=${workshop.slug}`}
      outcomesTitle="What you will learn"
      outcomes={workshop.outcomes}
      sections={[
        { title: "Who it is for", body: <p>{workshop.audience}</p> },
        { title: "How it runs", body: <p>{workshop.format}</p> },
      ]}
    />
  );
}
