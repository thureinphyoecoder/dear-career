import type {
  AdminJobFormPayload,
  AdminSession,
  Job,
  JobAction,
  JobFilters,
  JobsResult,
  Language,
  PaginationMeta,
  SearchParams,
  TrustedSource,
} from "@/lib/types";

type JobsPayload = {
  data?: unknown;
  total?: unknown;
  per_page?: unknown;
  current_page?: unknown;
  last_page?: unknown;
};

const API_CANDIDATES = [
  process.env.API_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "http://nginx/api",
  "http://127.0.0.1:8000/api",
].filter(Boolean) as string[];

const REQUEST_TIMEOUT_MS = 5000;

export const CATEGORY_OPTIONS = [
  { value: "white-collar", labelMm: "White-collar", labelEn: "White-collar" },
  { value: "blue-collar", labelMm: "Blue-collar", labelEn: "Blue-collar" },
  { value: "ngo", labelMm: "NGO", labelEn: "NGO" },
] as const;

export const TYPE_OPTIONS = [
  { value: "full-time", labelMm: "Full-time", labelEn: "Full-time" },
  { value: "part-time", labelMm: "Part-time", labelEn: "Part-time" },
  { value: "contract", labelMm: "Contract", labelEn: "Contract" },
] as const;

export const MODE_OPTIONS = [
  { value: "onsite", labelMm: "Onsite", labelEn: "Onsite" },
  { value: "hybrid", labelMm: "Hybrid", labelEn: "Hybrid" },
  { value: "remote", labelMm: "Remote", labelEn: "Remote" },
] as const;

const TRUSTED_SOURCES: TrustedSource[] = [
  {
    id: "jobsdb",
    name: "JobsDB",
    domain: "jobsdb.com",
    note: "Widely used regional platform with company-level postings.",
    status: "active",
  },
  {
    id: "jobthai",
    name: "JobThai",
    domain: "jobthai.com",
    note: "Reviewed source for structured employer listings.",
    status: "active",
  },
  {
    id: "linkedin-company",
    name: "LinkedIn Company",
    domain: "linkedin.com",
    note: "Company-originated opportunities reviewed against source domain.",
    status: "active",
  },
];

function toBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function getApiCandidates() {
  return Array.from(new Set(API_CANDIDATES.map(toBaseUrl)));
}

function pickSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function canonicalizeOption(value: string, options: readonly string[]) {
  const normalized = normalizeText(value).toLowerCase();

  if (!normalized) {
    return "";
  }

  return options.find((option) => option.toLowerCase() === normalized) ?? "";
}

function normalizePage(value: string) {
  const page = Number.parseInt(value, 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function toStringOrNull(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function toBoolean(value: unknown) {
  return value === true || value === 1 || value === "1";
}

function toNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isJob(value: unknown): value is Job {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === "number" && typeof candidate.title === "string";
}

function normalizeJob(value: unknown): Job | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const raw = value as Record<string, unknown>;

  if (typeof raw.id !== "number" || typeof raw.title !== "string") {
    return null;
  }

  return {
    id: raw.id,
    title: raw.title,
    company: toStringOrNull(raw.company),
    location: toStringOrNull(raw.location),
    employment_type: toStringOrNull(raw.employment_type),
    work_mode: toStringOrNull(raw.work_mode),
    category: toStringOrNull(raw.category),
    salary: toStringOrNull(raw.salary),
    description_en: toStringOrNull(raw.description_en),
    description_mm: toStringOrNull(raw.description_mm),
    apply_url: toStringOrNull(raw.apply_url),
    apply_email: toStringOrNull(raw.apply_email),
    apply_phone: toStringOrNull(raw.apply_phone),
    source: typeof raw.source === "string" ? raw.source : "Trusted source",
    source_slug: typeof raw.source_slug === "string" ? raw.source_slug : "trusted-source",
    source_url: toStringOrNull(raw.source_url),
    published_at: toStringOrNull(raw.published_at),
    is_verified_source: raw.is_verified_source === undefined ? true : toBoolean(raw.is_verified_source),
  };
}

function getDefaultMeta(): PaginationMeta {
  return {
    page: 1,
    perPage: 12,
    total: 0,
    lastPage: 1,
  };
}

function toJobsResult(payload: JobsPayload): JobsResult {
  const jobs = Array.isArray(payload.data)
    ? payload.data.map(normalizeJob).filter((job): job is Job => Boolean(job))
    : [];

  const total = toNumber(payload.total, jobs.length);
  const perPage = toNumber(payload.per_page, jobs.length || 12);
  const page = toNumber(payload.current_page, 1);
  const lastPage = Math.max(toNumber(payload.last_page, Math.ceil(total / Math.max(perPage, 1)) || 1), 1);

  return {
    apiReady: true,
    jobs,
    meta: {
      page,
      perPage,
      total,
      lastPage,
    },
  };
}

function buildJobsQuery(filters: JobFilters) {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", filters.q);
  }
  if (filters.category) {
    params.set("category", filters.category);
  }
  if (filters.type) {
    params.set("type", filters.type);
  }
  if (filters.mode) {
    params.set("mode", filters.mode);
  }

  params.set("page", String(filters.page));
  params.set("per_page", "12");

  return `/jobs?${params.toString()}`;
}

export function parseLanguage(params: SearchParams): Language {
  const value = pickSearchValue(params.lang).toLowerCase();
  return value === "en" ? "en" : "mm";
}

export function parseJobFilters(params: SearchParams): JobFilters {
  return {
    q: normalizeText(pickSearchValue(params.q)),
    category: canonicalizeOption(
      pickSearchValue(params.category),
      CATEGORY_OPTIONS.map((option) => option.value),
    ),
    type: canonicalizeOption(
      pickSearchValue(params.type),
      TYPE_OPTIONS.map((option) => option.value),
    ),
    mode: canonicalizeOption(
      pickSearchValue(params.mode),
      MODE_OPTIONS.map((option) => option.value),
    ),
    page: normalizePage(pickSearchValue(params.page)),
    lang: parseLanguage(params),
  };
}

export async function fetchPublicJobs(filters: JobFilters): Promise<JobsResult> {
  const requestPath = buildJobsQuery(filters);

  for (const baseUrl of getApiCandidates()) {
    try {
      const response = await fetch(`${baseUrl}${requestPath}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        continue;
      }

      const payload = (await response.json()) as JobsPayload;
      return toJobsResult(payload);
    } catch {
      continue;
    }
  }

  return {
    apiReady: false,
    jobs: [],
    meta: getDefaultMeta(),
  };
}

export async function fetchPublicJob(id: string): Promise<Job | null> {
  for (const baseUrl of getApiCandidates()) {
    try {
      const response = await fetch(`${baseUrl}/jobs/${id}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        continue;
      }

      const payload = (await response.json()) as unknown;
      return normalizeJob(payload);
    } catch {
      continue;
    }
  }

  return null;
}

export function getTrustedSources() {
  return TRUSTED_SOURCES;
}

export function getTrustedSourceBySlug(slug: string) {
  return TRUSTED_SOURCES.find((source) => source.id === slug || source.id === slug.toLowerCase()) ?? null;
}

export function getSafeExternalUrl(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = new URL(value);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export function getDisplayDomain(job: Pick<Job, "source_url" | "source" | "source_slug">) {
  if (job.source_url) {
    try {
      return new URL(job.source_url).hostname.replace(/^www\./, "");
    } catch {
      return job.source;
    }
  }

  const trustedSource = getTrustedSourceBySlug(job.source_slug);
  return trustedSource?.domain ?? job.source;
}

export function formatRelativeDate(value: string | null, language: Language) {
  if (!value) {
    return language === "mm" ? "မကြာသေးခင်" : "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return language === "mm" ? "မကြာသေးခင်" : "Recently";
  }

  const now = new Date();
  const diffDays = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      86400000,
  );

  if (diffDays <= 0) {
    return language === "mm" ? "ဒီနေ့" : "Today";
  }

  if (diffDays === 1) {
    return language === "mm" ? "မနေ့က" : "Yesterday";
  }

  return new Intl.DateTimeFormat(language === "mm" ? "my-MM" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getLocalizedDescription(job: Job, language: Language) {
  if (language === "mm") {
    return {
      body: job.description_mm ?? job.description_en ?? "",
      showingFallback: !job.description_mm && Boolean(job.description_en),
    };
  }

  return {
    body: job.description_en ?? job.description_mm ?? "",
    showingFallback: !job.description_en && Boolean(job.description_mm),
  };
}

export function getPrimaryApplyUrl(job: Job) {
  return getSafeExternalUrl(job.apply_url) ?? getSafeExternalUrl(job.source_url);
}

export function getApplyAction(job: Job, language: Language): JobAction {
  const applyUrl = getPrimaryApplyUrl(job);

  if (applyUrl) {
    return {
      kind: "url",
      href: applyUrl,
      label: language === "mm" ? "လျှောက်မယ်" : "Apply",
    };
  }

  return {
    kind: "none",
    label: language === "mm" ? "လျှောက်ရန် မရှိသေးပါ" : "No apply method",
  };
}

export function buildQueryString(filters: Partial<JobFilters>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value === "" || value === undefined || value === null) {
      continue;
    }

    params.set(key, String(value));
  }

  return params.toString();
}

export function createPageHref(pathname: string, filters: Partial<JobFilters>) {
  const [pathWithQuery, hash] = pathname.split("#");
  const [path, existingQuery] = pathWithQuery.split("?");
  const params = new URLSearchParams(existingQuery ?? "");

  for (const [key, value] of Object.entries(filters)) {
    if (key === "lang" && value === "mm") {
      params.delete(key);
      continue;
    }

    if (value === "" || value === undefined || value === null) {
      params.delete(key);
      continue;
    }

    params.set(key, String(value));
  }

  const query = params.toString();
  const href = query ? `${path}?${query}` : path;

  return hash ? `${href}#${hash}` : href;
}

export function getAdminSession(): AdminSession {
  const configured = Boolean(process.env.ADMIN_API_KEY);

  return {
    isConfigured: configured,
    label: configured ? "Server key configured" : "Missing ADMIN_API_KEY",
  };
}

export function getAdminJobDefaults(): AdminJobFormPayload {
  return {
    source_slug: "",
    source_url: "",
    source_id: "",
    title: "",
    company: "",
    location: "",
    employment_type: "",
    work_mode: "",
    category: "",
    salary: "",
    description_mm: "",
    description_en: "",
    apply_url: "",
    apply_email: "",
    apply_phone: "",
    published_at: "",
    expires_at: "",
    is_verified_source: true,
    is_active: true,
  };
}
