import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/playfair-display/latin-400-italic.css";
import "@fontsource/playfair-display/latin-500-italic.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-800.css";
import { PersistentNavbar } from "@/components/persistent-navbar";
import { PageTransitionOverlay } from "@/components/page-transition";
import { FloatingCTA } from "@/components/floating-cta";
import { ClickRipple } from "@/components/click-ripple";

export const metadata: Metadata = {
  title: "KATHA STUDIO - Architecture & Interior Design",
  description:
    "A premium architecture and interior design studio. Residential design, interiors, renovation, and consultation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClickRipple />
        <PageTransitionOverlay />
        <PersistentNavbar />
        <FloatingCTA />
        {children}
      </body>
    </html>
  );
}
