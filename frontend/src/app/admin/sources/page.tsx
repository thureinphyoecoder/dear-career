import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { getTrustedSources } from "@/lib/api";

export default function AdminSourcesPage() {
  const sources = getTrustedSources();

  return (
    <AdminShell title="Trusted sources">
      <Table>
        <thead className="bg-[color:var(--color-surface-muted)] text-sm text-[color:var(--color-muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Domain</th>
            <th className="px-4 py-3 font-medium">Note</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-[color:var(--color-text)]">
          {sources.map((source) => (
            <tr className="border-t border-[color:var(--color-border)]" key={source.id}>
              <td className="px-4 py-4 font-medium">{source.name}</td>
              <td className="px-4 py-4">{source.domain}</td>
              <td className="px-4 py-4 text-[color:var(--color-muted)]">{source.note}</td>
              <td className="px-4 py-4">
                <Badge tone="verified">{source.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminShell>
  );
}
