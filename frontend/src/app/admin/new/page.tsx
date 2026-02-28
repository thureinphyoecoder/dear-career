import { AdminJobForm } from "@/components/admin/AdminJobForm";
import { AdminShell } from "@/components/layout/AdminShell";
import { Card } from "@/components/ui/card";
import { getAdminSession } from "@/lib/auth";
import type { AdminJobFormState, SearchParams } from "@/lib/types";
import { submitAdminJob } from "./actions";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function AdminNewJobPage({ searchParams }: PageProps) {
  const session = getAdminSession();
  const params = (await searchParams) ?? {};
  const status = typeof params.status === "string" ? params.status : "";
  const state: AdminJobFormState =
    status === "success"
      ? { status: "success", message: "Job submitted successfully." }
      : status === "error"
        ? { status: "error", message: "Submission failed. Check admin key or source payload." }
        : { status: "idle", message: "" };

  return (
    <AdminShell title="New job submission">
      {!session.isConfigured ? (
        <Card className="mb-6 p-5 text-sm text-[color:var(--color-muted)]">
          {session.label}. Configure `ADMIN_API_KEY` on the Next.js server to enable submissions.
        </Card>
      ) : null}
      <AdminJobForm action={submitAdminJob} disabled={!session.isConfigured} state={state} />
    </AdminShell>
  );
}
