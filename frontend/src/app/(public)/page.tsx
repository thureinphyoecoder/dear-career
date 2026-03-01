import Link from "next/link";
import { HomeJobRow } from "@/components/jobs/HomeJobRow";
import { HomeHero } from "@/components/site/HomeHero";
import {
  createPageHref,
  fetchPublicJobs,
  parseJobFilters,
} from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { SearchParams } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const filters = parseJobFilters(params);
  const jobsResult = await fetchPublicJobs({
    ...filters,
    page: 1,
  });
  const dictionary = getDictionary(filters.lang);
  const jobs = jobsResult.jobs.slice(0, 4);

  return (
    <div className="space-y-10 lg:space-y-12">
      <div className="mx-auto max-w-[1320px]">
        <HomeHero jobs={jobs} language={filters.lang} />
      </div>

      <section className="mx-auto max-w-[1320px]">
        <div className="rounded-[24px] bg-[linear-gradient(135deg,#a0b7a4_0%,#8ea593_100%)] px-7 py-6 text-white shadow-[0_10px_32px_rgba(0,0,0,0.05)] lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">{dictionary.common.sponsored}</p>
              <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.035em]">Myanmar Digital Institute</h2>
              <p className="mt-1 text-[14px] text-white/82">Clearly labeled partner placement. Dear Career jobs content နဲ့ visual separation ခွဲထားပါတယ်။</p>
            </div>
            <button className="inline-flex min-h-11 items-center rounded-full bg-white px-6 text-[13px] font-semibold text-[color:var(--color-primary)]">
              အခုပဲ ကြည့်မည်
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-10 pb-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-7">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-soft)]">Filter</p>
          </div>
          <FilterGroup title="အမျိုးအစား" items={["အားလုံး", "White-collar", "Blue-collar", "NGO"]} activeIndex={0} />
          <FilterGroup title="အလုပ်ပုံစံ" items={["အားလုံး", "Full-time", "Part-time", "Contract"]} activeIndex={0} />
          <FilterGroup title="လုပ်ဆောင်မှုပုံစံ" items={["Onsite", "Hybrid", "Remote"]} />
          <SidebarPanel
            title="Trusted sources"
            body="Apply လုပ်တဲ့အခါ Dear Career မဟုတ်ဘဲ မူရင်း source page ကိုပဲသွားမယ်။"
            ctaHref={createPageHref("/about#sources", { lang: filters.lang })}
            ctaLabel="Sources list"
            label="Trust"
          />
          <SidebarPanel
            title="Report suspicious jobs"
            body="Link မှားနေခြင်း၊ scam သံသယရှိခြင်း၊ duplicate ဖြစ်ခြင်းတို့ကို report လုပ်လို့ရတယ်။"
            ctaHref={createPageHref("/report", { lang: filters.lang })}
            ctaLabel="Report"
            label="Safety"
          />
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-soft)]">Latest jobs</p>
              <h2 className="mt-2 text-[32px] font-semibold tracking-[-0.04em] text-[color:var(--color-text)] lg:text-[38px]">
                {dictionary.home.latest}
              </h2>
              <p className="mt-2 max-w-[620px] text-[14px] leading-7 text-[color:var(--color-muted)]">
                Curated listings from original sources only. Dear Career မှာ CV မတင်ရဘဲ source site ဆီပဲလွှဲပေးပါတယ်။
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 items-center rounded-full border border-[color:rgba(160,183,164,0.25)] bg-white px-5 text-[13px] font-medium text-[color:var(--color-text)] transition hover:border-[color:var(--color-primary)]"
              href={createPageHref("/jobs", { lang: filters.lang })}
            >
              {dictionary.common.seeAll}
            </Link>
          </div>

          <div className="space-y-3">
            {jobs.map((job, index) => (
              <HomeJobRow featured={index === 0} job={job} key={job.id} language={filters.lang} />
            ))}
          </div>

          <div className="mt-4 rounded-[20px] border border-dashed border-[color:rgba(160,183,164,0.45)] bg-[color:var(--color-surface)] px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-soft)]">{dictionary.common.sponsored}</p>
            <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[color:var(--color-text)]">Partner placement</h3>
                <p className="mt-1 text-[13px] leading-6 text-[color:var(--color-muted)]">
                  Sponsored blocks ကို jobs listing နဲ့သီးသန့်ခွဲပြထားတယ် so that trust signal မပျက်ဘူး။
                </p>
              </div>
              <button className="inline-flex min-h-10 items-center rounded-[10px] bg-[color:var(--color-primary)] px-5 text-[13px] font-semibold text-white">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-[1320px] rounded-t-[28px] bg-[color:var(--color-text)] text-center text-[13px] text-white/55">
        <div className="px-6 py-12">
          <div className="text-[20px] font-semibold tracking-[-0.04em] text-white">
            dear<span className="italic text-[color:var(--color-primary)]">career</span>
          </div>
          <p className="mt-2">© 2026 Dear Career. Curated job discovery for Myanmar&apos;s workforce.</p>
        </div>
      </footer>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  activeIndex,
}: {
  title: string;
  items: string[];
  activeIndex?: number;
}) {
  return (
    <div>
      <h3 className="mb-3 text-[13px] font-medium text-[color:var(--color-text)]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            className={
              index === activeIndex
                ? "inline-flex min-h-9 items-center rounded-full border border-[color:rgba(160,183,164,0.45)] bg-white px-3 text-[12.5px] font-medium text-[color:var(--color-text)]"
                : "inline-flex min-h-9 items-center rounded-full bg-[color:var(--color-surface)] px-3 text-[12.5px] text-[color:var(--color-muted)]"
            }
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SidebarPanel({
  label,
  title,
  body,
  ctaHref,
  ctaLabel,
}: {
  label: string;
  title: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-[18px] border border-[color:rgba(160,183,164,0.18)] bg-[color:var(--color-surface)] p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-soft)]">{label}</p>
      <h3 className="mt-3 text-[16px] font-semibold text-[color:var(--color-text)]">{title}</h3>
      <p className="mt-2 text-[13px] leading-7 text-[color:var(--color-muted)]">{body}</p>
      <Link
        className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-[10px] border border-[color:rgba(160,183,164,0.4)] bg-transparent px-4 text-[13px] font-medium text-[color:var(--color-primary)] transition hover:bg-white"
        href={ctaHref}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
