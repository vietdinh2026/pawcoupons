"use client";

import { useEffect, useMemo, useState } from "react";
import CouponCard from "./CouponCard";
import type { Coupon, VoteCounts } from "@/lib/types";
import { PET_CATEGORIES } from "@/lib/types";

// How many coupons to show before the "Load more" button appears.
// The homepage loads every active coupon at once, so with 100+ coupons
// the page would be endless without this cap.
const PAGE_SIZE = 24;

type SortKey = "newest" | "expiry" | "discount";

export default function CouponBoard({
  coupons,
  votes,
  initialStore,
  initialPetCategory,
  lockPetCategory,
}: {
  coupons: Coupon[];
  votes: VoteCounts;
  initialStore?: string;
  initialPetCategory?: string;
  lockPetCategory?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [petCategory, setPetCategory] = useState(initialPetCategory ?? "all");
  const [store, setStore] = useState(initialStore ?? "All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const stores = useMemo(
    () =>
      ["All", ...Array.from(new Set(coupons.map((c) => c.store?.name ?? "Store")))],
    [coupons]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = coupons.filter((c) => {
      if (petCategory !== "all" && (c.pet_category ?? "food-treats") !== petCategory)
        return false;
      if (store !== "All" && (c.store?.name ?? "Store") !== store) return false;
      if (
        q &&
        !`${c.title} ${c.description ?? ""} ${c.store?.name ?? ""} ${c.code ?? ""}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });
    if (sort === "expiry") {
      list = [...list].sort((a, b) =>
        (a.expires_at ?? "9999").localeCompare(b.expires_at ?? "9999")
      );
    } else if (sort === "discount") {
      list = [...list].sort((a, b) => (b.discount_value ?? 0) - (a.discount_value ?? 0));
    } else {
      list = [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    return list;
  }, [coupons, query, petCategory, store, sort]);

  // Any filter/sort/search change starts over from the first page.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, petCategory, store, sort]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coupons, stores, codes… (try “Chewy”)"
          className="flex-1 rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <select
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className="rounded-xl border bg-white px-3 py-3 text-sm"
        >
          {stores.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All stores" : s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-xl border bg-white px-3 py-3 text-sm"
        >
          <option value="newest">Newest first</option>
          <option value="expiry">Expiring soonest</option>
          <option value="discount">Biggest discount</option>
        </select>
      </div>

      {/* Pet category filter strip — filters the already-loaded list, no server call.
          Hidden on a category page, which is already locked to one category. */}
      {!lockPetCategory && (
        <div className="mt-4 flex flex-wrap gap-2">
          {PET_CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setPetCategory(c.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                petCategory === c.value
                  ? "bg-brand-600 text-white"
                  : "border bg-white hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-5 text-sm text-slate-500">
        {remaining > 0
          ? `Showing ${visible.length} of ${filtered.length} coupons`
          : `${filtered.length} coupon${filtered.length === 1 ? "" : "s"}`}
        {remaining <= 0 &&
          (query || petCategory !== "all" || store !== "All"
            ? " matching your filters"
            : " available")}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-10 text-center">
          <p className="text-lg font-semibold">No coupons found</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search term or clear the filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((c) => (
              <CouponCard key={c.id} coupon={c} votes={votes[c.id] ?? { up: 0, down: 0 }} />
            ))}
          </div>
          {remaining > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
              >
                Load more coupons ({remaining} more)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
