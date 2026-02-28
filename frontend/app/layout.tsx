import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const bodyFont = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const displayFont = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
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
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
