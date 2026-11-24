import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

/**
 * GET /api/cron/expire
 * Daily maintenance job (scheduled via vercel.json → Vercel Cron):
 *  1. Marks coupons whose expires_at has passed as "expired".
 *  2. Marks coupons with 3+ open broken-code reports as "reported"
 *     (they are hidden from the public board until an owner reviews them).
 *
 * Vercel Cron sends an Authorization: Bearer <CRON_SECRET> header.
 * Set CRON_SECRET in Vercel env vars; requests without a matching
 * secret are rejected (unless no CRON_SECRET is configured at all).
 */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let db;
  try {
    db = getServiceClient();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Database not configured" },
      { status: 500 }
    );
  }

  const now = new Date().toISOString();

  // 1. Expire past-due coupons
  const { data: expired, error: expireError } = await db
    .from("coupons")
    .update({ status: "expired" })
    .eq("status", "active")
    .lt("expires_at", now)
    .select("id");
  if (expireError) {
    return NextResponse.json({ error: expireError.message }, { status: 500 });
  }

  // 2. Hide coupons with 3+ open reports
  const { data: openReports } = await db
    .from("reports")
    .select("coupon_id")
    .eq("status", "open");
  const counts: Record<string, number> = {};
  for (const r of openReports ?? []) {
    counts[r.coupon_id] = (counts[r.coupon_id] ?? 0) + 1;
  }
  const flagged = Object.entries(counts)
    .filter(([, n]) => n >= 3)
    .map(([id]) => id);

  let reportedCount = 0;
  if (flagged.length > 0) {
    const { data: reported } = await db
      .from("coupons")
      .update({ status: "reported" })
      .eq("status", "active")
      .in("id", flagged)
      .select("id");
    reportedCount = reported?.length ?? 0;
  }

  return NextResponse.json({
    ok: true,
    expired: expired?.length ?? 0,
    reported: reportedCount,
    runAt: now,
  });
}
