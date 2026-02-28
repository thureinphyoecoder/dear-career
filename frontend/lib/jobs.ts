export type Job = {
  id: number;
  title: string;
  company: string | null;
  location: string | null;
  employment_type: string | null;
  work_mode: string | null;
  category: string | null;
  salary: string | null;
  apply_url: string | null;
  source: string;
  source_slug: string;
  published_at: string | null;
};

type JobsPayload = {
  data?: unknown;
  total?: unknown;
};

export type JobFilters = {
  q: string;
  category: string;
  mode: string;
};

export type JobsResult = {
  apiReady: boolean;
  jobs: Job[];
  total: number;
};

const API_CANDIDATES = [
  process.env.API_BASE_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
  "http://nginx/api",
  "http://127.0.0.1:8000/api",
];
const JOBS_REQUEST_TIMEOUT_MS = 3000;
const JOB_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function toBaseUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function isJobRecord(value: unknown): value is Job {
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

function buildQuery(filters: JobFilters) {
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

function getApiCandidates() {
  return Array.from(
    new Set(
      API_CANDIDATES.filter((value): value is string => Boolean(value)).map(toBaseUrl)
    )
  );
}

function toJobsResult(payload: JobsPayload): JobsResult {
  const jobs = Array.isArray(payload.data) ? payload.data.filter(isJobRecord) : [];

  return {
    apiReady: true,
    jobs,
    total: normalizeTotal(payload.total, jobs.length),
  };
}

export async function fetchJobs(filters: JobFilters): Promise<JobsResult> {
  const requestPath = buildQuery(filters);

  for (const baseUrl of getApiCandidates()) {
    try {
      const response = await fetch(`${baseUrl}${requestPath}`, {
        cache: "no-store",
        signal: AbortSignal.timeout(JOBS_REQUEST_TIMEOUT_MS),
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

export function formatJobDate(value: string | null) {
  if (!value) {
    return "Recently added";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently added";
  }

  return JOB_DATE_FORMATTER.format(date);
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
