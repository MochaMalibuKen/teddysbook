"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Lead {
  id: string;
  request_id: string;
  status: string;
  estimated_value: number | null;
  estimated_tier: string | null;
  ai_confidence: number | null;
  created_at: string;
}

interface CustomerRequest {
  id: string;
  category: string;
  description: string;
  location: string | null;
  urgency: string | null;
  budget: number | null;
  photos: string[] | null;
  created_at: string;
}

interface Message {
  id: string;
  lead_id: string;
  sender_role: string;
  sender_name: string | null;
  body: string;
  created_at: string;
  read_by_pro: boolean | null;
  read_by_customer: boolean | null;
}

export default function LeadDetailsPage({ params }: { params: any }) {
  const { leadId } = params || {};

  const [lead, setLead] = useState<Lead | null>(null);
  const [request, setRequest] = useState<CustomerRequest | null>(null);
  const [loading, setLoading] = useState(true);

  // Messaging state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingBody, setEditingBody] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const loadMessages = useCallback(
    async (leadId: string, opts?: { silent?: boolean }) => {
      if (!opts?.silent) {
        // optional place for a spinner
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error);
        return;
      }

      const msgs = (data as Message[]) || [];
      setMessages(msgs);

      const unreadCustomerIds = msgs
        .filter((m) => m.sender_role === "customer" && !m.read_by_pro)
        .map((m) => m.id);

      if (unreadCustomerIds.length > 0) {
        await supabase
          .from("messages")
          .update({ read_by_pro: true })
          .in("id", unreadCustomerIds);
      }

      scrollToBottom();
    },
    []
  );

  const loadLeadData = useCallback(async () => {
    setLoading(true);

    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !leadData) {
      console.error("Lead not found:", leadError);
      setLoading(false);
      return;
    }

    setLead(leadData as Lead);

    const { data: reqData, error: reqError } = await supabase
      .from("customer_requests")
      .select("*")
      .eq("id", leadData.request_id)
      .single();

    if (reqError) console.error("Customer request load failed:", reqError);

    setRequest(reqData as CustomerRequest);
    await loadMessages(leadData.id);

    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(() => {
      loadMessages(leadData.id, { silent: true });
    }, 3000);

    setLoading(false);
  }, [leadId, loadMessages]);

  useEffect(() => {
    loadLeadData();
  }, [loadLeadData]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!lead || !newMessage.trim()) return;

    setSending(true);

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            lead_id: lead.id,
            sender_role: "pro",
            sender_name: "Admin",
            body: newMessage.trim(),
            read_by_pro: true,
            read_by_customer: false,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
      } else if (data) {
        setMessages((prev) => [...prev, data as Message]);
        setNewMessage("");
        scrollToBottom();
      }
    } finally {
      setSending(false);
      setTyping(false);
    }
  }

  function handleTypingChange(value: string) {
    setNewMessage(value);
    if (!typing) setTyping(true);
    setTimeout(() => setTyping(false), 1500);
  }

  function startEditing(message: Message) {
    if (message.sender_role !== "pro") return;
    setEditingId(message.id);
    setEditingBody(message.body);
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editingBody.trim()) {
      setEditingId(null);
      return;
    }

    const { error } = await supabase
      .from("messages")
      .update({ body: editingBody.trim() })
      .eq("id", editingId);

    if (error) {
      console.error("Error editing message:", error);
      return;
    }

    setMessages((prev) =>
      prev.map((m) => (m.id === editingId ? { ...m, body: editingBody.trim() } : m))
    );
    setEditingId(null);
    setEditingBody("");
  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-600">Loading lead details…</p>
      </div>
    );
  }

  if (!lead || !request) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600">Lead not found.</p>
        <Link
          href="/pro/dashboard"
          className="mt-4 inline-block text-teddy-blue font-semibold hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl p-6 pb-24 space-y-8">
        <Link
          href="/pro/dashboard"
          className="inline-block text-sm font-semibold text-teddy-blue hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
          <p className="text-sm text-gray-600">
            Lead ID: <span className="font-mono">{lead.id}</span>
          </p>
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Lead Summary</h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Status</p>
              <p className="text-gray-600">{lead.status || "new"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Estimated Value</p>
              <p className="text-gray-600">
                {lead.estimated_value ? `$${lead.estimated_value}` : "—"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Tier</p>
              <p className="text-gray-600">{lead.estimated_tier || "—"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">AI Confidence</p>
              <p className="text-gray-600">
                {lead.ai_confidence ? `${lead.ai_confidence}%` : "—"}
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-gray-700">Created</p>
              <p className="text-gray-600">
                {new Date(lead.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">Customer Request</h2>
          <div>
            <p className="font-semibold text-gray-700">Category</p>
            <p className="text-gray-600">{request.category}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Description</p>
            <p className="text-gray-600 whitespace-pre-line">{request.description}</p>
          </div>
          {request.location && (
            <div>
              <p className="font-semibold text-gray-700">Location</p>
              <p className="text-gray-600">{request.location}</p>
            </div>
          )}
          {request.urgency && (
            <div>
              <p className="font-semibold text-gray-700">Urgency</p>
              <p className="text-gray-600">{request.urgency}</p>
            </div>
          )}
          {request.budget !== null && (
            <div>
              <p className="font-semibold text-gray-700">Budget</p>
              <p className="text-gray-600">
                {request.budget ? `$${request.budget}` : "—"}
              </p>
            </div>
          )}
          {request.photos && Array.isArray(request.photos) && request.photos.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold text-gray-700">Photos</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {request.photos.map((url: string, i: number) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                  >
                    <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center rounded-full bg-teddy-blue px-4 py-2 text-sm font-semibold text-white hover:bg-teddy-teal transition"
            >
              💬 Message customer
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Next Actions (Coming Soon)</h2>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Assign this lead to a specific pro</li>
            <li>Mark lead as quoted or closed</li>
            <li>Generate invoice or payment link</li>
          </ul>
          <p className="text-xs text-gray-500">
            Messaging is live. Assignments and billing flows will plug in next.
          </p>
        </section>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 transform border-t border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${
          chatOpen ? "translate-y-0" : "translate-y-[70%]"
        }`}
      >
        <div className="flex items-center justify-center pt-1">
          <button
            type="button"
            onClick={() => setChatOpen((open) => !open)}
            className="h-1.5 w-14 rounded-full bg-gray-300"
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <div>
            <p className="text-xs font-semibold text-gray-700">
              Messages for Lead {lead.id.slice(0, 8)}…
            </p>
            {typing && <p className="text-[11px] text-gray-500">You’re typing…</p>}
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto px-4 py-3 space-y-2 text-sm">
          {messages.length === 0 ? (
            <p className="text-xs text-gray-500">No messages yet. Say hello!</p>
          ) : (
            messages.map((msg) => {
              const isPro = msg.sender_role === "pro";
              const isEditing = editingId === msg.id;

              return (
                <div key={msg.id} className={`flex ${isPro ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                      isPro
                        ? "bg-teddy-blue text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}
                  >
                    <div className="text-[10px] opacity-80 mb-0.5">
                      {msg.sender_name || (isPro ? "Pro" : "Customer")}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleSaveEdit} className="space-y-1">
                        <textarea
                          className="w-full rounded-md border border-gray-300 px-1 py-1 text-xs text-gray-900"
                          rows={2}
                          value={editingBody}
                          onChange={(e) => setEditingBody(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            className="text-[10px] underline"
                            onClick={() => {
                              setEditingId(null);
                              setEditingBody("");
                            }}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="text-[10px] font-semibold underline">
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="whitespace-pre-line text-[13px]">{msg.body}</p>
                    )}

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="text-[9px] opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>

                      {isPro && !isEditing && (
                        <button
                          type="button"
                          onClick={() => startEditing(msg)}
                          className="text-[9px] underline opacity-80 hover:opacity-100"
                        >
                          Edit
                        </button>
                      )}

                      {!isPro && msg.read_by_pro && (
                        <span className="ml-auto text-[9px] italic opacity-70">Read</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 border-t border-gray-200 px-4 py-2"
        >
          <input
            type="text"
            className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm"
            placeholder="Type a message…"
            value={newMessage}
            onChange={(e) => handleTypingChange(e.target.value)}
          />
          <button
            type="submit"
            disabled={sending || !newMessage.trim()}
            className="rounded-full bg-teddy-blue px-4 py-2 text-xs font-semibold text-white hover:bg-teddy-teal transition disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}
