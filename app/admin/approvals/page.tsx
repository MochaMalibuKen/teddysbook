export default function AdminApprovalPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-teddy-blue">Admin</p>
        <h1 className="text-2xl font-bold text-slate-900">Pending approvals</h1>
        <p className="text-sm text-slate-600">
          Review and approve new providers and requests to keep Teddy’s Book trusted.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">No approvals to review right now.</p>
      </div>
    </main>
  );
}
