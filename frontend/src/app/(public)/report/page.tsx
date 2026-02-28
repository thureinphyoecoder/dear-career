import { Card } from "@/components/ui/card";
import { ReportForm } from "@/components/site/ReportForm";
import { parseLanguage } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function ReportPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const language = parseLanguage(params);
  const dictionary = getDictionary(language);
  const jobId = typeof params.jobId === "string" ? params.jobId : "";

  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[color:var(--color-text)]">
        {dictionary.report.title}
      </h1>
      <p className="mt-3 text-base leading-7 text-[color:var(--color-muted)]">
        {dictionary.report.subtitle}
      </p>
      <div className="mt-6">
        <ReportForm jobId={jobId} language={language} />
      </div>
    </Card>
  );
}
