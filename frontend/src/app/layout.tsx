import type { Metadata } from "next";
import { Inter, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const englishFont = Inter({
  variable: "--font-english",
  subsets: ["latin"],
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
      <body className={`${englishFont.variable} ${myanmarFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
