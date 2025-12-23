export const dynamic = "force-dynamic";

import type { Lead } from "@/lib/types";

type Message = {
  id: string;
  leadId: string;
  senderName?: string;
  body: string;
  createdAt: string;
};

type LeadPageProps = {
  params: Promise<{
    leadId: string;
  }>;
};

export default async function LeadPage({ params }: LeadPageProps) {
  const { leadId } = await params;

  const lead: Lead | null = null;
  void lead;

  const messages: Message[] = [];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lead Messages</h1>
      <p>Lead ID: {leadId}</p>

      <section>
        <h2>Messages</h2>
        {messages.length === 0 && <p>No messages yet.</p>}
      </section>
    </div>
  );
}
