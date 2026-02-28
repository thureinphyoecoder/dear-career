import { AdminShell } from "@/components/layout/AdminShell";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/components/ui/table";
import { getTrustedSources } from "@/lib/api";

export default function AdminTrustedSourcesPage() {
  const sources = getTrustedSources();

  return (
    <AdminShell title="Trusted sources">
      <Table>
        <thead className="bg-[color:var(--surface-muted)] text-sm text-[color:var(--sage-deep)]">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Domain</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white/80 text-sm">
          {sources.map((source) => (
            <tr className="border-t border-[color:var(--line)]" key={source.id}>
              <td className="px-4 py-4">{source.name}</td>
              <td className="px-4 py-4">{source.domain}</td>
              <td className="px-4 py-4">
                <Badge tone="soft">{source.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminShell>
  );
}
