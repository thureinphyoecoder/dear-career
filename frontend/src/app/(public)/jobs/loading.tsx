import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton";

export default function JobsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
