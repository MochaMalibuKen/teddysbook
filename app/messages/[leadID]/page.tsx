type LeadPageProps = {
  params: Promise<{
    leadID: string;
  }>;
};

export default async function LeadPage({ params }: LeadPageProps) {
  const { leadID } = await params;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
