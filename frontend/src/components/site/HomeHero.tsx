import Link from "next/link";
import { BriefcaseBusiness, Layers3, MapPin, MoveRight } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { createPageHref, getPrimaryApplyUrl, MODE_OPTIONS } from "@/lib/api";
import type { Job, Language } from "@/lib/types";

type HomeHeroProps = {
  jobs: Job[];
  language: Language;
};

export function HomeHero({ jobs, language }: HomeHeroProps) {
  const heroJobs = jobs.slice(0, 4);
  const noiseStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
  };

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[rgba(160,183,164,0.18)] bg-[#dbe4da] shadow-[0_18px_70px_rgba(59,82,62,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_85%_at_76%_58%,#d6e1d2_0%,#bdd0be_42%,#98af99_100%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={noiseStyle} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <PlantLeft />
        <PlantRight />
        <PlantTopRight />
      </div>

      <div className="relative z-10 px-5 py-7 sm:px-7 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-[760px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-[rgba(250,250,248,0.72)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[rgba(46,42,37,0.72)] backdrop-blur">
              <span className="size-2 rounded-full bg-[#4a7350]" />
              {language === "mm" ? "ယုံကြည်ရတဲ့ အလုပ်အကိုင် platform" : "Trusted job discovery"}
            </div>

            <h1 className="mt-7 text-[42px] leading-[1.02] tracking-[-0.04em] text-[#2e2a25] sm:text-[56px] lg:text-[76px]">
              <span className="font-[family:var(--font-myanmar)]">{language === "mm" ? "သင့်အတွက်" : "Find the career"}</span>
              <br />
              <span className="font-[family:var(--font-display)] font-light italic text-[#4a7350]">
                {language === "mm" ? "အမှန်တကယ်ကိုက်ညီတဲ့ အလုပ်" : "you truly deserve"}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-8 text-[rgba(46,42,37,0.76)] sm:text-[17px]">
              {language === "mm"
                ? "Original company pages နဲ့ verified sources တွေဆီက listings တွေကို နူးညံ့တဲ့ Burmese-first experience နဲ့ စုစည်းထားပါတယ်။"
                : "Browse roles collected from original company pages and verified sources in a calmer, focused job search experience."}
            </p>
          </div>

          <form
            action="/jobs"
            className="mx-auto mt-8 flex max-w-[820px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:flex-row"
          >
            <input name="lang" type="hidden" value={language === "en" ? "en" : ""} />
            <div className="flex min-h-[72px] flex-1 items-center gap-3 border-b border-[rgba(46,42,37,0.08)] px-5 md:border-b-0 md:border-r">
              <BriefcaseBusiness className="size-5 text-[rgba(46,42,37,0.4)]" />
              <input
                className="w-full bg-transparent text-[15px] text-[#2e2a25] outline-none placeholder:text-[rgba(46,42,37,0.4)]"
                defaultValue=""
                name="q"
                placeholder={language === "mm" ? "Job title, skill, company..." : "Job title, skill, company..."}
              />
            </div>
            <div className="flex min-h-[72px] items-center gap-3 border-b border-[rgba(46,42,37,0.08)] px-5 md:min-w-[250px] md:border-b-0 md:border-r">
              <Layers3 className="size-5 text-[rgba(46,42,37,0.4)]" />
              <select
                className="w-full bg-transparent text-[15px] text-[#2e2a25] outline-none"
                defaultValue=""
                name="mode"
              >
                <option value="">{language === "mm" ? "Work mode" : "Work mode"}</option>
                {MODE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {language === "mm" ? option.labelMm : option.labelEn}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="inline-flex min-h-[72px] items-center justify-center gap-2 bg-[#4a7350] px-8 text-[13px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#6f9273]"
              type="submit"
            >
              {language === "mm" ? "Search jobs" : "Search jobs"}
              <MoveRight className="size-4" />
            </button>
          </form>

          <div className="mx-auto mt-5 flex max-w-[820px] flex-wrap justify-center gap-3 text-[12px] text-[rgba(46,42,37,0.72)]">
            <span className="rounded-full bg-[rgba(250,250,248,0.72)] px-3 py-1.5 backdrop-blur">
              {language === "mm" ? "Verified sources only" : "Verified sources only"}
            </span>
            <span className="rounded-full bg-[rgba(250,250,248,0.72)] px-3 py-1.5 backdrop-blur">
              {language === "mm" ? "Direct apply links" : "Direct apply links"}
            </span>
            <span className="rounded-full bg-[rgba(250,250,248,0.72)] px-3 py-1.5 backdrop-blur">
              {language === "mm" ? "Myanmar-focused roles" : "Myanmar-focused roles"}
            </span>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_repeat(4,minmax(0,1fr))] lg:items-stretch">
            <div className="flex items-center justify-center rounded-[18px] border border-white/20 bg-[rgba(60,88,64,0.22)] px-5 py-4 text-center text-[11px] uppercase tracking-[0.24em] text-white/82 backdrop-blur lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]">
              {language === "mm" ? "Latest openings" : "Latest openings"}
            </div>

            {heroJobs.length > 0 ? (
              heroJobs.map((job) => <HeroJobCard job={job} key={job.id} language={language} />)
            ) : (
              <div className="rounded-[18px] border border-white/45 bg-[rgba(255,255,255,0.84)] p-6 text-[14px] text-[rgba(46,42,37,0.74)] backdrop-blur lg:col-span-4">
                {language === "mm"
                  ? "Job data မရသေးပါ။ Search ကနေ listings အားလုံးကို ဝင်ကြည့်နိုင်ပါတယ်။"
                  : "Jobs are not available yet. You can still browse the full listings page."}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[18px] border border-white/35 bg-[rgba(250,250,248,0.72)] px-5 py-4 text-[13px] text-[rgba(46,42,37,0.76)] backdrop-blur sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[#4a7350] shadow-[0_4px_18px_rgba(74,115,80,0.12)]">
                <MapPin className="size-4" />
              </div>
              <p>
                {language === "mm"
                  ? "Dear Career မှာ apply မလုပ်ဘဲ original listing link ကိုပဲ ညွှန်းပေးပါတယ်။"
                  : "Dear Career sends you to the original listing instead of collecting applications."}
              </p>
            </div>
            <Link
              className={buttonStyles({ variant: "secondary" })}
              href={createPageHref("/jobs", { lang: language })}
            >
              {language === "mm" ? "အလုပ်အားလုံးကြည့်မယ်" : "Browse all jobs"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroJobCard({ job, language }: { job: Job; language: Language }) {
  const applyUrl = getPrimaryApplyUrl(job);

  return (
    <article className="flex h-full flex-col rounded-[18px] border border-white/55 bg-[rgba(255,255,255,0.86)] p-5 shadow-[0_8px_28px_rgba(0,0,0,0.08)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,0,0,0.11)]">
      <h2 className="font-[family:var(--font-display)] text-[28px] leading-none text-[#2e2a25]">
        {job.title}
      </h2>
      <div className="mt-3 flex items-center gap-2 text-[13px] text-[rgba(46,42,37,0.65)]">
        <div className="flex size-7 items-center justify-center rounded-[8px] bg-[#b8ceba] text-[11px] font-semibold text-[#4a7350]">
          {(job.company?.slice(0, 1) ?? job.title.slice(0, 1)).toUpperCase()}
        </div>
        <span>{job.company ?? (language === "mm" ? "Trusted source" : "Trusted source")}</span>
      </div>
      <div className="mt-4 space-y-2 text-[12.5px] text-[rgba(46,42,37,0.56)]">
        {job.location ? <p>{job.location}</p> : null}
        {job.salary ? <p>{job.salary}</p> : null}
        {!job.location && !job.salary ? (
          <p>{language === "mm" ? "အချက်အလက်ကို details page မှာကြည့်နိုင်ပါတယ်။" : "See details on the job page."}</p>
        ) : null}
      </div>
      <div className="mt-auto pt-4">
        {applyUrl ? (
          <a
            className="inline-flex min-h-10 items-center rounded-[10px] border border-[#4a7350] px-4 text-[12px] font-medium uppercase tracking-[0.1em] text-[#4a7350] transition hover:bg-[#4a7350] hover:text-white"
            href={applyUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {language === "mm" ? "Apply now" : "Apply now"}
          </a>
        ) : (
          <Link
            className="inline-flex min-h-10 items-center rounded-[10px] border border-[#4a7350] px-4 text-[12px] font-medium uppercase tracking-[0.1em] text-[#4a7350] transition hover:bg-[#4a7350] hover:text-white"
            href={createPageHref(`/jobs/${job.id}`, { lang: language })}
          >
            {language === "mm" ? "View job" : "View job"}
          </Link>
        )}
      </div>
    </article>
  );
}

function PlantRight() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-6 -right-8 hidden w-[420px] blur-[2px] brightness-95 lg:block xl:w-[470px]"
      viewBox="0 0 400 600"
    >
      <ellipse cx="200" cy="580" fill="#8b7355" opacity="0.6" rx="70" ry="16" />
      <path d="M145 500 Q140 575 155 580 Q200 590 245 580 Q260 575 255 500Z" fill="#c4a882" />
      <path d="M145 500 Q200 488 255 500" fill="none" stroke="#b89060" strokeWidth="2" />
      <ellipse cx="200" cy="500" fill="#6b5240" rx="55" ry="12" />
      <path d="M200 498 Q198 420 200 340 Q202 260 198 180" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="5" />
      <path d="M200 420 Q160 390 120 360" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3.5" />
      <path d="M200 360 Q240 320 280 290" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3.5" />
      <path d="M200 300 Q155 265 110 240" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3" />
      <path d="M200 240 Q245 200 285 175" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3" />
      <path d="M200 180 Q165 140 140 110" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M200 180 Q235 140 260 110" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2.5" />
      <ellipse cx="100" cy="345" fill="#5a8a5e" opacity="0.9" rx="46" ry="22" transform="rotate(-25 100 345)" />
      <ellipse cx="295" cy="275" fill="#6fa870" opacity="0.85" rx="48" ry="20" transform="rotate(20 295 275)" />
      <ellipse cx="95" cy="228" fill="#5a8a5e" opacity="0.9" rx="44" ry="19" transform="rotate(-30 95 228)" />
      <ellipse cx="298" cy="162" fill="#78b87a" opacity="0.8" rx="42" ry="18" transform="rotate(22 298 162)" />
      <ellipse cx="128" cy="98" fill="#5a8a5e" opacity="0.88" rx="38" ry="16" transform="rotate(-35 128 98)" />
      <ellipse cx="268" cy="95" fill="#6fa870" opacity="0.82" rx="38" ry="16" transform="rotate(30 268 95)" />
      <ellipse cx="200" cy="70" fill="#78b87a" opacity="0.9" rx="32" ry="14" />
      <ellipse cx="148" cy="347" fill="#4d7e52" opacity="0.7" rx="28" ry="12" transform="rotate(-40 148 347)" />
    </svg>
  );
}

function PlantLeft() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -bottom-3 -left-4 hidden w-[240px] blur-[2px] brightness-95 md:block xl:w-[320px]"
      viewBox="0 0 320 500"
    >
      <ellipse cx="160" cy="488" fill="#8b7355" opacity="0.5" rx="60" ry="13" />
      <path d="M112 415 Q108 482 122 488 Q160 496 198 488 Q212 482 208 415Z" fill="#c4a882" />
      <ellipse cx="160" cy="415" fill="#6b5240" rx="48" ry="10" />
      <path d="M160 413 Q158 350 162 280 Q165 210 160 140" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="4.5" />
      <path d="M160 350 Q125 318 90 298" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3" />
      <path d="M160 290 Q195 255 228 235" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="3" />
      <path d="M160 230 Q120 195 85 175" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M160 170 Q190 135 215 115" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M160 140 Q140 105 125 80" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2" />
      <ellipse cx="80" cy="285" fill="#5a8a5e" opacity="0.88" rx="40" ry="17" transform="rotate(-28 80 285)" />
      <ellipse cx="238" cy="222" fill="#6fa870" opacity="0.82" rx="40" ry="17" transform="rotate(25 238 222)" />
      <ellipse cx="75" cy="162" fill="#5a8a5e" opacity="0.88" rx="36" ry="15" transform="rotate(-32 75 162)" />
      <ellipse cx="222" cy="105" fill="#78b87a" opacity="0.8" rx="35" ry="14" transform="rotate(28 222 105)" />
      <ellipse cx="120" cy="68" fill="#5a8a5e" opacity="0.85" rx="30" ry="13" transform="rotate(-20 120 68)" />
    </svg>
  );
}

function PlantTopRight() {
  return (
    <svg
      aria-hidden="true"
      className="absolute right-16 top-10 hidden w-[150px] blur-[2px] brightness-95 xl:block"
      viewBox="0 0 200 280"
    >
      <path d="M80 0 Q100 5 120 0" fill="none" stroke="#8b7355" strokeWidth="2" />
      <path d="M80 2 Q78 30 85 38 Q100 44 115 38 Q122 30 120 2Z" fill="#c4a882" />
      <ellipse cx="100" cy="36" fill="#6b5240" rx="15" ry="5" />
      <path d="M100 36 Q95 80 100 120 Q105 160 98 200 Q94 240 100 270" fill="none" stroke="#4a6741" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M100 80 Q75 95 55 100" fill="none" stroke="#4a6741" strokeWidth="2" />
      <path d="M100 120 Q125 135 145 138" fill="none" stroke="#4a6741" strokeWidth="2" />
      <path d="M98 160 Q70 175 50 178" fill="none" stroke="#4a6741" strokeWidth="1.8" />
      <path d="M100 200 Q128 215 148 216" fill="none" stroke="#4a6741" strokeWidth="1.8" />
      <ellipse cx="45" cy="100" fill="#5a8a5e" opacity="0.9" rx="18" ry="10" transform="rotate(-15 45 100)" />
      <ellipse cx="150" cy="137" fill="#78b87a" opacity="0.85" rx="18" ry="10" transform="rotate(10 150 137)" />
      <ellipse cx="42" cy="177" fill="#5a8a5e" opacity="0.85" rx="16" ry="9" transform="rotate(-20 42 177)" />
      <ellipse cx="152" cy="215" fill="#6fa870" opacity="0.82" rx="16" ry="9" transform="rotate(15 152 215)" />
      <ellipse cx="100" cy="270" fill="#78b87a" opacity="0.8" rx="14" ry="8" />
    </svg>
  );
}
