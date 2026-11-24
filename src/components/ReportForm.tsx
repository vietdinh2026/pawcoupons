"use client";

import { useState } from "react";
import { reportCoupon } from "@/lib/actions";

export default function ReportForm({
  couponId,
  onDone,
}: {
  couponId: string;
  onDone: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const res = await reportCoupon(formData);
    if (res.ok) setSent(true);
    else setError(res.error ?? "Something went wrong.");
  }

  if (sent) {
    return (
      <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        Thanks! We&apos;ll check this code and remove it if it&apos;s broken.
      </p>
    );
  }

  return (
    <form action={handleSubmit} className="mt-3 rounded-lg bg-slate-50 p-3">
      <input type="hidden" name="coupon_id" value={couponId} />
      <label className="block text-xs font-semibold text-slate-600">
        What&apos;s wrong with this code?
        <select
          name="reason"
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
          defaultValue="Code did not work"
        >
          <option>Code did not work</option>
          <option>Code expired</option>
          <option>Discount is different than shown</option>
          <option>Code is for a different store</option>
          <option>Other</option>
        </select>
      </label>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
        >
          Send report
        </button>
        <button type="button" onClick={onDone} className="text-xs underline">
          Cancel
        </button>
      </div>
    </form>
  );
}
