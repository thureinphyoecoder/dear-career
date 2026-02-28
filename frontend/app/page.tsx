export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f4efe6,_#e7dcc7_45%,_#d4c3a3)] px-6 text-stone-900">
      <section className="w-full max-w-3xl rounded-[2rem] border border-stone-900/10 bg-white/75 p-10 shadow-[0_24px_80px_rgba(68,52,28,0.16)] backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500">
          Dear Career
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-stone-950">
          Frontend workspace is ready.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
          The default Next.js starter content has been removed so this repo can
          start from a clean baseline.
        </p>
      </section>
    </main>
  );
}
