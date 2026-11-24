import { supabase, isSupabaseConfigured } from "./supabase";
import type { Coupon, Store, VoteCounts } from "./types";

function activeExpiryFilter(): string {
  return `expires_at.is.null,expires_at.gt.${new Date().toISOString()}`;
}

function aggregateVotes(
  voteRows: Array<{ coupon_id: string; vote: string }> | null | undefined
): VoteCounts {
  const votes: VoteCounts = {};
  for (const row of voteRows ?? []) {
    votes[row.coupon_id] ??= { up: 0, down: 0 };
    if (row.vote === "up") votes[row.coupon_id].up += 1;
    else votes[row.coupon_id].down += 1;
  }
  return votes;
}

/** Load all active coupons (with store) + aggregated vote counts. */
export async function getActiveCoupons(): Promise<{
  coupons: Coupon[];
  votes: VoteCounts;
}> {
  if (!isSupabaseConfigured()) return { coupons: [], votes: {} };

  const { data, error } = await supabase
    .from("coupons")
    .select("*, store:stores(*)")
    .eq("status", "active")
    // Self-healing expiry: never show a coupon past its expiry date,
    // even if the daily Vercel cron that flips status to "expired"
    // has not run (or is not registered). Codes with no expiry date
    // are always shown.
    .or(activeExpiryFilter())
    .order("created_at", { ascending: false });

  if (error || !data) return { coupons: [], votes: {} };

  const coupons = data as Coupon[];
  if (coupons.length === 0) return { coupons: [], votes: {} };

  const couponIds = coupons.map((c) => c.id);
  const { data: voteRows } = await supabase
    .from("votes")
    .select("coupon_id, vote")
    .in("coupon_id", couponIds);

  return {
    coupons,
    votes: aggregateVotes(voteRows),
  };
}

/** All stores, alphabetical — used by /stores and the sitemap. */
export async function getAllStores(): Promise<Store[]> {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .order("name", { ascending: true });
  if (error || !data) return [];
  return data as Store[];
}

/** One store by its URL slug, e.g. "chewy". */
export async function getStoreBySlug(slug: string): Promise<Store | null> {
  if (!isSupabaseConfigured()) return null;
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("slug", normalizedSlug)
    .maybeSingle();

  if (error) return null;
  return (data ?? null) as Store | null;
}

/** Active coupons for one store, with the store embedded. */
export async function getCouponsForStore(
  storeId: string
): Promise<{ coupons: Coupon[]; votes: VoteCounts }> {
  if (!isSupabaseConfigured() || !storeId) return { coupons: [], votes: {} };

  const { data, error } = await supabase
    .from("coupons")
    .select("*, store:stores(*)")
    .eq("store_id", storeId)
    .eq("status", "active")
    // Same self-healing expiry filter as getActiveCoupons.
    .or(activeExpiryFilter())
    .order("created_at", { ascending: false });

  if (error || !data) return { coupons: [], votes: {} };

  const coupons = data as Coupon[];
  if (coupons.length === 0) return { coupons: [], votes: {} };

  const { data: voteRows } = await supabase
    .from("votes")
    .select("coupon_id, vote")
    .in(
      "coupon_id",
      coupons.map((c) => c.id)
    );

  return {
    coupons,
    votes: aggregateVotes(voteRows),
  };
}

export function formatDiscount(c: Coupon): string {
  if (c.discount_type === "percent" && c.discount_value != null) {
    return `${c.discount_value}% OFF`;
  }
  if (c.discount_type === "fixed" && c.discount_value != null) {
    return `$${c.discount_value} OFF`;
  }
  if (c.discount_type === "free_shipping") return "FREE SHIPPING";
  return "DEAL";
}

export function daysLeft(expiresAt: string | null): number | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.ceil(diff / 86_400_000);
}
