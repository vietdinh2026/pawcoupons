"use client";

import { useState, useTransition } from "react";
import { voteCoupon } from "@/lib/actions";
import { formatDiscount, daysLeft } from "@/lib/data";
import type { Coupon } from "@/lib/types";
import { PET_CATEGORY_LABELS } from "@/lib/types";
import ReportForm from "./ReportForm";

const TAG_STYLES: Record<string, string> = {
  "Autoship Deal": "bg-amber-50 font-semibold text-amber-700",
  "New Customers": "bg-sky-50 font-semibold text-sky-700",
  Sitewide: "bg-emerald-50 font-semibold text-emerald-700",
  "Free Shipping": "bg-violet-50 font-semibold text-violet-700",
};

export default function CouponCard({
  coupon,
  votes,
}: {
  coupon: Coupon;
  votes: { up: number; down: number };
}) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [, startTransition] = useTransition();

  const left = daysLeft(coupon.expires_at);
  const storeName = coupon.store?.name ?? "Store";

  async function handleShowCode() {
    // Open the store through the affiliate/tracking link FIRST, synchronously
    // in this click handler, so the browser treats it as a user gesture and
    // does not block the new tab. This drops the affiliate cookie BEFORE the
    // visitor shops, so the sale still counts even if they never click
    // "Shop Now" afterwards. The code reveal + copy below is unchanged.
    window.open(`/api/go/${coupon.id}`, "_blank", "noopener");
    setRevealed(true);
    if (coupon.code) {
      try {
        await navigator.clipboard.writeText(coupon.code);
        setCopied(true);
      } catch {
        /* clipboard unavailable — code is still visible */
      }
    }
  }

  function handleVote(vote: "up" | "down") {
    if (voted) return;
    setVoted(vote);
    startTransition(() => {
      void voteCoupon(coupon.id, vote);
    });
  }

  return (
    <article className="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {storeName}
          </p>
          <h3 className="mt-1 text-lg font-bold leading-snug">{coupon.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
          {formatDiscount(coupon)}
        </span>
      </div>

      {coupon.description && (
        <p className="mt-2 text-sm text-slate-600">{coupon.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2 py-1">
          {PET_CATEGORY_LABELS[coupon.pet_category ?? "food-treats"] ??
            coupon.category}
        </span>
        {(coupon.tags ?? []).map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2 py-1 ${TAG_STYLES[tag] ?? "bg-slate-100 font-semibold text-slate-600"}`}
          >
            {tag}
          </span>
        ))}
        {left !== null && (
          <span className={left <= 7 ? "font-semibold text-red-600" : ""}>
            {left > 0 ? `Expires in ${left} day${left === 1 ? "" : "s"}` : "Expired"}
          </span>
        )}
        {coupon.is_verified && (
          <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
            Verified by PawCoupons
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {!revealed ? (
          <button
            onClick={handleShowCode}
            className="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
          >
            Show Code
          </button>
        ) : (
          <div className="flex flex-1 items-center justify-between rounded-xl border-2 border-dashed border-brand-500 bg-brand-50 px-4 py-2">
            <code className="text-lg font-extrabold tracking-widest text-brand-700">
              {coupon.code ?? "NO CODE NEEDED"}
            </code>
            <span className="text-xs font-semibold text-brand-700">
              {copied ? "Copied!" : "Tap to copy"}
            </span>
          </div>
        )}
        <a
          href={`/api/go/${coupon.id}`}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
        >
          Shop Now
        </a>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Did it work?</span>
          <button
            onClick={() => handleVote("up")}
            disabled={voted !== null}
            className={`rounded-full border px-2.5 py-1 font-semibold ${
              voted === "up" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "hover:bg-slate-50"
            }`}
          >
            👍 Yes ({votes.up + (voted === "up" ? 1 : 0)})
          </button>
          <button
            onClick={() => handleVote("down")}
            disabled={voted !== null}
            className={`rounded-full border px-2.5 py-1 font-semibold ${
              voted === "down" ? "border-red-500 bg-red-50 text-red-700" : "hover:bg-slate-50"
            }`}
          >
            👎 No ({votes.down + (voted === "down" ? 1 : 0)})
          </button>
        </div>
        <button
          onClick={() => setShowReport((v) => !v)}
          className="underline hover:text-slate-800"
        >
          Report broken code
        </button>
      </div>

      {showReport && (
        <ReportForm couponId={coupon.id} onDone={() => setShowReport(false)} />
      )}
    </article>
  );
}
