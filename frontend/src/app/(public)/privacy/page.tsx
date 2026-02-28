import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <Card className="mx-auto max-w-3xl p-6 sm:p-8">
      <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Privacy</h1>
      <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
        Dear Career keeps personal data collection minimal. If you submit a report with an email address, it is only used for follow-up about that report.
      </p>
    </Card>
  );
}
