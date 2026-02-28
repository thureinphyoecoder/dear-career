"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/feedback/ErrorState";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      actionLabel="Reload section"
      description="Something interrupted this page while loading jobs or rendering the interface. You can retry immediately or return to the homepage."
      onAction={reset}
      title="The page ran into an unexpected problem."
    />
  );
}
