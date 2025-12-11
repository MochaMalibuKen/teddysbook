import LeadDetailsPage from "../../../../pro/dashboard/lead/[leadId]/page";

export default function LocalizedLeadDetailsPage({ params }: { params: { leadId: string } }) {
  return <LeadDetailsPage params={params} />;
}
