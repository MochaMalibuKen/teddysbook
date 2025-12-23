export const dynamic = "force-dynamic";

type LeadPageParams = {
  locale: string;
  leadId: string;
};

type LeadPageProps = {
  params: Promise<LeadPageParams>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function LeadPage({
  params,
  searchParams,
}: LeadPageProps) {
  const resolvedParams = await params;
  const { leadId, locale } = resolvedParams;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  void resolvedSearchParams;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Dashboard</h1>
      <p>Locale: {locale}</p>
      <p>Lead ID: {leadId}</p>
    </div>
  );
}
