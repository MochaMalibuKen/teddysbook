"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug?: string | null;
  mascot_url?: string | null;
};

export default function RequestPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Form state
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("ASAP");
  const [budget, setBudget] = useState("");

  // Contact info (advanced)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [preferredContactTime, setPreferredContactTime] = useState("");

  // Photo URLs (simple, multi)
  const [photoUrls, setPhotoUrls] = useState<string[]>([""]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      setLoadingCategories(true);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error loading categories:", error);
        setErrorMsg("Could not load categories. Please try again shortly.");
      } else if (data) {
        setCategories(data as Category[]);
      }

      setLoadingCategories(false);
    }

    loadCategories();
  }, []);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  function updatePhotoUrl(index: number, value: string) {
    setPhotoUrls((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function addPhotoField() {
    setPhotoUrls((prev) => [...prev, ""]);
  }

  function removePhotoField(index: number) {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!categoryId) {
      setErrorMsg("Please choose a category so Teddy knows who to call.");
      return;
    }
    if (!description.trim()) {
      setErrorMsg("Tell Teddy a bit about what you need.");
      return;
    }
    if (!customerName.trim()) {
      setErrorMsg("Please enter your name so pros know who to contact.");
      return;
    }
    if (!customerPhone.trim() && !customerEmail.trim()) {
      setErrorMsg("Please provide at least a phone number or email.");
      return;
    }

    setSubmitting(true);

    try {
      // Build a rich description that includes contact info without changing schema
      const fullDescription = [
        `Name: ${customerName}`,
        customerPhone ? `Phone: ${customerPhone}` : null,
        customerEmail ? `Email: ${customerEmail}` : null,
        preferredContactTime
          ? `Preferred contact time: ${preferredContactTime}`
          : null,
        "",
        "Job details:",
        description,
      ]
        .filter(Boolean)
        .join("\n");

      const cleanPhotoUrls = photoUrls.map((u) => u.trim()).filter(Boolean);

      // Insert into customer_requests
      const { data: requestData, error: requestError } = await supabase
        .from("customer_requests")
        .insert([
          {
            category: selectedCategory?.name || "",
            description: fullDescription,
            location: location || null,
            urgency: urgency || null,
            budget: budget ? Number(budget) : null,
            photos: cleanPhotoUrls.length > 0 ? cleanPhotoUrls : null,
          },
        ])
        .select()
        .single();

      if (requestError || !requestData) {
        console.error("Error creating customer request:", requestError);
        setErrorMsg("Something went wrong saving your request. Please try again.");
        setSubmitting(false);
        return;
      }

      // Auto-create a lead linked to this request
      const { error: leadError } = await supabase.from("leads").insert([
        {
          request_id: requestData.id,
          status: "new",
          estimated_value: budget ? Number(budget) : null,
          // estimated_tier & ai_confidence can be added later
        },
      ]);

      if (leadError) {
        console.error("Error creating lead:", leadError);
        // Even if lead creation fails, the request is saved. You can decide later if you want to block.
      }

      // Redirect to success page
      router.push("/request/success");
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Unexpected error. Please try again.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 lg:flex-row">
      {/* Left column: Form */}
      <div className="w-full lg:w-2/3 space-y-6">
        <div>
          <Link
            href="/"
            className="text-xs font-semibold text-teddy-blue hover:underline"
          >
            ← Back to home
          </Link>
        </div>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Tell Teddy what you need
          </h1>
          <p className="text-sm text-gray-600">
            One simple form. Teddy&apos;s Book will match you with trusted local pros.
          </p>
        </header>

        {errorMsg && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category + mascot preview combo */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700">
              What type of help do you need?
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={loadingCategories}
            >
              <option value="">
                {loadingCategories ? "Loading categories…" : "Choose a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500">
              Teddy will route your request to pros who match this category.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Your info
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-700">
                  Phone <span className="text-[10px] text-gray-500">(optional)</span>
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Best number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-700">
                  Email <span className="text-[10px] text-gray-500">(optional)</span>
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="you@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-700">
                  Preferred contact time{" "}
                  <span className="text-[10px] text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="e.g., Evenings after 5pm"
                  value={preferredContactTime}
                  onChange={(e) => setPreferredContactTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Job details */}
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Job details
            </p>

            <div className="space-y-1">
              <label className="text-xs text-gray-700">Describe what you need</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={4}
                placeholder="Tell Teddy what’s going on, where, and anything special the pro should know."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs text-gray-700">
                  Your area (city / ZIP)
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="e.g., Aiken, 29801"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-700">Urgency</label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="ASAP">ASAP</option>
                  <option value="Soon (next few days)">
                    Soon (next few days)
                  </option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-700">
                Approximate budget{" "}
                <span className="text-[10px] text-gray-500">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">$</span>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder="e.g., 200"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
              <p className="text-[11px] text-gray-500">
                A rough estimate helps pros decide if they’re a good fit.
              </p>
            </div>
          </div>

          {/* Photos (multi URL for now) */}
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Photos <span className="text-[10px] text-gray-500">(optional)</span>
            </p>
            <p className="text-[11px] text-gray-500">
              If you have links to photos (Google Drive, iCloud, etc.), paste them
              below. We’ll add direct uploads later.
            </p>

            <div className="space-y-2">
              {photoUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder="https://example.com/photo.jpg"
                    value={url}
                    onChange={(e) => updatePhotoUrl(index, e.target.value)}
                  />
                  {photoUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhotoField(index)}
                      className="rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPhotoField}
              className="text-xs font-semibold text-teddy-blue hover:underline"
            >
              + Add another photo link
            </button>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center rounded-full bg-teddy-blue px-6 py-2.5 text-sm font-semibold text-white shadow-teddy-card hover:bg-teddy-teal transition disabled:opacity-60"
            >
              {submitting ? "Sending to Teddy…" : "Submit request to Teddy"}
            </button>
          </div>
        </form>
      </div>

      {/* Right column: Category mascot preview */}
      <aside className="w-full lg:w-1/3 space-y-4">
        <div className="sticky top-20">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Teddy helper for this job
            </p>

            {selectedCategory && selectedCategory.mascot_url ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-32 w-32">
                  <Image
                    src={selectedCategory.mascot_url}
                    alt={`${selectedCategory.name} Teddy`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center">
                  {selectedCategory.name} Teddy
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Once you submit, Teddy will quietly match you with a few local
                  pros who fit this category.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-teddy-neutral">
                  <span className="text-3xl">🧸</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center">
                  Choose a category to see your Teddy helper.
                </p>
                <p className="text-xs text-gray-500 text-center">
                  Each Teddy avatar represents a type of local pro Teddy’s Book
                  can connect you with.
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}