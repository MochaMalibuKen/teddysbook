export default async function LeadPage({ params }: { params: Promise<{ leadID: string }> }) {
  const { leadID } = await params;
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
