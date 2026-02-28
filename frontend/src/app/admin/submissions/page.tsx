import Link from "next/link";
import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { getAdminSubmissions } from "@/lib/api";

export default function AdminSubmissionsPage() {
  const submissions = getAdminSubmissions();

  return (
    <AdminShell title="Submission queue">
      <Table>
        <thead className="bg-[color:var(--surface-muted)] text-sm text-[color:var(--sage-deep)]">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Submitted</th>
          </tr>
        </thead>
        <tbody className="bg-white/80 text-sm">
          {submissions.map((submission) => (
            <tr className="border-t border-[color:var(--line)]" key={submission.id}>
              <td className="px-4 py-4">
                <Link className="font-medium hover:text-[color:var(--sage-deep)]" href={`/admin/submissions/${submission.id}`}>
                  {submission.id}
                </Link>
              </td>
              <td className="px-4 py-4">{submission.title}</td>
              <td className="px-4 py-4">{submission.source}</td>
              <td className="px-4 py-4">
                <Badge tone="soft">{submission.status}</Badge>
              </td>
              <td className="px-4 py-4">{submission.submittedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminShell>
  );
}
