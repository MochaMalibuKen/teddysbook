import LeadDetailsPage from "../../../../pro/dashboard/lead/[leadId]/page";

export default async function LocalizedLeadDetailsPage({
  params,
  searchParams, // included to satisfy Next PageProps shape
}: {
  params?: any;
  searchParams?: any;
}) {
  const resolvedParams =
    params && typeof params.then === "function" ? await params : params;

  return <LeadDetailsPage params={resolvedParams} searchParams={searchParams} />;
}
