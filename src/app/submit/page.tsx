"use client";

import { useState } from "react";
import { submitCoupon } from "@/lib/actions";

export default function SubmitPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const res = await submitCoupon(formData);
    if (res.ok) setSent(true);
    else setError(res.error ?? "Something went wrong.");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-extrabold">Submit a Coupon</h1>
      <p className="mt-2 text-slate-600">
        Found a working coupon code? Share it with the community. Our team reviews
        every submission before it goes live.
      </p>

      {sent ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-lg font-bold text-emerald-800">Thanks for sharing!</p>
          <p className="mt-1 text-sm text-emerald-700">
            Your coupon is in the review queue. We&apos;ll publish it once it checks out.
          </p>
        </div>
      ) : (
        <form action={handleSubmit} className="mt-8 space-y-4 rounded-2xl border bg-white p-6">
          <label className="block">
            <span className="text-sm font-semibold">Store name *</span>
            <input
              name="store_name"
              required
              placeholder="e.g. Chewy"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Coupon title *</span>
            <input
              name="coupon_title"
              required
              placeholder="e.g. 20% Off Sitewide"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Coupon code</span>
            <input
              name="code"
              placeholder="e.g. SAVE20 (leave blank for automatic discounts)"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Store link (optional)</span>
            <input
              name="affiliate_url"
              type="url"
              placeholder="https://www.example.com"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Your email (optional)</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700"
          >
            Submit coupon
          </button>
          <p className="text-xs text-slate-500">
            By submitting, you confirm this is a real, publicly available offer.
            Please don&apos;t submit personal referral codes.
          </p>
        </form>
      )}
    </div>
  );
}
