import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bettertrainingbrisbane.com.au"),
  title: {
    default: "Better Training | First Aid & Emergency Training, Brisbane",
    template: "%s | Better Training",
  },
  description:
    "Nationally recognised first aid, CPR and specialist care training in Brisbane, taught by healthcare professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${bricolage.variable}`}>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
