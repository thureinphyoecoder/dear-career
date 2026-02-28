import type { JobFilters, JobsResult } from "@/lib/jobs";

export type HomeViewModel = JobFilters &
  JobsResult & {
    activeFilters: number;
    featuredJobsCount: number;
  };
