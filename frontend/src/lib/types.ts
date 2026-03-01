export type Language = "mm" | "en";

export type JobCategory = "white-collar" | "blue-collar" | "ngo";
export type JobType = "full-time" | "part-time" | "contract";
export type JobMode = "onsite" | "hybrid" | "remote";

export type Job = {
  id: number;
  title: string;
  company: string | null;
  location: string | null;
  employment_type: string | null;
  work_mode: string | null;
  category: string | null;
  salary: string | null;
  description_en: string | null;
  description_mm: string | null;
  apply_url: string | null;
  apply_email: string | null;
  apply_phone: string | null;
  source: string;
  source_slug: string;
  source_url: string | null;
  published_at: string | null;
  is_verified_source: boolean;
};

export type JobFilters = {
  q: string;
  category: string;
  type: string;
  mode: string;
  page: number;
  lang: Language;
};

export type SearchParamValue = string | string[] | undefined;
export type SearchParams = Record<string, SearchParamValue>;

export type PaginationMeta = {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
};

export type JobsResult = {
  apiReady: boolean;
  jobs: Job[];
  meta: PaginationMeta;
};

export type JobAction =
  | {
      kind: "url";
      href: string;
      label: string;
    }
  | {
      kind: "none";
      label: string;
    };

export type TrustedSource = {
  id: string;
  name: string;
  domain: string;
  note: string;
  status: "active" | "paused";
};

export type AdminSession = {
  isConfigured: boolean;
  label: string;
};

export type AdminJobFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type AdminJobFormPayload = {
  source_slug: string;
  source_url: string;
  source_id: string;
  title: string;
  company: string;
  location: string;
  employment_type: string;
  work_mode: string;
  category: string;
  salary: string;
  description_mm: string;
  description_en: string;
  apply_url: string;
  apply_email: string;
  apply_phone: string;
  published_at: string;
  expires_at: string;
  is_verified_source: boolean;
  is_active: boolean;
};

export type ReportReason = "scam" | "misleading" | "wrong-link" | "duplicate";
