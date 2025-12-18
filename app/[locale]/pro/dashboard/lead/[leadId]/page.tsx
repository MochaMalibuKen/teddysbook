import LeadDetailsPage from "../../../../pro/dashboard/lead/[leadId]/page";

export default async function LocalizedLeadDetailsPage({
  params,
  searchParams, // included to satisfy Next PageProps shape
}: {
  params?: Promise<{ leadId: string }>;
  searchParams?: Promise<Record<string, unknown>>;
}) {
  const resolvedParams: any = params ? await Promise.resolve(params) : { leadId: "" };
  const resolvedSearchParams: any = searchParams ? await Promise.resolve(searchParams) : undefined;

  return <LeadDetailsPage params={resolvedParams} searchParams={resolvedSearchParams} />;
}
