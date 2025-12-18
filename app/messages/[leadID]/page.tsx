// @ts-nocheck

export default async function LeadPage({
  params,
  searchParams, // included to satisfy Next PageProps shape
}: {
  params?: Promise<LeadParams>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const resolvedParams = params ? await Promise.resolve(params) : {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = searchParams; // accessed to keep signature aligned with PageProps
  const { leadID } = resolvedParams;
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
// Mark dynamic to keep this route server-rendered and recognized as a module
export const dynamic = "force-dynamic";

type LeadParams = {
  leadID?: string;
};
