import Link from "next/link";
import { ExternalLink, Flag, MapPin, ShieldCheck } from "lucide-react";
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
    <div className="space-y-6">
      <Link className={buttonStyles({ variant: "ghost" })} href={createPageHref("/jobs", { lang: language })}>
          {dictionary.common.back}
      </Link>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {job.category ? <Badge tone={job.category === "ngo" ? "ngo" : job.category === "blue-collar" ? "blue-collar" : "white-collar"}>{job.category}</Badge> : null}
            <TrustBadge
              domain={getDisplayDomain(job)}
              label={dictionary.common.trustedSource}
              note={trustedSource?.note ?? dictionary.detail.trustBody}
            />
          </div>

          <div>
            <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[color:var(--color-text)] sm:text-[40px]">
              {job.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[color:var(--color-muted)]">
              {job.company ? <span>{job.company}</span> : null}
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
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-6">
          <Card className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
                Description
              </h2>
              <div className="inline-flex rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-1">
                <Link
                  className={`rounded-full px-3 py-2 text-sm font-medium ${language === "mm" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)]"}`}
                  href={createPageHref(`/jobs/${job.id}`, { lang: "mm" })}
                >
                  MM
                </Link>
                <Link
                  className={`rounded-full px-3 py-2 text-sm font-medium ${language === "en" ? "bg-[color:var(--color-primary)] text-white" : "text-[color:var(--color-muted)]"}`}
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

            <div className="prose prose-sm mt-5 max-w-none whitespace-pre-line text-[15px] leading-8 text-[color:var(--color-text)]">
              {description.body || "Description not available yet."}
            </div>
          </Card>

          <Card className="p-6">
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
          </Card>
        </section>

        <aside className="space-y-6">
          <ApplyCTA job={job} language={language} />

          <Card className="p-6">
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
