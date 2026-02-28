import { notFound } from "next/navigation";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAdminSubmissions } from "@/lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminSubmissionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const submission = getAdminSubmissions().find((item) => item.id === id);

  if (!submission) {
    notFound();
  }

  return (
    <AdminShell title={`Submission ${submission.id}`}>
      <Card className="rounded-[1.75rem] p-6 sm:p-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
          Source
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          {submission.title}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge>{submission.source}</Badge>
          <Badge tone="soft">{submission.status}</Badge>
          <Badge>{submission.submittedAt}</Badge>
        </div>
      </Card>
    </AdminShell>
  );
}
