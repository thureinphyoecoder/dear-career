"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

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
      <section className="w-full max-w-3xl rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-xl sm:p-8">
        <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[linear-gradient(145deg,rgba(255,246,232,0.96),rgba(242,242,242,0.92))] p-6 sm:p-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
            <AlertTriangle className="size-4" />
            Dear Career
          </div>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em] text-[color:var(--foreground)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:rgba(36,49,40,0.76)] sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {onAction ? (
              <button
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium text-[color:var(--background)] transition hover:bg-[color:var(--sage-deep)]"
                onClick={onAction}
                type="button"
              >
                <RefreshCw className="size-4" />
                {actionLabel}
              </button>
            ) : null}
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-white/70 px-5 py-3 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
              href="/"
            >
              <Home className="size-4" />
              Back to home
            </Link>
            {showBackLink ? (
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-sm font-medium transition hover:bg-white/60"
                onClick={() => window.history.back()}
                type="button"
              >
                <ArrowLeft className="size-4" />
                Go back
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
