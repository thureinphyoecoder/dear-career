import type { JobFilters } from "@/lib/jobs";

const CATEGORY_OPTIONS = [
  "Technology",
  "Operations",
  "Design",
  "NGO",
  "Marketing",
] as const;

const MODE_OPTIONS = ["Remote", "Hybrid", "Onsite"] as const;

type SearchParamValue = string | string[] | undefined;
type SearchParams = Record<string, SearchParamValue>;

function pickValue(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function canonicalize(
  value: string,
  options: readonly string[],
) {
  const normalized = normalizeText(value).toLowerCase();

  if (!normalized) {
    return "";
  }

  return options.find((option) => option.toLowerCase() === normalized) ?? "";
}

export function getCategoryOptions() {
  return CATEGORY_OPTIONS;
}

export function getModeOptions() {
  return MODE_OPTIONS;
}

export function parseJobFilters(params: SearchParams): JobFilters {
  return {
    q: normalizeText(pickValue(params.q)),
    category: canonicalize(pickValue(params.category), CATEGORY_OPTIONS),
    mode: canonicalize(pickValue(params.mode), MODE_OPTIONS),
  };
}
