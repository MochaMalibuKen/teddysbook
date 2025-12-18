export default async function LeadPage({
  params,
}: {
  params?: Promise<LeadParams>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const resolvedParams = params ? await Promise.resolve(params) : {};
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
