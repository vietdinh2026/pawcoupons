"use client";

import { useState } from "react";
import { sendContactMessage } from "@/lib/actions";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const res = await sendContactMessage(formData);
    if (res.ok) setSent(true);
    else setError(res.error ?? "Something went wrong.");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-extrabold">Contact Us</h1>
      <p className="mt-2 text-slate-600">
        Questions about a coupon, a store on PawCoupons, or a correction? Send us
        a message — we read every one and reply as soon as we can.
      </p>

      {sent ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
          <p className="text-lg font-bold text-emerald-800">Message sent!</p>
          <p className="mt-1 text-sm text-emerald-700">
            Thanks for reaching out. We&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form action={handleSubmit} className="mt-8 space-y-4 rounded-2xl border bg-white p-6">
          <label className="block">
            <span className="text-sm font-semibold">Your name *</span>
            <input
              name="name"
              required
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Your email *</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Topic *</span>
            <select
              name="topic"
              required
              defaultValue="Coupon question"
              className="mt-1 w-full rounded-xl border bg-white px-4 py-2.5 text-sm"
            >
              <option>Coupon question</option>
              <option>Report a problem with the site</option>
              <option>Store or coupon suggestion</option>
              <option>Business / partnership</option>
              <option>Other</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Message *</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              className="mt-1 w-full rounded-xl border px-4 py-2.5 text-sm"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white hover:bg-brand-700"
          >
            Send message
          </button>
          <p className="text-xs text-slate-500">
            We only use your email to reply to your message. See our{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
