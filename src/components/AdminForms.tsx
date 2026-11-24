"use client";

import { useState } from "react";
import {
  upsertStore,
  deleteStore,
  upsertCoupon,
  deleteCoupon,
  setCouponStatus,
  setCouponVerified,
  setSubmissionStatus,
  resolveReport,
} from "@/lib/actions";
import { AFFILIATE_NETWORKS, CATEGORIES, PET_CATEGORIES } from "@/lib/types";
import type { Coupon, Store } from "@/lib/types";

/* ---------------- Store form (add / edit) ---------------- */

export function StoreForm({ store }: { store?: Store }) {
  const [open, setOpen] = useState(!store);
  if (!open && store) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs font-semibold text-brand-600 underline">
        Edit
      </button>
    );
  }
  return (
    <form action={async (fd: FormData) => { await upsertStore(fd); }} className="mt-2 space-y-2 rounded-xl border bg-slate-50 p-4">
      {store && <input type="hidden" name="id" value={store.id} />}
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="name" required defaultValue={store?.name ?? ""} placeholder="Store name *"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="slug" defaultValue={store?.slug ?? ""} placeholder="slug (auto from name)"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="website_url" defaultValue={store?.website_url ?? ""} placeholder="Website URL"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="logo_url" defaultValue={store?.logo_url ?? ""} placeholder="Logo image URL"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
      </div>
      <input name="description" defaultValue={store?.description ?? ""} placeholder="Short description"
        className="w-full rounded-lg border bg-white px-3 py-2 text-sm" />
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white">
          {store ? "Save store" : "Add store"}
        </button>
        {store && (
          <button type="button" onClick={() => setOpen(false)} className="text-xs underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

/* ---------------- Coupon form (add / edit) ---------------- */

export function CouponForm({ coupon, stores }: { coupon?: Coupon; stores: Store[] }) {
  const [open, setOpen] = useState(!coupon);
  if (!open && coupon) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs font-semibold text-brand-600 underline">
        Edit
      </button>
    );
  }
  const expiresValue = coupon?.expires_at ? coupon.expires_at.slice(0, 16) : "";
  return (
    <form action={async (fd: FormData) => { await upsertCoupon(fd); }} className="mt-2 space-y-2 rounded-xl border bg-slate-50 p-4">
      {coupon && <input type="hidden" name="id" value={coupon.id} />}
      <div className="grid gap-2 sm:grid-cols-2">
        <select name="store_id" required defaultValue={coupon?.store_id ?? ""} className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option value="" disabled>Select store *</option>
          {stores.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select name="category" defaultValue={coupon?.category ?? "Other"} className="rounded-lg border bg-white px-3 py-2 text-sm">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select name="pet_category" defaultValue={coupon?.pet_category ?? "food-treats"} className="rounded-lg border bg-white px-3 py-2 text-sm">
          {PET_CATEGORIES.filter((c) => c.value !== "all").map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <input name="tags" defaultValue={(coupon?.tags ?? []).join(", ")} placeholder="Tags, comma-separated: Autoship Deal, New Customers, Sitewide, Free Shipping"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="title" required defaultValue={coupon?.title ?? ""} placeholder="Coupon title *"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="code" defaultValue={coupon?.code ?? ""} placeholder="Code (blank = no code needed)"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <select name="discount_type" defaultValue={coupon?.discount_type ?? "percent"} className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option value="percent">% off</option>
          <option value="fixed">$ off</option>
          <option value="free_shipping">Free shipping</option>
          <option value="other">Other</option>
        </select>
        <input name="discount_value" type="number" step="any" defaultValue={coupon?.discount_value ?? ""} placeholder="Discount value (e.g. 20)"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <input name="affiliate_url" required defaultValue={coupon?.affiliate_url ?? ""} placeholder="Affiliate / store URL *"
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <select name="affiliate_network" defaultValue={coupon?.affiliate_network ?? ""} className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option value="">No network</option>
          {AFFILIATE_NETWORKS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <input name="expires_at" type="datetime-local" defaultValue={expiresValue}
          className="rounded-lg border bg-white px-3 py-2 text-sm" />
        <select name="status" defaultValue={coupon?.status ?? "active"} className="rounded-lg border bg-white px-3 py-2 text-sm">
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="reported">Reported</option>
        </select>
      </div>
      <input name="description" defaultValue={coupon?.description ?? ""} placeholder="Short description"
        className="w-full rounded-lg border bg-white px-3 py-2 text-sm" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_verified" defaultChecked={coupon?.is_verified ?? false} />
        Verified by PawCoupons (only tick after you personally checked the code works)
      </label>
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-bold text-white">
          {coupon ? "Save coupon" : "Add coupon"}
        </button>
        {coupon && (
          <button type="button" onClick={() => setOpen(false)} className="text-xs underline">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

/* ---------------- Small row actions ---------------- */

export function DeleteStoreButton({ id }: { id: string }) {
  return (
    <form action={async () => { await deleteStore(id); }}>
      <button
        type="submit"
        onClick={(e) => { if (!confirm("Delete this store and all its coupons?")) e.preventDefault(); }}
        className="text-xs font-semibold text-red-600 underline"
      >
        Delete
      </button>
    </form>
  );
}

export function DeleteCouponButton({ id }: { id: string }) {
  return (
    <form action={async () => { await deleteCoupon(id); }}>
      <button
        type="submit"
        onClick={(e) => { if (!confirm("Delete this coupon?")) e.preventDefault(); }}
        className="text-xs font-semibold text-red-600 underline"
      >
        Delete
      </button>
    </form>
  );
}

export function CouponStatusSelect({ coupon }: { coupon: Coupon }) {
  return (
    <form action={async (fd: FormData) => {
      await setCouponStatus(coupon.id, fd.get("status") as "active" | "expired" | "reported");
    }}>
      <select
        name="status"
        defaultValue={coupon.status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border bg-white px-2 py-1 text-xs"
      >
        <option value="active">Active</option>
        <option value="expired">Expired</option>
        <option value="reported">Reported</option>
      </select>
    </form>
  );
}

export function VerifyToggle({ coupon }: { coupon: Coupon }) {
  return (
    <form action={async () => { await setCouponVerified(coupon.id, !coupon.is_verified); }}>
      <button
        type="submit"
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          coupon.is_verified ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
        }`}
      >
        {coupon.is_verified ? "Verified ✓" : "Not verified"}
      </button>
    </form>
  );
}

export function SubmissionDecision({ id }: { id: string }) {
  return (
    <div className="flex gap-2">
      <form action={async () => { await setSubmissionStatus(id, "approved"); }}>
        <button type="submit" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
          Approve
        </button>
      </form>
      <form action={async () => { await setSubmissionStatus(id, "rejected"); }}>
        <button type="submit" className="rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-bold">
          Reject
        </button>
      </form>
    </div>
  );
}

export function ResolveReportButton({ id }: { id: string }) {
  return (
    <form action={async () => { await resolveReport(id); }}>
      <button type="submit" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
        Mark resolved
      </button>
    </form>
  );
}
