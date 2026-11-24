import { NextRequest, NextResponse } from "next/server";
import { supabase, getServiceClient, isSupabaseConfigured } from "@/lib/supabase";

/**
 * GET /api/go/:couponId
 * Records one click row, then redirects the visitor.
 *
 * Shop Now rule: for now Shop Now links directly to the store's
 * homepage (store.website_url), NOT to a deep affiliate link. Later,
 * when the owner has an affiliate link, they paste it into that
 * coupon's affiliate_url + affiliate_network in the admin (or SQL)
 * and Shop Now will use that affiliate link automatically, with no
 * code change: an affiliate link is used only when affiliate_network
 * is set AND affiliate_url is set AND affiliate_url is not just the
 * store homepage; otherwise the visitor goes to the store homepage,
 * or to affiliate_url as a last resort, or to "/" if there is no URL
 * at all.
 *
 * The redirect decision uses the public (anon) client — the same
 * query the public pages already use — so a missing or wrong
 * SUPABASE_SERVICE_ROLE_KEY can never break Shop Now. The click
 * log is best-effort only: it tries the service client, and any
 * failure there is ignored so it can never block the redirect.
 */
function isStoreHomepage(affiliateUrl: string, storeUrl: string): boolean {
  try {
    const a = new URL(affiliateUrl);
    const s = new URL(storeUrl);
    if (a.origin.toLowerCase() !== s.origin.toLowerCase()) return false;
    const path = a.pathname.replace(/\/+$/, "");
    return path === "" && !a.search;
  } catch {
    return (
      affiliateUrl.trim().replace(/\/+$/, "").toLowerCase() ===
      storeUrl.trim().replace(/\/+$/, "").toLowerCase()
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const home = new URL("/", req.url);

  if (!isSupabaseConfigured()) return NextResponse.redirect(home);

  const { data: coupon } = await supabase
    .from("coupons")
    .select("id, affiliate_url, affiliate_network, store:stores(website_url)")
    .eq("id", params.id)
    .single();

  if (!coupon) return NextResponse.redirect(home);

  const rawStore = (coupon as unknown as { store?: unknown }).store;
  const store = Array.isArray(rawStore) ? rawStore[0] : rawStore;
  const storeUrl =
    (store as { website_url?: string | null } | undefined)?.website_url ??
    null;
  const affiliateUrl = coupon.affiliate_url?.trim() || null;
  const hasAffiliateNetwork = Boolean(coupon.affiliate_network?.trim());

  const useAffiliate =
    hasAffiliateNetwork &&
    affiliateUrl !== null &&
    (storeUrl === null || !isStoreHomepage(affiliateUrl, storeUrl));

  const destination = useAffiliate
    ? affiliateUrl!
    : storeUrl ?? affiliateUrl ?? null;
  if (!destination) return NextResponse.redirect(home);

  // Record the click (best effort — a logging failure must not block
  // the redirect, and a missing service key must not break Shop Now).
  try {
    const db = getServiceClient();
    await db.from("clicks").insert({
      coupon_id: coupon.id,
      referrer: req.headers.get("referer"),
    });
  } catch {
    /* click logging is best-effort only */
  }

  return NextResponse.redirect(destination);
}
