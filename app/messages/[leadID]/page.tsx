export const dynamic = "force-dynamic";

type LeadPageProps = {
  params: {
    leadID: string;
  };
  searchParams?: Record<string, string | string[]>;
};

export default async function LeadPage({
  params,
  searchParams,
}: LeadPageProps) {
  // searchParams intentionally unused for now
  void searchParams;

  const { leadID } = params;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
