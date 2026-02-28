"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getDictionary } from "@/lib/i18n";
import type { Language } from "@/lib/types";

export function ReportForm({
  language,
  jobId,
}: {
  language: Language;
  jobId: string;
}) {
  const dictionary = getDictionary(language);
  const [reason, setReason] = useState("scam");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const subject = encodeURIComponent(`Job report ${jobId ? `for #${jobId}` : ""}`.trim());
  const body = encodeURIComponent(
    `Reason: ${reason}\nJob ID: ${jobId || "-"}\nEmail: ${email || "-"}\n\n${message}`.trim(),
  );
  const mailtoHref = `mailto:hello@dearcareer.app?subject=${subject}&body=${body}`;

  return (
    <form className="space-y-4">
      <input name="jobId" type="hidden" value={jobId} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--color-text)]">Job ID</span>
          <Input readOnly value={jobId} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-[color:var(--color-text)]">Reason</span>
          <Select onChange={(event) => setReason(event.target.value)} value={reason}>
            <option value="scam">Scam</option>
            <option value="misleading">Misleading</option>
            <option value="wrong-link">Wrong link</option>
            <option value="duplicate">Duplicate</option>
          </Select>
        </label>
      </div>
      <label className="space-y-2">
        <span className="text-sm font-medium text-[color:var(--color-text)]">Message</span>
        <Textarea onChange={(event) => setMessage(event.target.value)} value={message} />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium text-[color:var(--color-text)]">Optional email</span>
        <Input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          type="email"
          value={email}
        />
      </label>
      <a className={buttonStyles()} href={mailtoHref}>
          <Send className="size-4" />
          {dictionary.report.submit}
      </a>
    </form>
  );
}
