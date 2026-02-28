"use client";

import { useEffect, useMemo, useReducer, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { getCategoryOptions, getModeOptions } from "@/lib/filters";
import type { JobFilters } from "@/lib/jobs";

type SearchPanelProps = {
  filters: JobFilters;
};

type SearchState = JobFilters;

type SearchAction =
  | { type: "set-q"; value: string }
  | { type: "set-category"; value: string }
  | { type: "set-mode"; value: string }
  | { type: "reset" }
  | { type: "sync"; payload: JobFilters };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "set-q":
      return {
        ...state,
        q: action.value,
      };
    case "set-category":
      return {
        ...state,
        category: action.value,
      };
    case "set-mode":
      return {
        ...state,
        mode: action.value,
      };
    case "reset":
      return {
        q: "",
        category: "",
        mode: "",
      };
    case "sync":
      return action.payload;
    default:
      return state;
  }
}

function toQueryString(filters: JobFilters) {
  const params = new URLSearchParams();

  if (filters.q) {
    params.set("q", filters.q);
  }

  if (filters.category) {
    params.set("category", filters.category);
  }

  if (filters.mode) {
    params.set("mode", filters.mode);
  }

  return params.toString();
}

export function SearchPanel({ filters }: SearchPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(searchReducer, filters);

  useEffect(() => {
    dispatch({
      type: "sync",
      payload: filters,
    });
  }, [filters]);

  const filterSummary = useMemo(() => {
    return [state.category, state.mode].filter(Boolean).join(" • ");
  }, [state.category, state.mode]);

  function navigate(nextState: JobFilters) {
    const query = toQueryString(nextState);
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(state);
  }

  function handleReset() {
    const nextState = {
      q: "",
      category: "",
      mode: "",
    };

    dispatch({ type: "reset" });
    navigate(nextState);
  }

  return (
    <aside className="rounded-[1.75rem] border border-[color:var(--line)] bg-[color:rgba(160,183,164,0.15)] p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
          Search
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--sage-deep)]">
          <SlidersHorizontal className="size-3.5" />
          {filterSummary || "All roles"}
        </span>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
            Role or keyword
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 focus-within:border-[color:var(--sage-deep)]">
            <Search className="size-4 text-[color:var(--sage-deep)]" />
            <input
              className="w-full bg-transparent outline-none"
              maxLength={120}
              onChange={(event) =>
                dispatch({ type: "set-q", value: event.target.value })
              }
              placeholder="Product, NGO, operations..."
              value={state.q}
            />
          </div>
        </label>
        <SelectField
          defaultValue={state.category}
          label="Category"
          name="category"
          onChange={(value) => dispatch({ type: "set-category", value })}
          options={getCategoryOptions()}
          placeholder="All categories"
        />
        <SelectField
          defaultValue={state.mode}
          label="Work mode"
          name="mode"
          onChange={(value) => dispatch({ type: "set-mode", value })}
          options={getModeOptions()}
          placeholder="Any mode"
        />
        <div className="flex gap-3">
          <button
            className="flex-1 rounded-full bg-[color:var(--foreground)] px-5 py-3 text-sm font-medium text-[color:var(--background)] transition hover:bg-[color:var(--sage-deep)] disabled:cursor-wait disabled:opacity-70"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Updating..." : "Refine results"}
          </button>
          <button
            className="rounded-full border border-[color:var(--line-strong)] px-5 py-3 text-sm font-medium"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="mt-8 space-y-3 border-t border-[color:var(--line)] pt-6 text-sm leading-7 text-[color:rgba(36,49,40,0.78)]">
        <p>Every job source can be controlled from the backend allowlist.</p>
        <p>Admin ingestion is separated from public browsing.</p>
        <p>When the API is offline, the interface stays usable and honest.</p>
      </div>
      <p className="mt-4 text-xs text-[color:rgba(36,49,40,0.52)]">
        URL state stays shareable and browser-safe.
        {searchParams.size > 0 ? " Current filters are encoded in the address bar." : ""}
      </p>
    </aside>
  );
}

function SelectField({
  defaultValue,
  label,
  name,
  onChange,
  options,
  placeholder,
}: {
  defaultValue: string;
  label: string;
  name: string;
  onChange: (value: string) => void;
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
        name={name}
        onChange={(event) => onChange(event.target.value)}
        value={defaultValue}
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
