import Link from "next/link";

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-10">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-teddy-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-teddy-blue mb-2">
          Pros + Partners
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Join Teddy’s Book and reach the right customers.
        </h1>
        <p className="text-sm text-slate-700 mb-6">
          Tell us about your business and service area. Once approved, you’ll see
          local leads and can message customers directly through Teddy.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/pro/join"
            className="inline-flex items-center justify-center rounded-full bg-teddy-blue px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teddy-teal"
          >
            Start Pro Application
          </Link>
          <Link
            href="/pro/onboarding"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-teddy-blue hover:text-teddy-blue"
          >
            Resume onboarding
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["Fast approvals", "No subscriptions", "Localized leads"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-slate-900">{item}</h3>
            <p className="mt-1 text-xs text-slate-600">
              Teddy keeps it simple so you can focus on great service.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
