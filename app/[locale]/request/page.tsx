"use client";

import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { t } from "@/il8n/getTranslations";

export default function RequestPage() {
  const params = useParams() as { locale: string };
  const locale = params?.locale || "en";

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: replace this with real Supabase / API call
    await new Promise((res) => setTimeout(res, 800));

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {t(locale, "request_form.success.title")}
        </h1>
        <p className="text-sm text-gray-700">
          {t(locale, "request_form.success.message")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {t(locale, "request_form.title")}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {t(locale, "request_form.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.name")}
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.email")}
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.phone")}
          </label>
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.category")}
          </label>
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            required
          >
            <option value="">—</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="landscaping">Landscaping</option>
            <option value="cleaning">Cleaning</option>
            <option value="general">General Handyman</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.details")}
          </label>
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            rows={4}
            required
          />
        </div>

        {/* Budget + Location */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-800">
              {t(locale, "request_form.budget")}
            </label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              {t(locale, "request_form.location")}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            />
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.urgency")}
          </label>
          <select
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
          >
            <option value="low">
              {t(locale, "request_form.urgency_options.low")}
            </option>
            <option value="medium">
              {t(locale, "request_form.urgency_options.medium")}
            </option>
            <option value="high">
              {t(locale, "request_form.urgency_options.high")}
            </option>
          </select>
        </div>

        {/* Photos (placeholder only) */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {t(locale, "request_form.upload_photos")}
          </label>
          <input
            type="file"
            multiple
            className="mt-1 block w-full text-sm text-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-teddy-blue py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teddy-teal disabled:opacity-60"
        >
          {submitting
            ? "Sending..."
            : t(locale, "request_form.submit")}
        </button>
      </form>
    </div>
  );
}
