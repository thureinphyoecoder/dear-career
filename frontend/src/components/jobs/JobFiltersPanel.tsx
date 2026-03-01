"use client";

import { useEffect, useReducer, useTransition } from "react";
import { Funnel, Search, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { CATEGORY_OPTIONS, MODE_OPTIONS, TYPE_OPTIONS, createPageHref } from "@/lib/api";
import { getDictionary } from "@/lib/i18n";
import type { JobFilters } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type State = Pick<JobFilters, "q" | "category" | "type" | "mode">;

type Action =
  | { type: "set"; field: keyof State; value: string }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  if (action.type === "reset") {
    return { q: "", category: "", type: "", mode: "" };
  }

  return { ...state, [action.field]: action.value };
}

export function JobFiltersPanel({
  filters,
  mode = "page",
}: {
  filters: JobFilters;
  mode?: "page" | "compact";
}) {
  const [state, dispatch] = useReducer(reducer, {
    q: filters.q,
    category: filters.category,
    type: filters.type,
    mode: filters.mode,
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const dictionary = getDictionary(filters.lang);

  useEffect(() => {
    dispatch({ type: "set", field: "q", value: filters.q });
    dispatch({ type: "set", field: "category", value: filters.category });
    dispatch({ type: "set", field: "type", value: filters.type });
    dispatch({ type: "set", field: "mode", value: filters.mode });
  }, [filters.category, filters.mode, filters.q, filters.type]);

  function apply(nextState: State) {
    startTransition(() => {
      const targetPath = mode === "compact" ? "/jobs" : pathname;
      router.push(
        createPageHref(targetPath, {
          ...filters,
          ...nextState,
          page: 1,
        }),
      );
    });
  }

  function handleSubmit(formData: FormData) {
    const nextState: State = {
      q: String(formData.get("q") ?? ""),
      category: String(formData.get("category") ?? ""),
      type: String(formData.get("type") ?? ""),
      mode: String(formData.get("mode") ?? ""),
    };

    apply(nextState);
  }

  function toggleChip(field: keyof State, value: string) {
    const nextValue = state[field] === value ? "" : value;
    const nextState = { ...state, [field]: nextValue };
    dispatch({ type: "set", field, value: nextValue });
    apply(nextState);
  }

  function reset() {
    dispatch({ type: "reset" });
    apply({ q: "", category: "", type: "", mode: "" });
  }

  const categoryOptions = filters.lang === "mm"
    ? CATEGORY_OPTIONS.map((item) => ({ value: item.value, label: item.labelMm }))
    : CATEGORY_OPTIONS.map((item) => ({ value: item.value, label: item.labelEn }));
  const typeOptions = filters.lang === "mm"
    ? TYPE_OPTIONS.map((item) => ({ value: item.value, label: item.labelMm }))
    : TYPE_OPTIONS.map((item) => ({ value: item.value, label: item.labelEn }));
  const modeOptions = filters.lang === "mm"
    ? MODE_OPTIONS.map((item) => ({ value: item.value, label: item.labelMm }))
    : MODE_OPTIONS.map((item) => ({ value: item.value, label: item.labelEn }));

  return (
    <form
      action={handleSubmit}
      className={cn(
        "rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5",
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-[color:var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
            <Funnel className="size-4 text-[color:var(--color-primary)]" />
            {dictionary.nav.jobs}
          </div>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[color:var(--color-muted)]">
            Filter only what matters, then read the trusted source before applying.
          </p>
        </div>
        <span className="hidden rounded-[10px] border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-2 text-[color:var(--color-primary)] sm:inline-flex">
          <Sparkles className="size-4" />
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="relative">
          <span className="sr-only">Search jobs</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[color:var(--color-muted)]" />
          <Input defaultValue={state.q} name="q" className="pl-11" placeholder="Job title / company / location" />
        </label>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Select defaultValue={state.category} name="category">
            <option value="">Category</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select defaultValue={state.type} name="type">
            <option value="">Type</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select defaultValue={state.mode} name="mode">
            <option value="">Mode</option>
            {modeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition",
                state.category === option.value
                  ? "border-[color:var(--color-text)] bg-[color:var(--color-text)] text-white"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] text-[color:var(--color-text)] hover:bg-[#fbfbf8]",
              )}
              key={option.value}
              onClick={() => toggleChip("category", option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-[color:var(--color-border)] pt-4">
          <Button disabled={isPending} type="submit">
            {isPending ? "..." : dictionary.nav.jobs}
          </Button>
          <Button onClick={reset} type="button" variant="secondary">
            {dictionary.common.reset}
          </Button>
        </div>
      </div>
    </form>
  );
}
