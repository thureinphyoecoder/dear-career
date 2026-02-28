import { Mail, Send } from "lucide-react";
import { PublicShell } from "@/components/layout/PublicShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SubmitPage() {
  return (
    <PublicShell>
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[1.75rem] bg-[linear-gradient(145deg,rgba(255,246,232,0.96),rgba(242,242,242,0.9))] p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
            Submit a role
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl tracking-[-0.04em]">
            Share a verified opportunity.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:rgba(36,49,40,0.76)]">
            This route is ready for the production submission flow. Connect it to
            the admin ingestion endpoint when form persistence is finalized.
          </p>
        </Card>
        <Card className="rounded-[1.75rem] bg-white/80 p-6 sm:p-7">
          <form className="space-y-4">
            <Input placeholder="Job title" />
            <Input placeholder="Source URL" />
            <Input placeholder="Company" />
            <Input placeholder="Contact email" type="email" />
            <Button type="submit">
              <Send className="size-4" />
              Submit for review
            </Button>
          </form>
          <div className="mt-6 rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4 text-sm leading-7 text-[color:rgba(36,49,40,0.78)]">
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              Admin review happens before public publication.
            </p>
          </div>
        </Card>
      </section>
    </PublicShell>
  );
}
