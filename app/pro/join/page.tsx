"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

type Category = {
  name: string;
  slug: string;
  tagline: string;
  teddyImage: string;
};

const categories: Category[] = [
  {
    name: "Cleaning",
    slug: "cleaning",
    tagline: "Homes, rentals, and offices.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/cleaning_teddy.png",
  },
  {
    name: "Painting",
    slug: "painting",
    tagline: "Interior, exterior, touch-ups and full repaints.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/painting_teddy.png",
  },
  {
    name: "General Contractor",
    slug: "contractor",
    tagline: "Remodels, additions, and larger projects.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/gc_teddy.png",
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    tagline: "Keep homes protected and pest-free.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/pest_control_teddy.png",
  },
  {
    name: "Lawn Care",
    slug: "lawn-care",
    tagline: "Grass, edges, hedges, and tidy yards.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/lawncare_teddy.png",
  },
  {
    name: "Electrical",
    slug: "electrical",
    tagline: "Panels, outlets, lighting, and more.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/electrical_teddy.png",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    tagline: "Leaks, clogs, installs, and repairs.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/plumber_teddy.png",
  },
  {
    name: "HVAC",
    slug: "hvac",
    tagline: "Heating, cooling, and air quality.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/hvac_teddy.png",
  },
  {
    name: "Auto Repair",
    slug: "auto-repair",
    tagline: "Honest local mechanics for your vehicle.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/autos_teddy.png",
  },
  {
    name: "IT Services",
    slug: "it-services",
    tagline: "Home tech, Wi-Fi, and device support.",
    teddyImage:
      "https://syjhashjppfwfsyxmxzv.supabase.co/storage/v1/object/public/teddy-mascots/support_teddy.png",
  },
];

export default function JoinPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    serviceArea: "",
    businessDescription: "",
    yearsExperience: "",
    website: "",
    licenseNumber: "",
    insuranceInfo: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedSlug) {
      setErrorMsg("Please choose your primary service category.");
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ Create a profile row (contact info + role)
      if (!supabase) {
        setErrorMsg("Service is not configured. Please try again later.");
        setSubmitting(false);
        return;
      }
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            full_name: form.contactName,
            email: form.email,
            phone: form.phone,
            role: "pro",
          },
        ])
        .select()
        .single();

      if (profileError || !profile) {
        console.error("Profile insert error:", profileError);
        setErrorMsg("Unable to create profile. Please try again.");
        setSubmitting(false);
        return;
      }

      // 2️⃣ Build a rich description that includes expanded fields
      const compositeDescription = [
        form.businessDescription || "",
        "",
        `Years experience: ${form.yearsExperience || "N/A"}`,
        `License: ${form.licenseNumber || "N/A"}`,
        `Insurance: ${form.insuranceInfo || "N/A"}`,
        `Website: ${form.website || "N/A"}`,
      ]
        .join("\n")
        .trim();

      // 3️⃣ Create a pros row. We use trade = selectedSlug for now.
      const { error: prosError } = await supabase.from("pros").insert([
        {
          business_name: form.businessName,
          trade: selectedSlug, // you can map to category name later if you like
          service_area: form.serviceArea,
          description: compositeDescription,
          status: "pending", // manual approval later
          // visibility: we leave to default; you can toggle later in dashboard
        },
      ]);

      if (prosError) {
        console.error("Pros insert error:", prosError);
        setErrorMsg("Unable to create your business listing. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teddy-neutral">
          {/* subtle Teddy mascot accent */}
          <span className="text-3xl" role="img" aria-label="teddy">
            🧸
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          You’re almost in, Pro Teddy.
        </h1>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          Your profile has been submitted and is currently{" "}
          <span className="font-semibold">pending review</span>. Once approved,
          you’ll be able to access your Pro Dashboard to view and purchase leads.
        </p>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          A future update will add login and email verification. For now, we’ll
          reach out using the contact info you provided.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* Header with subtle mascot accent */}
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teddy-neutral">
          <span className="text-2xl" role="img" aria-label="teddy">
            🧸
          </span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Join Teddy&apos;s trusted local pros.
          </h1>
          <p className="text-sm text-gray-600">
            Tell us about your business so Teddy can send you the right customers.
          </p>
        </div>
      </header>

      {/* Category grid */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">
          Choose your primary category
        </h2>
        <p className="text-xs text-gray-500">
          You can add more services later in your dashboard. For now, pick your
          main trade.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const isSelected = cat.slug === selectedSlug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedSlug(cat.slug)}
                className={`flex items-center gap-3 rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md ${
                  isSelected
                    ? "border-teddy-blue ring-2 ring-teddy-blue/40"
                    : "border-gray-200"
                }`}
              >
                <div className="relative h-12 w-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                  <Image
                    src={cat.teddyImage}
                    alt={cat.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-gray-900">
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-gray-600">
                    {cat.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {errorMsg && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Pro business form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Business name
            </label>
            <input
              type="text"
              name="businessName"
              required
              value={form.businessName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Service area (city or ZIP)
            </label>
            <input
              type="text"
              name="serviceArea"
              required
              value={form.serviceArea}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact name
            </label>
            <input
              type="text"
              name="contactName"
              required
              value={form.contactName}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact phone
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Contact email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Years of experience (approx.)
            </label>
            <input
              type="number"
              name="yearsExperience"
              value={form.yearsExperience}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Business description
          </label>
          <textarea
            name="businessDescription"
            value={form.businessDescription}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="Tell customers what makes you different..."
          ></textarea>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Website or social link (optional)
            </label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              License number (optional)
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Insurance info (optional)
          </label>
          <input
            type="text"
            name="insuranceInfo"
            value={form.insuranceInfo}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            placeholder="e.g. General liability, bonded, etc."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto rounded-full bg-teddy-blue text-white px-6 py-3 text-sm font-semibold hover:bg-teddy-teal transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
}
