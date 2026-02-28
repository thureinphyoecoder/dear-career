import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createPageHref, getTrustedSources, parseLanguage } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function AboutPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const language = parseLanguage(params);
  const dictionary = getDictionary(language);
  const sources = getTrustedSources();

  return (
    <div className="space-y-6">
      <section className="rounded-[14px] border border-[color:var(--color-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,227,227,0.76))] p-6 sm:p-8">
        <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[color:var(--color-text)]">
          {dictionary.about.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--color-muted)]">
          {dictionary.about.subtitle}
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6" id="trust">
          <h2 className="text-xl font-semibold">{dictionary.about.sections.what}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
            Dear Career shows a smaller set of higher-quality roles so people can review details, trust signals, and apply paths without noise.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">{dictionary.about.sections.curation}</h2>
          <ul className="mt-3 space-y-3 text-sm leading-7 text-[color:var(--color-muted)]">
            <li>Source domain is checked against a curated trusted list.</li>
            <li>External links stay visible so users know when they leave Dear Career.</li>
            <li>Listings can be reported quickly when something looks suspicious.</li>
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
          <ShieldCheck className="size-4 text-[color:var(--color-primary)]" />
          {dictionary.about.sections.sources}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {sources.map((source) => (
            <span className="rounded-full bg-[color:var(--color-primary-soft)] px-4 py-2 text-sm text-[color:var(--color-primary)]" key={source.id}>
              {source.name} · {source.domain}
            </span>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
          <Mail className="size-4 text-[color:var(--color-primary)]" />
          {dictionary.about.sections.contact}
        </div>
        <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
          Need to report a listing or contact the team? Use the report page and include the job ID if available.
        </p>
        <Link className="mt-4 inline-flex text-sm font-semibold text-[color:var(--color-primary)]" href={createPageHref("/report", { lang: language })}>
          Go to report page
        </Link>
      </Card>
    </div>
  );
}
