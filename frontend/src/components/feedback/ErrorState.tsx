"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  showBackLink?: boolean;
  title: string;
};

export function ErrorState({
  actionLabel = "Try again",
  description,
  onAction,
  showBackLink = true,
  title,
}: ErrorStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <section className="w-full max-w-3xl rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="rounded-[14px] border border-[color:var(--color-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(255,227,227,0.72))] p-6 sm:p-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-primary-soft)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
            <AlertTriangle className="size-4" />
            Dear Career
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[color:var(--color-text)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)] sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {onAction ? (
              <Button onClick={onAction} type="button">
                <RefreshCw className="size-4" />
                {actionLabel}
              </Button>
            ) : null}
            <Link
              className="inline-flex min-h-11 items-center gap-2 rounded-[12px] border border-[color:var(--color-border)] bg-[#fbfbf8] px-5 py-3 text-sm font-medium transition hover:bg-[color:var(--color-primary-soft)]"
              href="/"
            >
              <Home className="size-4" />
              Back to home
            </Link>
            {showBackLink ? (
              <Button
                onClick={() => window.history.back()}
                type="button"
                variant="ghost"
              >
                <ArrowLeft className="size-4" />
                Go back
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
