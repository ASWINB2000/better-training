import type { Metadata } from "next";
import BookingSection from "@/components/marketing/BookingSection";

export const metadata: Metadata = {
  title: "Book a class or session",
  description: "Book a first aid course or clinical skills workshop with Better Training in Brisbane.",
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const { service } = await searchParams;
  return (
    <BookingSection initialService={typeof service === "string" ? service : ""} />
  );
}
