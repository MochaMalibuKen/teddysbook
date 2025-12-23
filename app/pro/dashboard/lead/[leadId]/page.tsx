export const dynamic = "force-dynamic";

type Lead = Record<string, unknown>;
type Message = Record<string, unknown>;

type LeadPageParams = {
  leadId?: string;
};

type LeadPageProps = {
  params: Promise<LeadPageParams> | LeadPageParams;
  searchParams?: Promise<Record<string, string | string[]>> | Record<string, string | string[]>;
};

export default async function LeadPage({
  params,
  searchParams,
}: LeadPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;

  const { leadId } = resolvedParams;

  const messages: Message[] = [];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadId}</p>

      <section>
        <h2>Messages</h2>
        {messages.length === 0 && <p>No messages yet.</p>}
      </section>
    </div>
  );
}
