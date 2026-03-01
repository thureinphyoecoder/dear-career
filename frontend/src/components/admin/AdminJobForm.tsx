import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_OPTIONS, MODE_OPTIONS, TYPE_OPTIONS, getAdminJobDefaults, getTrustedSources } from "@/lib/api";
import type { AdminJobFormState } from "@/lib/types";

export function AdminJobForm({
  action,
  state,
  disabled,
}: {
  action: (formData: FormData) => void | Promise<void>;
  state: AdminJobFormState;
  disabled: boolean;
}) {
  const defaults = getAdminJobDefaults();
  const sources = getTrustedSources();

  return (
    <Card className="p-6">
      <form action={action} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium">Source</span>
            <Select defaultValue={defaults.source_slug} name="source_slug" required>
              <option value="">Select source</option>
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Source URL</span>
            <Input defaultValue={defaults.source_url} name="source_url" required />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Title</span>
            <Input defaultValue={defaults.title} name="title" required />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Company</span>
            <Input defaultValue={defaults.company} name="company" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Location</span>
            <Input defaultValue={defaults.location} name="location" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Salary</span>
            <Input defaultValue={defaults.salary} name="salary" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Employment type</span>
            <Select defaultValue={defaults.employment_type} name="employment_type">
              <option value="">Select type</option>
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.labelEn}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Work mode</span>
            <Select defaultValue={defaults.work_mode} name="work_mode">
              <option value="">Select mode</option>
              {MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.labelEn}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Category</span>
            <Select defaultValue={defaults.category} name="category">
              <option value="">Select category</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.labelEn}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Original application URL</span>
            <Input defaultValue={defaults.apply_url} name="apply_url" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Published at</span>
            <Input defaultValue={defaults.published_at} name="published_at" type="datetime-local" />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium">Expires at</span>
            <Input defaultValue={defaults.expires_at} name="expires_at" type="datetime-local" />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm font-medium">Description (MM)</span>
          <Textarea defaultValue={defaults.description_mm} name="description_mm" />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium">Description (EN)</span>
          <Textarea defaultValue={defaults.description_en} name="description_en" />
        </label>

        <div className="flex flex-wrap gap-5 text-sm">
          <label className="inline-flex items-center gap-2">
            <input defaultChecked={defaults.is_verified_source} name="is_verified_source" type="checkbox" value="1" />
            Verified source
          </label>
          <label className="inline-flex items-center gap-2">
            <input defaultChecked={defaults.is_active} name="is_active" type="checkbox" value="1" />
            Active
          </label>
        </div>

        <p className="text-sm text-[color:var(--color-muted)]">
          Dear Career does not collect CVs here. Users are sent directly to the original job listing or source page.
        </p>

        {state.message ? (
          <p className={state.status === "error" ? "text-sm text-[color:var(--color-danger)]" : "text-sm text-[color:var(--color-success)]"}>
            {state.message}
          </p>
        ) : null}

        <Button disabled={disabled} type="submit">
          Submit job
        </Button>
      </form>
    </Card>
  );
}
