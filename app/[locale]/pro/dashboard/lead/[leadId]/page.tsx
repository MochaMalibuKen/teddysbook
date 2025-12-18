import LeadDetailsPage from "../../../../pro/dashboard/lead/[leadId]/page";

export default async function LocalizedLeadDetailsPage({
  params,
  searchParams, // included to satisfy Next PageProps shape
}: {
  params?: Promise<any>;
  searchParams?: Promise<any>;
}) {
  const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <LeadDetailsPage params={resolvedParams} searchParams={resolvedSearchParams} />;
}
