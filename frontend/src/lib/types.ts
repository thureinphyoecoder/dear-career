export type Job = {
  id: number;
  title: string;
  company: string | null;
  location: string | null;
  employment_type: string | null;
  work_mode: string | null;
  category: string | null;
  salary: string | null;
  description_en?: string | null;
  description_mm?: string | null;
  apply_url: string | null;
  source: string;
  source_slug: string;
  published_at: string | null;
};

export type JobsResult = {
  apiReady: boolean;
  jobs: Job[];
  total: number;
};

export type JobFilters = {
  q: string;
  category: string;
  mode: string;
};

export type SearchParamValue = string | string[] | undefined;
export type SearchParams = Record<string, SearchParamValue>;

export type AdminSession = {
  isAuthenticated: boolean;
  label: string;
};

export type AdminSubmissionSummary = {
  id: string;
  title: string;
  source: string;
  status: "queued" | "reviewing" | "approved";
  submittedAt: string;
};

export type TrustedSource = {
  id: string;
  name: string;
  domain: string;
  status: "active" | "paused";
};
