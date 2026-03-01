import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const englishFont = DM_Sans({
  variable: "--font-english",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const myanmarFont = Noto_Sans_Myanmar({
  variable: "--font-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dear Career",
  description: "Curated trusted-source jobs for Myanmar professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="my">
      <body className={`${englishFont.variable} ${displayFont.variable} ${myanmarFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
