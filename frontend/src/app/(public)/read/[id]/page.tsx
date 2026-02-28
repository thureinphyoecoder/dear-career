import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchPublicJob, formatJobDate, getSafeExternalUrl } from "@/lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ReadJobPage({ params }: PageProps) {
  const { id } = await params;
  const job = await fetchPublicJob(id);

  if (!job) {
    return (
      <PublicShell>
        <Card className="rounded-[1.75rem] p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
            Read submission
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
            This submission could not be loaded.
          </h1>
          <Link
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
            href="/"
          >
            <ChevronLeft className="size-4" />
            Back to listings
          </Link>
        </Card>
      </PublicShell>
    );
  }

  const applyUrl = getSafeExternalUrl(job.apply_url);

  return (
    <PublicShell>
      <Card className="rounded-[1.75rem] p-6 sm:p-8">
        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--sage-deep)]"
          href="/"
        >
          <ChevronLeft className="size-4" />
          Back to listings
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
          {job.source}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl tracking-[-0.04em]">
          {job.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-[color:rgba(36,49,40,0.76)]">
          {[job.company, job.location].filter(Boolean).join(" • ") || "Company and location to be confirmed"}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {[job.category, job.employment_type, job.work_mode, job.salary]
            .filter(Boolean)
            .map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-5 text-sm leading-8 text-[color:rgba(36,49,40,0.82)]">
            {job.description_en || job.description_mm || "Detailed description will appear here once the API returns it."}
          </div>
          <div className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
              Published
            </p>
            <p className="mt-3 text-lg">{formatJobDate(job.published_at)}</p>
            {applyUrl ? (
              <a
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                href={applyUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Open application
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </Card>
    </PublicShell>
  );
}
