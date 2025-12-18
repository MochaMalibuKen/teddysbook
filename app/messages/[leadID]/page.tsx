export default async function LeadPage({
  params,
  searchParams, // included for Next PageProps compatibility
}: {
  params?: any;
  searchParams?: any;
}) {
  const isPromiseLike = (value: unknown): value is Promise<unknown> =>
    (typeof value === "object" || typeof value === "function") &&
    value !== null &&
    "then" in value;

  const resolvedParams = isPromiseLike(params) ? await params : params ?? {};
  const { leadID } = resolvedParams as { leadID?: string };
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
// Mark dynamic to keep this route server-rendered and recognized as a module
export const dynamic = "force-dynamic";
