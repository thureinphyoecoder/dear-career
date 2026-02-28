import type { AdminSession } from "@/lib/types";

export function getAdminSession(): AdminSession {
  const configured = Boolean(process.env.ADMIN_API_KEY);

  return {
    isAuthenticated: configured,
    label: configured ? "Configured locally" : "Not configured",
  };
}
