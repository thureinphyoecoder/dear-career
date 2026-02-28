"use client";

import { useEffect } from "react";
import { Inter, Noto_Sans_Myanmar } from "next/font/google";
import { ErrorState } from "@/components/feedback/ErrorState";
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

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={`${englishFont.variable} ${myanmarFont.variable}`}>
        <ErrorState
          actionLabel="Restart view"
          description="A global application error interrupted the experience before the page could finish rendering."
          onAction={reset}
          showBackLink={false}
          title="Dear Career could not finish loading."
        />
      </body>
    </html>
  );
}
