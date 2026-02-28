import type { HomeViewModel } from "@/components/home/types";
import { getCategoryOptions, getModeOptions } from "@/lib/filters";

type HeroSectionProps = {
  model: HomeViewModel;
};

export function HeroSection({ model }: HeroSectionProps) {
  return (
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
          distractions, cleaner listings, and a focused path from discovery to
          application.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <MetricCard
            label="Listings surfaced"
            value={String(model.total || model.featuredJobsCount)}
          />
          <MetricCard
            label="Filters active"
            value={String(model.activeFilters)}
          />
          <MetricCard
            emphasized
            label="Source state"
            value={model.apiReady ? "Live" : "Offline"}
          />
        </div>
      </div>
      <SearchPanel model={model} />
    </section>
  );
}

function MetricCard({
  emphasized = false,
  label,
  value,
}: {
  emphasized?: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`rounded-[1.4rem] border border-[color:var(--line)] p-4 ${
        emphasized ? "bg-[color:var(--surface-muted)]" : "bg-white/70"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function SearchPanel({ model }: HeroSectionProps) {
  return (
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
            defaultValue={model.q}
            maxLength={120}
            name="q"
            placeholder="Product, NGO, operations..."
          />
        </label>
        <SelectField
          defaultValue={model.category}
          label="Category"
          name="category"
          options={getCategoryOptions()}
          placeholder="All categories"
        />
        <SelectField
          defaultValue={model.mode}
          label="Work mode"
          name="mode"
          options={getModeOptions()}
          placeholder="Any mode"
        />
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
  );
}

function SelectField({
  defaultValue,
  label,
  name,
  options,
  placeholder,
}: {
  defaultValue: string;
  label: string;
  name: string;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
        {label}
      </span>
      <select
        className="w-full rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 outline-none transition focus:border-[color:var(--sage-deep)]"
        defaultValue={defaultValue}
        name={name}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
