import LeadDetailsPage from "../../../../pro/dashboard/lead/[leadId]/page";

export default async function LocalizedLeadDetailsPage({
  params,
}: {
  params?: Promise<{ leadId: string }>;
}) {
  const resolvedParams = params ? await params : undefined;
  return <LeadDetailsPage params={resolvedParams as any} />;
}
