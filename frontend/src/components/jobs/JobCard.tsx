import Link from "next/link";
import { ArrowUpRight, Building2, Clock3, MapPin } from "lucide-react";
import { TrustBadge } from "@/components/jobs/TrustBadge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n";
import {
  createPageHref,
  formatRelativeDate,
  getDisplayDomain,
  getPrimaryApplyUrl,
  getTrustedSourceBySlug,
} from "@/lib/api";
import type { Job, Language } from "@/lib/types";

function getCategoryTone(category: string | null) {
  if (category === "ngo") {
    return "ngo" as const;
  }

  if (category === "blue-collar") {
    return "blue-collar" as const;
  }

  if (category === "white-collar") {
    return "white-collar" as const;
  }

  return "muted" as const;
}

export function JobCard({
  job,
  language,
}: {
  job: Job;
  language: Language;
}) {
  const dictionary = getDictionary(language);
  const safeApplyUrl = getPrimaryApplyUrl(job);
  const trustedSource = getTrustedSourceBySlug(job.source_slug);
  const detailHref = createPageHref(`/jobs/${job.id}`, { lang: language });
  const metadata = [job.company, job.location].filter(Boolean);

  return (
    <Card className="h-full border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <div className="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] pb-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {job.category ? (
              <Badge tone={getCategoryTone(job.category)}>
                {job.category}
              </Badge>
            ) : null}
            {job.is_verified_source ? (
              <TrustBadge
                domain={getDisplayDomain(job)}
                label={dictionary.common.trustedSource}
                note={
                  trustedSource?.note ??
                  "Reviewed source domain. We keep the listing linked to its original source."
                }
              />
            ) : null}
          </div>
          <div>
            <Link href={detailHref} prefetch className="block">
              <h3 className="text-[19px] font-semibold leading-tight text-[color:var(--color-text)]">
                {job.title}
              </h3>
            </Link>
            {metadata.length > 0 ? (
              <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-muted)]">
                {job.company ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-4" />
                    {job.company}
                  </span>
                ) : null}
                {job.location ? (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {job.location}
                  </span>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>

        <span className="inline-flex rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-muted)]">
          <Clock3 className="size-3.5" />
          {formatRelativeDate(job.published_at, language)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.employment_type ? <Badge tone="default">{job.employment_type}</Badge> : null}
        {job.work_mode ? <Badge tone="default">{job.work_mode}</Badge> : null}
        {job.salary ? <Badge tone="default">{job.salary}</Badge> : null}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          className="inline-flex min-h-10 items-center rounded-[10px] bg-[color:var(--color-text)] px-4 text-sm font-semibold text-white transition hover:opacity-90"
          href={detailHref}
          prefetch
        >
          {dictionary.common.readMore}
        </Link>
        <a
          className={cn(
            "inline-flex min-h-10 items-center gap-2 rounded-[10px] border px-4 text-sm font-semibold transition",
            safeApplyUrl
              ? "border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text)] hover:bg-[color:var(--color-primary-soft)]"
              : "cursor-not-allowed border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] text-[color:var(--color-muted)]",
          )}
          href={safeApplyUrl ?? undefined}
          rel={safeApplyUrl ? "noopener noreferrer" : undefined}
          target={safeApplyUrl ? "_blank" : undefined}
        >
          {safeApplyUrl ? dictionary.common.apply : dictionary.common.noApplyMethod}
          {safeApplyUrl ? <ArrowUpRight className="size-4" /> : null}
        </a>
      </div>
    </Card>
  );
}
