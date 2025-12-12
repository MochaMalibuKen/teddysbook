interface LeadPageProps {
  params: { leadID: string };
}

export default function LeadPage({ params }: LeadPageProps) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {params.leadID}</p>
    </div>
  );
}
