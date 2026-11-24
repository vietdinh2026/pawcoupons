import Link from "next/link";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Coupon, Report, Store, Submission } from "@/lib/types";
import {
  StoreForm,
  CouponForm,
  DeleteStoreButton,
  DeleteCouponButton,
  CouponStatusSelect,
  VerifyToggle,
  SubmissionDecision,
  ResolveReportButton,
} from "@/components/AdminForms";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        <h1 className="text-2xl font-extrabold">Owner Admin</h1>
        <p className="mt-2 text-slate-600">
          The database is not connected yet. Add your Supabase URL and keys to{" "}
          <code className="rounded bg-slate-100 px-1">.env.local</code> and run{" "}
          <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> in the
          Supabase SQL Editor — see README.md.
        </p>
      </div>
    );
  }

  const db = getServiceClient();
  const [{ data: stores }, { data: coupons }, { data: submissions }, { data: reports }] =
    await Promise.all([
      db.from("stores").select("*").order("name"),
      db.from("coupons").select("*, store:stores(*)").order("created_at", { ascending: false }),
      db.from("submissions").select("*").order("created_at", { ascending: false }),
      db.from("reports").select("*, coupon:coupons(*)").order("created_at", { ascending: false }),
    ]);

  const storeList = (stores ?? []) as Store[];
  const couponList = (coupons ?? []) as Coupon[];
  const submissionList = (submissions ?? []) as Submission[];
  const reportList = (reports ?? []) as Report[];
  const pendingCount = submissionList.filter((s) => s.status === "pending").length;
  const openReportCount = reportList.filter((r) => r.status === "open").length;

  return (
    <div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Owner Admin</h1>
          <p className="mt-1 text-slate-600">
            {storeList.length} stores · {couponList.length} coupons · {pendingCount} pending
            submissions · {openReportCount} open reports
          </p>
        </div>
        <Link
          href="/admin/stats"
          className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white"
        >
          View click stats →
        </Link>
      </div>

      {/* ---- Coupons ---- */}
      <section className="mt-8">
        <h2 className="text-xl font-bold">Coupons</h2>
        <CouponForm stores={storeList} />
        <div className="mt-4 space-y-3">
          {couponList.map((c) => (
            <div key={c.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {c.store?.name ?? "Unknown store"}
                  </p>
                  <p className="font-bold">
                    {c.title} {c.code && <code className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">{c.code}</code>}
                  </p>
                  <p className="text-xs text-slate-500">
                    {c.category} · {c.affiliate_network ?? "No network"} ·{" "}
                    {c.expires_at ? `expires ${new Date(c.expires_at).toLocaleDateString()}` : "no expiry"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <VerifyToggle coupon={c} />
                  <CouponStatusSelect coupon={c} />
                  <CouponForm coupon={c} stores={storeList} />
                  <DeleteCouponButton id={c.id} />
                </div>
              </div>
            </div>
          ))}
          {couponList.length === 0 && (
            <p className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
              No coupons yet — add your first one above.
            </p>
          )}
        </div>
      </section>

      {/* ---- Stores ---- */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Stores</h2>
        <StoreForm />
        <div className="mt-4 space-y-3">
          {storeList.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4">
              <div>
                <p className="font-bold">{s.name}</p>
                <p className="text-xs text-slate-500">{s.website_url ?? s.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <StoreForm store={s} />
                <DeleteStoreButton id={s.id} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Submissions ---- */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">User submissions ({pendingCount} pending)</h2>
        <div className="mt-4 space-y-3">
          {submissionList.map((s) => (
            <div key={s.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold">
                    {s.coupon_title} <span className="font-normal text-slate-500">— {s.store_name}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Code: {s.code ?? "—"} · {s.email ?? "no email"} ·{" "}
                    {new Date(s.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      s.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : s.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {s.status}
                  </span>
                  {s.status === "pending" && <SubmissionDecision id={s.id} />}
                </div>
              </div>
            </div>
          ))}
          {submissionList.length === 0 && (
            <p className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
              No submissions yet.
            </p>
          )}
        </div>
      </section>

      {/* ---- Broken-code reports ---- */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Broken-code reports ({openReportCount} open)</h2>
        <div className="mt-4 space-y-3">
          {reportList.map((r) => (
            <div key={r.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold">{r.coupon?.title ?? "Unknown coupon"}</p>
                  <p className="text-xs text-slate-500">
                    {r.reason ?? "No reason given"} · {new Date(r.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      r.status === "open" ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {r.status}
                  </span>
                  {r.status === "open" && <ResolveReportButton id={r.id} />}
                </div>
              </div>
            </div>
          ))}
          {reportList.length === 0 && (
            <p className="rounded-2xl border bg-white p-6 text-sm text-slate-500">
              No reports yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
