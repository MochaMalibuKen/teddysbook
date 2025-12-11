"use client";

import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProOnboardingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  type Category = { id: string; name: string; teddyImage: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [teddyImage, setTeddyImage] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Load user session + categories
  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        router.push("/pro/join");
        return;
      }
      setUser(auth.user);

      const { data: cats } = await supabase.from("categories").select("*");
      setCategories((cats as Category[]) || []);
    }
    void load();
  }, [router]);

  function toggleCategory(catId: string, teddy: string) {
    let updated;
    if (selectedCategories.includes(catId)) {
      updated = selectedCategories.filter((c) => c !== catId);
    } else {
      updated = [...selectedCategories, catId];
    }
    setSelectedCategories(updated);

    // When selecting first category, update mascot preview
    if (!selectedCategories.includes(catId)) {
      setTeddyImage(teddy);
    }
  }

  async function handleSubmit() {
    if (!user) {
      alert("You must be signed in first.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("pros").insert([
      {
        id: user.id,
        business_name: businessName,
        phone,
        description,
        status: "pending",
        visibility: false,
        category_ids: selectedCategories,
        service_area: zipCodes,
        teddy_image: teddyImage,
        pro_teddy_image:
          "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pro_teddy.png",
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error saving profile");
      return;
    }

    router.push("/pro/dashboard");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-teddy-blue mb-6">
        🧸 Become a Teddy’s Book Pro
      </h1>

      {/* Mascot Preview */}
      <div className="flex justify-center mb-8">
        {teddyImage ? (
          <Image
            src={teddyImage}
            alt="Mascot preview"
            width={140}
            height={140}
            className="rounded-xl shadow-teddy-card"
          />
        ) : (
          <div className="h-32 w-32 rounded-xl bg-teddy-neutral/50 flex items-center justify-center text-slate-500">
            Select a category
          </div>
        )}
      </div>

      {/* Form */}
      <div className="space-y-6">

        {/* Business Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Business Name
          </label>
          <input
            className="w-full rounded-xl border px-4 py-2"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            className="w-full rounded-xl border px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Multi-category selection */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Select Your Services (multiple)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id, cat.teddyImage)}
                className={`border p-3 rounded-xl flex items-center gap-3 ${
                  selectedCategories.includes(cat.id)
                    ? "bg-teddy-teal text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                <Image
                  src={cat.teddyImage}
                  alt={cat.name}
                  width={40}
                  height={40}
                />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ZIP Codes */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Service Area (ZIP codes, comma separated)
          </label>
          <input
            className="w-full rounded-xl border px-4 py-2"
            value={zipCodes}
            onChange={(e) => setZipCodes(e.target.value)}
            placeholder="29801, 29803, 30907"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Business Description
          </label>
          <textarea
            className="w-full rounded-xl border px-4 py-2 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell customers why they should choose you…"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teddy-blue text-white font-semibold shadow-teddy-card"
        >
          {loading ? "Saving…" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
