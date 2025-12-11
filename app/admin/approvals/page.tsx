"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Pro {
  id: string;
  business_name: string | null;
  phone: string | null;
  description: string | null;
  status: string;
  teddy_image: string | null;
  pro_teddy_image: string | null;
  category_ids: string[] | null;
  service_area: string | null;
  created_at: string;
}

export default function AdminApprovalPage() {
  const [pros, setPros] = useState<Pro[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Replace this with your real admin email
  const ADMIN_EMAIL = "k.allen@vthreeagency.com"; 

  async function loadPros() {
    setLoading(true);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      alert("You must be logged in.");
      return;
    }

    // Security check
    if (auth.user.email !== ADMIN_EMAIL) {
      alert("Access denied. Admins only.");
      return;
    }

    setIsAdmin(true);

    const { data, error } = await supabase
      .from("pros")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (!error && data) setPros(data as Pro[]);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPros();
  }, []);


  async function approvePro(id: string) {
    const { error } = await supabase
      .from("pros")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) alert("Error approving pro");
    else loadPros();
  }

  async function rejectPro(id: string) {
    const { error } = await supabase
      .from("pros")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) alert("Error rejecting pro");
    else loadPros();
  }

  if (!isAdmin) {
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        Checking admin permissions…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-teddy-blue">
        🧸 Pending Pro Approvals
      </h1>

      {loading ? (
        <p className="text-slate-500">Loading pending accounts…</p>
      ) : pros.length === 0 ? (
        <p className="text-slate-500">No pending pros. All caught up!</p>
      ) : (
        <div className="space-y-6">
          {pros.map((pro) => (
            <div
              key={pro.id}
              className="rounded-xl border bg-white p-6 shadow-teddy-card space-y-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    pro.pro_teddy_image ||
                    pro.teddy_image ||
                    "/placeholder.png"
                  }
                  alt="Mascot"
                  className="h-20 w-20 rounded-xl shadow"
                  width={80}
                  height={80}
                />

                <div>
                  <h2 className="text-xl font-semibold">
                    {pro.business_name || "Unnamed Business"}
                  </h2>
                  <p className="text-slate-600">{pro.phone}</p>
                  <p className="text-sm text-slate-500">
                    Joined: {new Date(pro.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-slate-700 mb-1">
                  Business Description
                </h3>
                <p className="text-slate-600 text-sm">
                  {pro.description || "No description provided."}
                </p>
              </div>

              <div className="pt-2 text-sm space-y-2">
                <p>
                  <strong>Categories:</strong> {pro.category_ids?.join(", ")}
                </p>
                <p>
                  <strong>Service Area (ZIPs):</strong> {pro.service_area}
                </p>
              </div>

              {/* Approve / Reject Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => approvePro(pro.id)}
                  className="rounded-xl bg-teddy-green px-4 py-2 text-white font-semibold shadow hover:bg-green-600"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectPro(pro.id)}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white font-semibold shadow hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
