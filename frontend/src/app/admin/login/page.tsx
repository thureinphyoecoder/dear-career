import { KeyRound } from "lucide-react";
import { AdminShell } from "@/components/layout/AdminShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAdminSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const session = getAdminSession();

  return (
    <AdminShell title="Admin access">
      <Card className="rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex items-center gap-3 text-[color:var(--sage-deep)]">
          <KeyRound className="size-5" />
          <p className="text-sm font-medium">Current state: {session.label}</p>
        </div>
        <form className="mt-6 grid gap-4 md:max-w-xl">
          <Input placeholder="Admin key" type="password" />
          <Button type="submit">Unlock admin</Button>
        </form>
      </Card>
    </AdminShell>
  );
}
