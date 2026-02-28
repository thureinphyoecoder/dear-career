export function JobCardSkeleton() {
  return (
    <div className="rounded-[14px] border border-[color:var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="h-6 w-24 animate-pulse rounded-full bg-[color:var(--color-primary-soft)]" />
      <div className="mt-4 h-7 w-4/5 animate-pulse rounded bg-[color:var(--color-surface-muted)]" />
      <div className="mt-3 h-5 w-3/5 animate-pulse rounded bg-[color:var(--color-surface-muted)]" />
      <div className="mt-5 flex gap-2">
        <div className="h-8 w-20 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
        <div className="h-8 w-24 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
      </div>
      <div className="mt-6 flex gap-3">
        <div className="h-11 w-28 animate-pulse rounded-[12px] bg-[color:var(--color-primary-soft)]" />
        <div className="h-11 w-24 animate-pulse rounded-[12px] bg-[color:var(--color-surface-muted)]" />
      </div>
    </div>
  );
}
