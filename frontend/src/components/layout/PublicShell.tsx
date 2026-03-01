import { Suspense, type ReactNode } from "react";
import { BottomNav } from "@/components/site/BottomNav";
import { RouteBar } from "@/components/site/RouteBar";
import { TopBar } from "@/components/site/TopBar";

function TopBarFallback() {
  return <div className="h-[88px] rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80" />;
}

function BottomNavFallback() {
  return <div className="fixed inset-x-4 bottom-4 h-[72px] rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 md:hidden" />;
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1380px] flex-col px-4 pb-24 pt-4 sm:px-6 lg:px-10">
        <Suspense fallback={<TopBarFallback />}>
          <TopBar />
        </Suspense>
        <Suspense fallback={null}>
          <RouteBar />
        </Suspense>
        <main className="flex-1 py-8 lg:py-10">{children}</main>
      </div>
      <Suspense fallback={<BottomNavFallback />}>
        <BottomNav />
      </Suspense>
    </div>
  );
}
