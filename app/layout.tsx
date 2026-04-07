import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-800.css";
// Editorial display — Bodoni Moda (luxury high-contrast serif for page titles)
import "@fontsource/bodoni-moda/latin-500.css";
import "@fontsource/bodoni-moda/latin-600.css";
import "@fontsource/bodoni-moda/latin-700.css";
import "@fontsource/bodoni-moda/latin-800.css";
import "@fontsource/bodoni-moda/latin-500-italic.css";
import "@fontsource/bodoni-moda/latin-600-italic.css";
// Editorial body — EB Garamond (timeless readable serif for descriptions)
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/eb-garamond/latin-600.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-500-italic.css";
import { CustomCursor } from "@/components/cursor";
import { PersistentNavbar } from "@/components/persistent-navbar";
import { PageTransitionOverlay } from "@/components/page-transition";
import { FloatingCTA } from "@/components/floating-cta";

export const metadata: Metadata = {
  title: "KATHA STUDIO - Architecture & Interior Design",
  description:
    "A premium architecture and interior design studio. Residential design, interiors, renovation, and consultation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <PageTransitionOverlay />
        <PersistentNavbar />
        <FloatingCTA />
        {children}
      </body>
    </html>
  );
}
