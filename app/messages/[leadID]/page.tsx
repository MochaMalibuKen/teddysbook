type LeadPageProps = {
  params: {
    leadID: string;
  };
};

export default function LeadPage({ params }: LeadPageProps) {
  const { leadID } = params;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadID}</p>
    </div>
  );
}
