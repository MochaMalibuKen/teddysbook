export const dynamic = "force-dynamic";

type LeadPageProps = {
  params: {
    locale: string;
    leadId: string;
  };
  searchParams?: Record<string, string | string[]>;
};

export default async function LeadPage({
  params,
  searchParams,
}: LeadPageProps) {
  // intentionally unused for now
  void searchParams;

  const { leadId, locale } = params;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Dashboard</h1>
      <p>Locale: {locale}</p>
      <p>Lead ID: {leadId}</p>
    </div>
  );
}
