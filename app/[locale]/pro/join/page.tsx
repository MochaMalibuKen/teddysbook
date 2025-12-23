"use client";

import { FormEvent, useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { t } from "@/il8n/getTranslations";

export default function ProJoinPage() {
  const params = useParams() as { locale: string };
  const locale = params?.locale || "en";
  const translate = useCallback((key: string) => t(locale, key), [locale]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // TODO: replace with Supabase / API call
    await new Promise((res) => setTimeout(res, 800));

    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {translate("pro_join.success.title")}
        </h1>
        <p className="text-sm text-gray-700">
          {translate("pro_join.success.message")}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          {translate("pro_join.title")}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {translate("pro_join.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.business_name")}
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            required
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.full_name")}
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
            {translate("pro_join.email")}
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
            {translate("pro_join.phone")}
          </label>
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.category")}
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
            <option value="general">General Contractor</option>
          </select>
        </div>

        {/* Service Area */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.service_area")}
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            placeholder="e.g. Aiken, Augusta, 29801, 30901"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.description")}
          </label>
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            rows={3}
          />
        </div>

        {/* License & Years */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-800">
              {translate("pro_join.license")}
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">
              {translate("pro_join.years_experience")}
            </label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teddy-blue focus:outline-none focus:ring-1 focus:ring-teddy-blue"
            />
          </div>
        </div>

        {/* Insurance */}
        <div>
          <span className="block text-sm font-medium text-gray-800">
            {translate("pro_join.insurance")}
          </span>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-700">
            <label className="inline-flex items-center gap-1">
              <input type="radio" name="insurance" value="yes" className="h-4 w-4" />
              <span>{translate("pro_join.insurance_yes")}</span>
            </label>
            <label className="inline-flex items-center gap-1">
              <input type="radio" name="insurance" value="no" className="h-4 w-4" />
              <span>{translate("pro_join.insurance_no")}</span>
            </label>
          </div>
        </div>

        {/* Logo Upload (placeholder only) */}
        <div>
          <label className="block text-sm font-medium text-gray-800">
            {translate("pro_join.upload_logo")}
          </label>
          <input type="file" className="mt-1 block w-full text-sm text-gray-700" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full rounded-full bg-teddy-blue py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teddy-teal disabled:opacity-60"
        >
          {submitting
            ? "Sending..."
            : translate("pro_join.submit")}
        </button>
      </form>
    </div>
  );
}
