import Link from "next/link";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface ClickStat {
  coupon_id: string;
  count: number;
}

export default async function StatsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        <h1 className="text-2xl font-extrabold">Click Statistics</h1>
        <p className="mt-2 text-slate-600">Database not connected yet — see README.md.</p>
      </div>
    );
  }

  const db = getServiceClient();
  const [{ data: coupons }, { data: clicks }] = await Promise.all([
    db.from("coupons").select("id, title, code, affiliate_network, store:stores(name)"),
    db.from("clicks").select("coupon_id, clicked_at").order("clicked_at", { ascending: false }).limit(5000),
  ]);

  const clickRows = (clicks ?? []) as { coupon_id: string; clicked_at: string }[];
  const counts: Record<string, number> = {};
  for (const c of clickRows) counts[c.coupon_id] = (counts[c.coupon_id] ?? 0) + 1;

  const couponMeta = new Map(
    ((coupons ?? []) as unknown as { id: string; title: string; code: string | null; affiliate_network: string | null; store: { name: string } | null }[]).map(
      (c) => [c.id, c]
    )
  );

  const stats: ClickStat[] = Object.entries(counts)
    .map(([coupon_id, count]) => ({ coupon_id, count }))
    .sort((a, b) => b.count - a.count);

  const total = clickRows.length;
  const last30 = clickRows.filter(
    (c) => new Date(c.clicked_at).getTime() > Date.now() - 30 * 86_400_000
  ).length;
  const last7 = clickRows.filter(
    (c) => new Date(c.clicked_at).getTime() > Date.now() - 7 * 86_400_000
  ).length;

  // Clicks grouped by affiliate network (for commission reconciliation)
  const byNetwork: Record<string, number> = {};
  for (const s of stats) {
    const net = couponMeta.get(s.coupon_id)?.affiliate_network ?? "No network";
    byNetwork[net] = (byNetwork[net] ?? 0) + s.count;
  }

  return (
    <div>
      <Link href="/admin" className="text-sm font-semibold text-brand-600 underline">
        ← Back to admin
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold">Click Statistics</h1>
      <p className="mt-1 text-slate-600">
        Outbound clicks recorded when visitors tap “Shop Now” or reveal a code.
        Use these numbers to reconcile commissions with each affiliate network.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total clicks (all time)", value: total },
          { label: "Clicks — last 30 days", value: last30 },
          { label: "Clicks — last 7 days", value: last7 },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="mt-1 text-3xl font-extrabold">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold">Clicks by affiliate network</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3">Network</th>
              <th className="px-4 py-3 text-right">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(byNetwork)
              .sort((a, b) => b[1] - a[1])
              .map(([net, n]) => (
                <tr key={net} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">{net}</td>
                  <td className="px-4 py-3 text-right font-bold">{n}</td>
                </tr>
              ))}
            {Object.keys(byNetwork).length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
                  No clicks recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl font-bold">Clicks per coupon</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3">Coupon</th>
              <th className="px-4 py-3">Store</th>
              <th className="px-4 py-3">Network</th>
              <th className="px-4 py-3 text-right">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s) => {
              const meta = couponMeta.get(s.coupon_id);
              return (
                <tr key={s.coupon_id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium">
                    {meta?.title ?? "Deleted coupon"}{" "}
                    {meta?.code && <code className="rounded bg-slate-100 px-1 text-xs">{meta.code}</code>}
                  </td>
                  <td className="px-4 py-3">{meta?.store?.name ?? "—"}</td>
                  <td className="px-4 py-3">{meta?.affiliate_network ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-bold">{s.count}</td>
                </tr>
              );
            })}
            {stats.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  No clicks recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
