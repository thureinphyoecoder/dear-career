import Link from "next/link";
import { Building2, ExternalLink, Flag, MapPin, ShieldCheck } from "lucide-react";
import { ApplyCTA } from "@/components/jobs/ApplyCTA";
import { TrustBadge } from "@/components/jobs/TrustBadge";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  createPageHref,
  fetchPublicJob,
  formatRelativeDate,
  getDisplayDomain,
  getLocalizedDescription,
  getTrustedSourceBySlug,
  parseLanguage,
} from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function JobDetailPage({ params, searchParams }: PageProps) {
  const routeParams = await params;
  const resolvedSearchParams = (await searchParams) ?? {};
  const language = parseLanguage(resolvedSearchParams);
  const dictionary = getDictionary(language);
  const job = await fetchPublicJob(routeParams.id);

  if (!job) {
    notFound();
  }

  const trustedSource = getTrustedSourceBySlug(job.source_slug);
  const description = getLocalizedDescription(job, language);

  return (
    <div className="space-y-8">
      <Link className={buttonStyles({ variant: "ghost" })} href={createPageHref("/jobs", { lang: language })}>
        {dictionary.common.back}
      </Link>

      <header className="space-y-5 border-b border-[color:var(--color-border)] pb-6">
        <div className="flex flex-wrap gap-2">
          {job.category ? <Badge tone={job.category === "ngo" ? "ngo" : job.category === "blue-collar" ? "blue-collar" : "white-collar"}>{job.category}</Badge> : null}
          <TrustBadge
            domain={getDisplayDomain(job)}
            label={dictionary.common.trustedSource}
            note={trustedSource?.note ?? dictionary.detail.trustBody}
          />
        </div>

        <div>
          <h1 className="max-w-4xl text-[34px] font-semibold leading-[1.02] tracking-[-0.06em] text-[color:var(--color-text)] sm:text-[52px]">
            {job.title}
          </h1>
          <div className="mt-5 grid gap-3 text-sm text-[color:var(--color-muted)] sm:grid-cols-2 xl:grid-cols-4">
            {job.company ? <span className="inline-flex items-center gap-1.5"><Building2 className="size-4" />{job.company}</span> : null}
            {job.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {job.location}
              </span>
            ) : null}
            <span>{formatRelativeDate(job.published_at, language)}</span>
            {job.employment_type ? <span>{job.employment_type}</span> : null}
            {job.work_mode ? <span>{job.work_mode}</span> : null}
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--color-text)]">
                Description
              </h2>
              <div className="inline-flex rounded-[10px] border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-1">
                <Link
                  className={`rounded-[8px] px-3 py-2 text-sm font-medium ${language === "mm" ? "bg-[color:var(--color-text)] text-white" : "text-[color:var(--color-muted)]"}`}
                  href={createPageHref(`/jobs/${job.id}`, { lang: "mm" })}
                >
                  MM
                </Link>
                <Link
                  className={`rounded-[8px] px-3 py-2 text-sm font-medium ${language === "en" ? "bg-[color:var(--color-text)] text-white" : "text-[color:var(--color-muted)]"}`}
                  href={createPageHref(`/jobs/${job.id}`, { lang: "en" })}
                >
                  EN
                </Link>
              </div>
            </div>

            {description.showingFallback ? (
              <Badge className="mt-4" tone="warning">
                {dictionary.common.mmMissing}
              </Badge>
            ) : null}

            <div className="whitespace-pre-line border-t border-[color:var(--color-border)] pt-5 text-[15px] leading-8 text-[color:var(--color-text)]">
              {description.body || "Description not available yet."}
            </div>
          </div>

          <div className="rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
              <ShieldCheck className="size-4 text-[color:var(--color-primary)]" />
              {dictionary.detail.trustTitle}
            </div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              {dictionary.detail.trustBody}
            </p>
            <div className="mt-4 rounded-[12px] bg-[color:var(--color-surface-muted)] p-4">
              <p className="text-sm font-medium text-[color:var(--color-text)]">
                {getDisplayDomain(job)}
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                {trustedSource?.note ?? "Curated list match"}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link className="text-sm font-semibold text-[color:var(--color-primary)]" href={createPageHref("/about#trust", { lang: language })}>
                {dictionary.detail.trustPolicy}
              </Link>
              <Link className="inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--color-muted)]" href={createPageHref(`/report?jobId=${job.id}`, { lang: language })}>
                <Flag className="size-4" />
                {dictionary.detail.reportLink}
              </Link>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <ApplyCTA job={job} language={language} />

          <Card className="border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
              <ExternalLink className="size-4 text-[color:var(--color-primary)]" />
              Source
            </div>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">{job.source}</p>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">{getDisplayDomain(job)}</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
