import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFE600",
};

export const metadata: Metadata = {
  title: "SQL GRIT | 300 Dirty Production & MAANG SQL Interview Challenges",
  description:
    "Forget toy databases with 5 rows. Master 300 real-world, multi-table SQL challenges with messy production data, missing values, duplicate keys, and MAANG interview problems across Basic, Intermediate, and Advanced.",
  keywords: [
    "SQL interview",
    "dirty SQL data",
    "MAANG SQL questions",
    "data analyst SQL practice",
    "advanced SQL",
    "window functions",
    "CTEs",
    "PostgreSQL",
  ],
  authors: [{ name: "SQL GRIT" }],
  openGraph: {
    title: "SQL GRIT | 300 Dirty Production & MAANG SQL Interview Challenges",
    description:
      "Solving 500 simple queries on a clean single-table tutorial database teaches you nothing. Practice real interview SQL on messy production schemas. 100% free.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL GRIT | Master Real Production SQL",
    description: "300 real interview questions on messy multi-table databases for Data Analysts & Data Scientists.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] text-[#000000] font-sans antialiased selection:bg-[#FFE600] selection:text-black">
        {children}
      </body>
    </html>
  );
}
