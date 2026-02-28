import type { HomeViewModel } from "@/components/home/types";
import { SearchPanel } from "@/components/home/SearchPanel";
import { BriefcaseBusiness, ShieldCheck, WavesLadder } from "lucide-react";

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
            icon={BriefcaseBusiness}
            label="Listings surfaced"
            value={String(model.total || model.featuredJobsCount)}
          />
          <MetricCard
            icon={WavesLadder}
            label="Filters active"
            value={String(model.activeFilters)}
          />
          <MetricCard
            emphasized
            icon={ShieldCheck}
            label="Source state"
            value={model.apiReady ? "Live" : "Offline"}
          />
        </div>
      </div>
      <SearchPanel
        filters={{
          q: model.q,
          category: model.category,
          mode: model.mode,
        }}
      />
    </section>
  );
}

function MetricCard({
  emphasized = false,
  icon: Icon,
  label,
  value,
}: {
  emphasized?: boolean;
  icon: typeof BriefcaseBusiness;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`rounded-[1.4rem] border border-[color:var(--line)] p-4 ${
        emphasized ? "bg-[color:var(--surface-muted)]" : "bg-white/70"
      }`}
    >
      <Icon className="size-4 text-[color:var(--sage-deep)]" />
      <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--sage-deep)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}
