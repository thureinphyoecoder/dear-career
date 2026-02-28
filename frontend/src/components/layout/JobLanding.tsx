import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, MapPin, ShieldCheck, WavesLadder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PublicSearchPanel } from "@/components/layout/PublicSearchPanel";
import { getSafeExternalUrl, formatJobDate } from "@/lib/api";
import type { JobsResult, JobFilters } from "@/lib/types";

type LandingModel = JobFilters &
  JobsResult & {
    activeFilters: number;
    featuredJobsCount: number;
  };

export function JobLanding({ model }: { model: LandingModel }) {
  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(145deg,rgba(255,246,232,0.96),rgba(242,242,242,0.9))] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-[color:var(--sage-deep)]">
            <Badge tone="soft">Dear Career</Badge>
            <span>Minimal job discovery</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Verified opportunities, arranged with calm.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:rgba(36,49,40,0.76)] sm:text-lg">
            Dear Career keeps the experience quiet and trustworthy: fewer
            distractions, cleaner listings, and a focused path from discovery to
            application.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <MetricCard
              icon={BriefcaseBusiness}
              label="Listings surfaced"
              value={String(model.total || model.featuredJobsCount)}
            />
            <MetricCard
              icon={WavesLadder}
              label="Filters active"
              value={String(model.activeFilters)}
            />
            <MetricCard
              emphasized
              icon={ShieldCheck}
              label="Source state"
              value={model.apiReady ? "Live" : "Offline"}
            />
          </div>
        </div>

        <div className="grid gap-6">
          <PublicSearchPanel
            filters={{
              q: model.q,
              category: model.category,
              mode: model.mode,
            }}
          />
          <Card className="rounded-[1.75rem] bg-[color:rgba(160,183,164,0.15)] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
              Explore
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/80 px-4 py-4 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                href="/submit"
              >
                Submit a role
              </Link>
              <Link
                className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/80 px-4 py-4 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                href="/admin/submissions"
              >
                Review admin queue
              </Link>
              <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
                Filters, submit flow, and admin routes now live under a cleaner
                `src/` app structure.
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[1.75rem] bg-white/72 p-6 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                <BriefcaseBusiness className="size-4" />
                Current openings
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
                Roles worth a closer look.
              </h2>
            </div>
            <p className="text-sm text-[color:rgba(36,49,40,0.66)]">
              {model.apiReady
                ? `${model.featuredJobsCount} roles visible now`
                : "Connect the API to start showing live roles"}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {model.jobs.length > 0 ? (
              model.jobs.slice(0, 6).map((job) => {
                const applyUrl = getSafeExternalUrl(job.apply_url);
                const metadata = [job.company, job.location].filter(Boolean).join(" • ");
                const tags = [job.category, job.employment_type, job.salary].filter(Boolean);

                return (
                  <article
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:rgba(242,242,242,0.72)] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]"
                    key={job.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
                          {job.source}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                          {job.title}
                        </h3>
                        <p className="mt-3 flex items-center gap-2 text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
                          <MapPin className="size-4 shrink-0 text-[color:var(--sage-deep)]" />
                          {metadata || "Location shared after opening"}
                        </p>
                      </div>
                      <div className="text-right text-sm text-[color:rgba(36,49,40,0.62)]">
                        <p>{formatJobDate(job.published_at)}</p>
                        <p className="mt-2 uppercase tracking-[0.16em]">
                          {job.work_mode || "Flexible"}
                        </p>
                      </div>
                    </div>
                    {tags.length > 0 ? (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                        href={`/read/${job.id}`}
                      >
                        Read details
                      </Link>
                      <a
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                        href={applyUrl ?? "#jobs"}
                        rel={applyUrl ? "noreferrer noopener" : undefined}
                        target={applyUrl ? "_blank" : undefined}
                      >
                        {applyUrl ? "Open application" : "Application details pending"}
                        {applyUrl ? <ArrowUpRight className="size-4" /> : null}
                      </a>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                  No matches yet
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                  The current filters did not return a role.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
                  Try broadening the search, or connect the jobs API so the
                  interface can render live openings from Laravel.
                </p>
              </div>
            )}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[1.75rem] bg-[color:rgba(255,246,232,0.92)] p-6 sm:p-7">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
              <ShieldCheck className="size-4" />
              Why it feels different
            </p>
            <div className="mt-6 space-y-5">
              {[
                "Minimal surfaces keep attention on job quality, not visual noise.",
                "Verified source ingestion reduces reposted scams and broken leads.",
                "Public and admin flows now live in predictable route groups.",
              ].map((item) => (
                <div
                  className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/80 p-4 text-sm leading-7 text-[color:rgba(36,49,40,0.8)]"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[1.75rem] bg-[color:rgba(160,183,164,0.18)] p-6 sm:p-7">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
              <ShieldCheck className="size-4" />
              Production notes
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Data source", model.apiReady ? "Live API connected" : "Waiting for API"],
                ["Read route", "Dedicated `/read/[id]` detail page"],
                ["Admin route", "Submissions and trusted sources separated"],
              ].map(([label, value]) => (
                <div
                  className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/78 p-4"
                  key={label}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
                    {label}
                  </p>
                  <p className="mt-3 text-lg leading-7">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

function MetricCard({
  emphasized = false,
  icon: Icon,
  label,
  value,
}: {
  emphasized?: boolean;
  icon: typeof BriefcaseBusiness;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`rounded-[1.4rem] border border-[color:var(--line)] p-4 ${
        emphasized ? "bg-[color:var(--surface-muted)]" : "bg-white/70"
      }`}
    >
      <Icon className="size-4 text-[color:var(--sage-deep)]" />
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}
