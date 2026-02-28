type Job = {
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
  data: Job[];
  total?: number;
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const categoryOptions = ["Technology", "Operations", "Design", "NGO", "Marketing"];
const modeOptions = ["Remote", "Hybrid", "Onsite"];

export const dynamic = "force-dynamic";

function pickValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatDate(value: string | null) {
  if (!value) return "Recently added";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently added";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function buildApiCandidates() {
  return Array.from(
    new Set(
      [
        process.env.API_BASE_URL,
        process.env.NEXT_PUBLIC_API_BASE_URL,
        "http://nginx/api",
        "http://127.0.0.1:8000/api",
      ]
        .filter(Boolean)
        .map((value) => String(value).replace(/\/$/, ""))
    )
  );
}

async function getJobs(filters: {
  q: string;
  category: string;
  mode: string;
}) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.mode) params.set("mode", filters.mode.toLowerCase());

  const query = params.toString();
  const suffix = query ? `/jobs?${query}` : "/jobs";

  for (const baseUrl of buildApiCandidates()) {
    try {
      const response = await fetch(`${baseUrl}${suffix}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        continue;
      }

      const payload = (await response.json()) as JobsPayload;

      return {
        jobs: Array.isArray(payload.data) ? payload.data : [],
        total: payload.total ?? 0,
        apiReady: true,
      };
    } catch {
      continue;
    }
  }

  return {
    jobs: [] as Job[],
    total: 0,
    apiReady: false,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const q = pickValue(params.q).trim();
  const category = pickValue(params.category);
  const mode = pickValue(params.mode);

  const { jobs, total, apiReady } = await getJobs({ q, category, mode });
  const featuredJobs = jobs.slice(0, 6);
  const activeFilters = [q, category, mode].filter(Boolean).length;

  return (
    <main className="px-4 py-6 text-[color:var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow)] backdrop-blur-xl sm:p-6 lg:p-8">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-[linear-gradient(145deg,rgba(255,246,232,0.96),rgba(242,242,242,0.9))] p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.32em] text-[color:var(--sage-deep)]">
              <span className="rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1.5">
                Dear Career
              </span>
              <span>Minimal job discovery</span>
            </div>
            <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Verified opportunities, arranged with calm.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:rgba(36,49,40,0.76)] sm:text-lg">
              Dear Career keeps the experience quiet and trustworthy: fewer
              distractions, cleaner listings, and a focused path from discovery
              to application.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
                  Listings surfaced
                </p>
                <p className="mt-3 text-3xl font-semibold">{total || featuredJobs.length}</p>
              </div>
              <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
                  Filters active
                </p>
                <p className="mt-3 text-3xl font-semibold">{activeFilters}</p>
              </div>
              <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:var(--surface-muted)] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
                  Source state
                </p>
                <p className="mt-3 text-3xl font-semibold">
                  {apiReady ? "Live" : "Offline"}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(160,183,164,0.15)] p-6 sm:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
              Search
            </p>
            <form className="mt-6 space-y-4" method="GET">
              <label className="block">
                <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
                  Role or keyword
                </span>
                <input
                  className="w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]"
                  defaultValue={q}
                  name="q"
                  placeholder="Product, NGO, operations..."
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
                  Category
                </span>
                <select
                  className="w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]"
                  defaultValue={category}
                  name="category"
                >
                  <option value="">All categories</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
                  Work mode
                </span>
                <select
                  className="w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]"
                  defaultValue={mode}
                  name="mode"
                >
                  <option value="">Any mode</option>
                  {modeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-3">
                <button
                  className="flex-1 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium text-[color:var(--background)] transition hover:bg-[color:var(--sage-deep)]"
                  type="submit"
                >
                  Refine results
                </button>
                <a
                  className="rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-sm font-medium"
                  href="/"
                >
                  Reset
                </a>
              </div>
            </form>
            <div className="mt-8 space-y-3 border-t border-[color:var(--line)] pt-6 text-sm leading-7 text-[color:rgba(36,49,40,0.78)]">
              <p>Every job source can be controlled from the backend allowlist.</p>
              <p>Admin ingestion is separated from public browsing.</p>
              <p>When the API is offline, the interface stays usable and honest.</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/72 p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                  Current openings
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-[-0.04em]">
                  Roles worth a closer look.
                </h2>
              </div>
              <p className="text-sm text-[color:rgba(36,49,40,0.66)]">
                {apiReady
                  ? `${featuredJobs.length} roles visible now`
                  : "Connect the API to start showing live roles"}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {featuredJobs.length > 0 ? (
                featuredJobs.map((job) => (
                  <article
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:rgba(242,242,242,0.72)] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]"
                    key={job.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
                          {job.source}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                          {job.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
                          {[job.company, job.location].filter(Boolean).join(" • ") || "Location shared after opening"}
                        </p>
                      </div>
                      <div className="text-right text-sm text-[color:rgba(36,49,40,0.62)]">
                        <p>{formatDate(job.published_at)}</p>
                        <p className="mt-2 uppercase tracking-[0.16em]">
                          {job.work_mode || "Flexible"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {[job.category, job.employment_type, job.salary]
                        .filter(Boolean)
                        .map((item) => (
                          <span
                            className="rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-1.5 text-xs uppercase tracking-[0.16em]"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                    </div>
                    <div className="mt-5">
                      <a
                        className="inline-flex rounded-full border border-[color:var(--line-strong)] px-4 py-2 text-sm font-medium transition hover:bg-[color:var(--surface-muted)]"
                        href={job.apply_url || "#"}
                        rel="noreferrer"
                        target={job.apply_url ? "_blank" : undefined}
                      >
                        {job.apply_url ? "Open application" : "Application details pending"}
                      </a>
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface-muted)] p-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                    No matches yet
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                    The current filters did not return a role.
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[color:rgba(36,49,40,0.76)]">
                    Try broadening the search, or connect the jobs API so the
                    interface can render live openings from Laravel.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(255,246,232,0.92)] p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                Why it feels different
              </p>
              <div className="mt-6 space-y-5">
                {[
                  "Minimal surfaces keep attention on job quality, not visual noise.",
                  "Verified source ingestion reduces reposted scams and broken leads.",
                  "Search, filters, and live API fallback are ready for daily use.",
                ].map((item) => (
                  <div
                    className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/80 p-4 text-sm leading-7 text-[color:rgba(36,49,40,0.8)]"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(160,183,164,0.18)] p-6 sm:p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
                Production notes
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["Data source", apiReady ? "Live API connected" : "Waiting for API"],
                  ["Review model", "Trusted source allowlist"],
                  ["Visual system", "Minimalist sage, cream, and soft gray"],
                ].map(([label, value]) => (
                  <div
                    className="rounded-[1.3rem] border border-[color:var(--line)] bg-white/78 p-4"
                    key={label}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--sage-deep)]">
                      {label}
                    </p>
                    <p className="mt-3 text-lg leading-7">{value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
