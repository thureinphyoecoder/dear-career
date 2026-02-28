import type { HomeViewModel } from "@/components/home/types";
import { formatJobDate, getSafeExternalUrl } from "@/lib/jobs";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
} from "lucide-react";

type JobsSectionProps = {
  model: HomeViewModel;
};

export function JobsSection({ model }: JobsSectionProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/72 p-6 sm:p-7">
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
            model.jobs.slice(0, 6).map((job) => <JobCard job={job} key={job.id} />)
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <InsightSection />
        <OperationsSection apiReady={model.apiReady} />
      </div>
    </section>
  );
}

function JobCard({ job }: { job: JobsSectionProps["model"]["jobs"][number] }) {
  const applyUrl = getSafeExternalUrl(job.apply_url);
  const metadata = [job.company, job.location].filter(Boolean).join(" • ");
  const tags = [job.category, job.employment_type, job.salary].filter(Boolean);

  return (
    <article className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:rgba(242,242,242,0.72)] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]">
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
            <span
              className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1.5 text-xs uppercase tracking-[0.16em]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-5">
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
}

function EmptyState() {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
        No matches yet
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
        The current filters did not return a role.
      </h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
        Try broadening the search, or connect the jobs API so the interface can
        render live openings from Laravel.
      </p>
    </div>
  );
}

function InsightSection() {
  return (
    <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(255,246,232,0.92)] p-6 sm:p-7">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
        <ShieldCheck className="size-4" />
        Why it feels different
      </p>
      <div className="mt-6 space-y-5">
        {[
          "Minimal surfaces keep attention on job quality, not visual noise.",
          "Verified source ingestion reduces reposted scams and broken leads.",
          "Search, filters, and live API fallback are ready for daily use.",
        ].map((item) => (
          <div
            className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/80 p-4 text-sm leading-7 text-[color:rgba(36,49,40,0.8)]"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function OperationsSection({ apiReady }: { apiReady: boolean }) {
  return (
    <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(160,183,164,0.18)] p-6 sm:p-7">
      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
        <ShieldCheck className="size-4" />
        Production notes
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {[
          ["Data source", apiReady ? "Live API connected" : "Waiting for API"],
          ["Review model", "Trusted source allowlist"],
          ["Visual system", "Minimalist sage, cream, and soft gray"],
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
    </section>
  );
}
