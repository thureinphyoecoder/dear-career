import type {
  AdminSubmissionSummary,
  Job,
  JobFilters,
  JobsResult,
  SearchParams,
  TrustedSource,
} from "@/lib/types";

type JobsPayload = {
  data?: unknown;
  total?: unknown;
};

const API_CANDIDATES = [
  process.env.API_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "http://nginx/api",
  "http://127.0.0.1:8000/api",
];
const REQUEST_TIMEOUT_MS = 3000;

function toBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function getApiCandidates() {
  return Array.from(
    new Set(
      API_CANDIDATES.filter((value): value is string => Boolean(value)).map(toBaseUrl)
    )
  );
}

function isJob(value: unknown): value is Job {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.source === "string" &&
    typeof candidate.source_slug === "string"
  );
}

function normalizeTotal(value: unknown, jobsLength: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : jobsLength;
}

export function pickSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function canonicalizeOption(value: string, options: readonly string[]) {
  const normalized = normalizeText(value).toLowerCase();

  if (!normalized) {
    return "";
  }

  return options.find((option) => option.toLowerCase() === normalized) ?? "";
}

export function parseJobFilters(params: SearchParams): JobFilters {
  const categoryOptions = ["Technology", "Operations", "Design", "NGO", "Marketing"];
  const modeOptions = ["Remote", "Hybrid", "Onsite"];

  return {
    q: normalizeText(pickSearchValue(params.q)),
    category: canonicalizeOption(
      pickSearchValue(params.category),
      categoryOptions,
    ),
    mode: canonicalizeOption(pickSearchValue(params.mode), modeOptions),
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

  if (filters.mode) {
    params.set("mode", filters.mode.toLowerCase());
  }

  const query = params.toString();

  return query ? `/jobs?${query}` : "/jobs";
}

function toJobsResult(payload: JobsPayload): JobsResult {
  const jobs = Array.isArray(payload.data) ? payload.data.filter(isJob) : [];

  return {
    apiReady: true,
    jobs,
    total: normalizeTotal(payload.total, jobs.length),
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
    total: 0,
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

      return isJob(payload) ? payload : null;
    } catch {
      continue;
    }
  }

  return null;
}

export function formatJobDate(value: string | null) {
  if (!value) {
    return "Recently added";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently added";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
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

export function getCategoryOptions() {
  return ["Technology", "Operations", "Design", "NGO", "Marketing"] as const;
}

export function getModeOptions() {
  return ["Remote", "Hybrid", "Onsite"] as const;
}

export function getAdminSubmissions(): AdminSubmissionSummary[] {
  return [
    {
      id: "SUB-1001",
      title: "Frontend Engineer",
      source: "LinkedIn Company",
      status: "reviewing",
      submittedAt: "Feb 28, 2026",
    },
    {
      id: "SUB-1002",
      title: "Program Coordinator",
      source: "NGO Board",
      status: "queued",
      submittedAt: "Feb 27, 2026",
    },
    {
      id: "SUB-1003",
      title: "Operations Analyst",
      source: "JobsDB",
      status: "approved",
      submittedAt: "Feb 26, 2026",
    },
  ];
}

export function getTrustedSources(): TrustedSource[] {
  return [
    { id: "SRC-1", name: "LinkedIn Company", domain: "linkedin.com", status: "active" },
    { id: "SRC-2", name: "JobsDB", domain: "jobsdb.com", status: "active" },
    { id: "SRC-3", name: "NGO Board", domain: "ngoboard.example", status: "paused" },
  ];
}
