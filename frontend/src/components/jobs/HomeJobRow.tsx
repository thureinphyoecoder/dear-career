import Link from "next/link";
import { ArrowUpRight, Building2, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { createPageHref, formatRelativeDate, getDisplayDomain, getPrimaryApplyUrl } from "@/lib/api";
import type { Job, Language } from "@/lib/types";
import { cn } from "@/lib/utils";

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

function getInitial(job: Job) {
  return job.company?.slice(0, 1).toUpperCase() ?? job.title.slice(0, 1).toUpperCase();
}

export function HomeJobRow({
  job,
  language,
  featured = false,
}: {
  job: Job;
  language: Language;
  featured?: boolean;
}) {
  const applyUrl = getPrimaryApplyUrl(job);

  return (
    <article
      className={cn(
        "relative grid gap-4 overflow-hidden rounded-[16px] border border-[color:var(--color-border)] bg-white p-6 transition hover:border-[color:rgba(160,183,164,0.5)] hover:shadow-[var(--shadow-soft)] hover:translate-y-[-1px] md:grid-cols-[52px_minmax(0,1fr)_auto]",
        featured && "bg-[linear-gradient(135deg,rgba(160,183,164,0.06),white)]",
      )}
    >
      {featured ? (
        <span className="absolute right-4 top-4 rounded-full bg-[color:var(--color-primary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
          Featured
        </span>
      ) : null}

      <div className="flex size-[52px] items-center justify-center rounded-[12px] bg-[color:var(--color-surface)] text-lg font-semibold text-[color:var(--color-text)]">
        {getInitial(job)}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {job.category ? <Badge tone={getCategoryTone(job.category)}>{job.category}</Badge> : null}
          {job.is_verified_source ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-primary-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--color-text)]">
              <ShieldCheck className="size-3.5" />
              {getDisplayDomain(job)}
            </span>
          ) : null}
        </div>

        <Link className="mt-3 block" href={createPageHref(`/jobs/${job.id}`, { lang: language })}>
          <h3 className="text-[15.5px] font-semibold leading-6 tracking-[-0.01em] text-[color:var(--color-text)]">
            {job.title}
          </h3>
        </Link>

        <div className="mt-1 flex flex-wrap gap-4 text-[13px] text-[color:var(--color-muted)]">
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
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {job.employment_type ? <Badge tone="default">{job.employment_type}</Badge> : null}
          {job.work_mode ? <Badge tone="default">{job.work_mode}</Badge> : null}
          {job.salary ? <Badge tone="default">{job.salary}</Badge> : null}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3 md:min-w-[160px] md:flex-col md:items-end md:justify-center">
        <div className="text-right">
          {job.salary ? (
            <div className="text-[15px] font-medium text-[color:var(--color-text)]">{job.salary}</div>
          ) : null}
          <div className="mt-1 text-[12px] text-[color:var(--color-soft)]">
            {formatRelativeDate(job.published_at, language)}
          </div>
        </div>
        {applyUrl ? (
          <a
            className={buttonStyles({ variant: "primary" })}
            href={applyUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {language === "mm" ? "လျှောက်မယ်" : "Apply"}
            <ArrowUpRight className="size-4" />
          </a>
        ) : (
          <span className="text-sm font-medium text-[color:var(--color-muted)]">Original link pending</span>
        )}
      </div>
    </article>
  );
}
