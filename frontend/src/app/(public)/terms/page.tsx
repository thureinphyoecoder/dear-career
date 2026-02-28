import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Terms</h1>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
        Dear Career curates links to third-party job applications. Users should review the destination source and apply carefully through the original listing.
      </p>
    </Card>
  );
}
