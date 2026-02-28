import type { Metadata } from "next";
import { Instrument_Sans, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const englishFont = Instrument_Sans({
  variable: "--font-english",
  subsets: ["latin"],
});

const myanmarFont = Noto_Sans_Myanmar({
  variable: "--font-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dear Career | Verified jobs for Myanmar professionals",
  description:
    "Dear Career curates credible opportunities with a calmer, more trustworthy job search experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${englishFont.variable} ${myanmarFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
