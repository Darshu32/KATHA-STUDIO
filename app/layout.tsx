import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PersistentNavbar } from "@/components/persistent-navbar";
import { LanguageProvider } from "@/components/language-provider";

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
        <LanguageProvider>
          <PersistentNavbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
