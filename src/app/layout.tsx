import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF9",
};

export const metadata: Metadata = {
  title: "SQL Office Simulator | Learn SQL by Working in a Real Company",
  description:
    "A free, learn-by-doing SQL platform where you practice by answering realistic business requests from executives across 7 industry domains and 5 career levels.",
  keywords: [
    "SQL simulator",
    "learn SQL",
    "SQL interview practice",
    "data analyst practice",
    "PostgreSQL",
    "interactive SQL",
  ],
  authors: [{ name: "SQL Office Simulator" }],
  openGraph: {
    title: "SQL Office Simulator | Learn SQL by Working in a Real Company",
    description:
      "Practice SQL on real business questions from colleagues, managers, and executives. 100% free forever.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Office Simulator",
    description: "Learn SQL by working in simulated companies across 7 industry domains.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[var(--surface)] text-[var(--ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
