"use client";

import { useEffect, useMemo, useReducer, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getCategoryOptions, getModeOptions } from "@/lib/api";
import type { JobFilters } from "@/lib/types";

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
      return { ...state, q: action.value };
    case "set-category":
      return { ...state, category: action.value };
    case "set-mode":
      return { ...state, mode: action.value };
    case "reset":
      return { q: "", category: "", mode: "" };
    case "sync":
      return action.payload;
    default:
      return state;
  }
}

function toQueryString(filters: JobFilters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.mode) params.set("mode", filters.mode);

  return params.toString();
}

export function PublicSearchPanel({ filters }: { filters: JobFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(searchReducer, filters);

  useEffect(() => {
    dispatch({ type: "sync", payload: filters });
  }, [filters]);

  const filterSummary = useMemo(
    () => [state.category, state.mode].filter(Boolean).join(" • "),
    [state.category, state.mode],
  );

  function navigate(nextState: JobFilters) {
    const query = toQueryString(nextState);
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  return (
    <Card className="rounded-[1.75rem] bg-[color:rgba(160,183,164,0.15)] p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--sage-deep)]">
          Search
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--sage-deep)]">
          <SlidersHorizontal className="size-3.5" />
          {filterSummary || "All roles"}
        </span>
      </div>
      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          navigate(state);
        }}
      >
        <label className="block">
          <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
            Role or keyword
          </span>
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--line-strong)] bg-white/90 px-4 py-3 focus-within:border-[color:var(--sage-deep)]">
            <Search className="size-4 text-[color:var(--sage-deep)]" />
            <Input
              className="border-0 bg-transparent px-0 py-0"
              maxLength={120}
              onChange={(event) =>
                dispatch({ type: "set-q", value: event.target.value })
              }
              placeholder="Product, NGO, operations..."
              value={state.q}
            />
          </div>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
            Category
          </span>
          <Select
            onChange={(event) =>
              dispatch({ type: "set-category", value: event.target.value })
            }
            value={state.category}
          >
            <option value="">All categories</option>
            {getCategoryOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[color:rgba(36,49,40,0.72)]">
            Work mode
          </span>
          <Select
            onChange={(event) =>
              dispatch({ type: "set-mode", value: event.target.value })
            }
            value={state.mode}
          >
            <option value="">Any mode</option>
            {getModeOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </label>
        <div className="flex gap-3">
          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Refine results"}
          </Button>
          <Button
            onClick={() => {
              const nextState = { q: "", category: "", mode: "" };
              dispatch({ type: "reset" });
              navigate(nextState);
            }}
            type="button"
            variant="secondary"
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}
