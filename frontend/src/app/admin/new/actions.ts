"use server";

import { redirect } from "next/navigation";

function toOptionalString(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value;
}

function toBoolean(formData: FormData, key: string) {
  return formData.get(key) === "1";
}

export async function submitAdminJob(formData: FormData) {
  const apiBase =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://nginx/api";
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    redirect("/admin/new?status=error");
  }

  const payload = {
    source_slug: toOptionalString(formData, "source_slug"),
    source_url: toOptionalString(formData, "source_url"),
    source_id: toOptionalString(formData, "source_id"),
    title: toOptionalString(formData, "title"),
    company: toOptionalString(formData, "company"),
    location: toOptionalString(formData, "location"),
    employment_type: toOptionalString(formData, "employment_type"),
    work_mode: toOptionalString(formData, "work_mode"),
    category: toOptionalString(formData, "category"),
    salary: toOptionalString(formData, "salary"),
    description_mm: toOptionalString(formData, "description_mm"),
    description_en: toOptionalString(formData, "description_en"),
    apply_url: toOptionalString(formData, "apply_url"),
    apply_email: toOptionalString(formData, "apply_email"),
    apply_phone: toOptionalString(formData, "apply_phone"),
    published_at: toOptionalString(formData, "published_at"),
    expires_at: toOptionalString(formData, "expires_at"),
    is_verified_source: toBoolean(formData, "is_verified_source"),
    is_active: toBoolean(formData, "is_active"),
  };

  const response = await fetch(`${apiBase.replace(/\/+$/, "")}/admin/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    redirect("/admin/new?status=error");
  }

  redirect("/admin/new?status=success");
}
