"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Mail, Phone } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getApplyAction, getSafeExternalUrl } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { Job, Language } from "@/lib/types";

export function ApplyCTA({
  job,
  language,
}: {
  job: Job;
  language: Language;
}) {
  const dictionary = getDictionary(language);
  const [feedback, setFeedback] = useState("");
  const action = getApplyAction(job, language);
  const copyValue = getSafeExternalUrl(job.apply_url) ?? job.apply_email ?? job.apply_phone ?? "";

  async function handleCopy() {
    if (!copyValue) {
      setFeedback(dictionary.common.noApplyMethod);
      return;
    }

    try {
      await navigator.clipboard.writeText(copyValue);
      setFeedback(language === "mm" ? "ကူးပြီးပါပြီ" : "Copied");
    } catch {
      setFeedback(language === "mm" ? "ကူးမရပါ" : "Copy failed");
    }
  }

  return (
    <Card className="sticky bottom-20 p-4 md:bottom-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[color:var(--color-text)]">
            {dictionary.common.apply}
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            {dictionary.common.externalLink}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {action.kind === "none" ? (
            <Button disabled>{action.label}</Button>
          ) : (
            <a className={buttonStyles()} href={action.href} rel="noopener noreferrer" target="_blank">
                {action.kind === "email" ? <Mail className="size-4" /> : null}
                {action.kind === "phone" ? <Phone className="size-4" /> : null}
                {action.kind === "url" ? <ArrowUpRight className="size-4" /> : null}
                {dictionary.common.apply}
            </a>
          )}
          <Button onClick={handleCopy} type="button" variant="secondary">
            <Copy className="size-4" />
            {dictionary.common.copyLink}
          </Button>
        </div>
      </div>
      {feedback ? (
        <p className="mt-3 text-sm text-[color:var(--color-muted)]">{feedback}</p>
      ) : null}
    </Card>
  );
}
