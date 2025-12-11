"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  request_id: string;
  status: string;
  estimated_value: number | null;
  estimated_tier: string | null;
  ai_confidence: number | null;
  created_at: string;
  unreadMessages?: number;
  request?: CustomerRequest | null;
}

interface CustomerRequest {
  id: string;
  category: string;
  description: string;
  location: string | null;
  urgency: string | null;
  budget: number | null;
  created_at: string;
}

interface ProRecord {
  id: string;
  business_name: string | null;
  status: string;
  teddy_image: string | null;
  pro_teddy_image: string | null;
}

export default function ProDashboard() {
  const router = useRouter();

  const [pro, setPro] = useState<ProRecord | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadLoading, setLeadLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // -----------------------------------------------------
  // LOAD PRO + STATUS
  // -----------------------------------------------------
  useEffect(() => {
    async function loadPro() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        router.push("/pro/join");
        return;
      }

      const { data: proRecord } = await supabase
        .from("pros")
        .select("*")
        .eq("id", auth.user.id)
        .single();

      setPro(proRecord as ProRecord);
      setLoading(false);
    }

    loadPro();
  }, [router]);

  // -----------------------------------------------------
  // LOAD LEADS (ONLY IF APPROVED)
  // -----------------------------------------------------
  async function loadLeads() {
    setLeadLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) {
      console.error("Lead load error:", error);
      setErrorMsg("Unable to load leads.");
      setLeadLoading(false);
      return;
    }

    const leadsWithDetails = await Promise.all(
      data.map(async (lead) => {
        let request: CustomerRequest | null = null;

        const { data: reqData } = await supabase
          .from("customer_requests")
          .select("*")
          .eq("id", lead.request_id)
          .single();

        request = reqData || null;

        const { count } = await supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("lead_id", lead.id)
          .eq("read_by_pro", false);

        return {
          ...(lead as Lead),
          request,
          unreadMessages: count || 0,
        };
      })
    );

    setLeads(leadsWithDetails);
    setLeadLoading(false);
  }

  useEffect(() => {
    if (pro && pro.status === "approved") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadLeads();
    }
  }, [pro]);

  // -----------------------------------------------------
  // RENDER: LOADING PRO
  // -----------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-lg text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="text-center mt-20 text-slate-600">
        No profile found. Please complete onboarding.
      </div>
    );
  }

  // -----------------------------------------------------
  // 🧸 PENDING APPROVAL SCREEN
  // -----------------------------------------------------
  if (pro.status === "pending") {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-teddy-card p-8 border border-teddy-blue/20">

          {/* Floating Teddy */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <Image
              src={
                pro.pro_teddy_image ||
                "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pro_teddy.png"
              }
              alt="Teddy Mascot"
              width={110}
              height={110}
              className="rounded-xl drop-shadow-xl bg-white dark:bg-slate-800 p-2"
            />
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-teddy-blue">Your Account Is Almost Ready!</h2>

            <p className="text-slate-600 dark:text-slate-400 mt-3">
              🧸 Teddy is reviewing your information now.<br />
              Once approved, you&apos;ll start receiving leads from customers in your area!
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <div className="h-2 w-2 bg-teddy-blue rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-teddy-teal rounded-full animate-bounce delay-150"></div>
              <div className="h-2 w-2 bg-teddy-green rounded-full animate-bounce delay-300"></div>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Typical approval time: within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // 🧸 APPROVED DASHBOARD — WITH CENTERED MASCOT HEADER
  // -----------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

      {/* Header with Pro Teddy */}
      <div className="text-center space-y-4">
        <Image
          src={
            pro.pro_teddy_image ||
            "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pro_teddy.png"
          }
          alt="Pro Teddy"
          width={100}
          height={100}
          className="mx-auto drop-shadow-lg rounded-xl bg-white p-1"
        />

        <h1 className="text-3xl font-bold text-teddy-blue">
          Welcome back{pro.business_name ? `, ${pro.business_name}` : ""}!
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          Here are your most recent leads.
        </p>
      </div>

      {/* Refresh + Add Business Info */}
      <div className="flex justify-end gap-3 mb-4">
        <Link
          href="/pro/join"
          className="rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-900 hover:border-teddy-blue hover:text-teddy-blue"
        >
          Edit business info
        </Link>

        <button
          type="button"
          onClick={loadLeads}
          disabled={leadLoading}
          className="rounded-full bg-teddy-blue px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teddy-teal"
        >
          {leadLoading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {/* Leads Section */}
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {leadLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Loading your leads…</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm text-sm text-gray-700 text-center">
          <p>No leads yet.</p>
          <p className="mt-2">As soon as customers submit requests in your categories, they&apos;ll appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/pro/dashboard/lead/${lead.id}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-[2px] hover:border-teddy-blue/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-700">
                      {lead.status || "new"}
                    </span>
                    <span>{new Date(lead.created_at).toLocaleString()}</span>
                  </div>

                  <h2 className="text-sm font-semibold text-gray-900">
                    {lead.request?.category || "Lead"}
                  </h2>

                  <p className="line-clamp-2 text-sm text-gray-700">
                    {lead.request?.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
                    {lead.request?.location && <span>📍 {lead.request.location}</span>}
                    {lead.request?.urgency && <span>⏱️ {lead.request.urgency}</span>}
                    {lead.request?.budget != null && (
                      <span>💵 ${lead.request?.budget}</span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-gray-600 space-y-1">
                  {lead.estimated_value && (
                    <div className="font-semibold text-gray-900">${lead.estimated_value}</div>
                  )}
                  {lead.estimated_tier && <div>Tier: {lead.estimated_tier}</div>}
                  {typeof lead.ai_confidence === "number" && (
                    <div>AI score: {lead.ai_confidence}%</div>
                  )}
                  {lead.unreadMessages ? (
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-teddy-blue/10 px-2 py-0.5 font-semibold text-teddy-blue">
                      {lead.unreadMessages} new message
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
