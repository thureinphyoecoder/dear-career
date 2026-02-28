import type { ReactNode } from "react";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <main className="px-4 py-6 text-[color:var(--foreground)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-[var(--shadow)] backdrop-blur-xl sm:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
}
