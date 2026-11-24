import { loginAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const ERROR_MESSAGES: Record<string, string> = {
  wrong: "Wrong password. Please try again.",
  config:
    "Admin password is not set up yet. Add ADMIN_PASSWORD in Vercel → Settings → Environment Variables, then redeploy.",
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error ? ERROR_MESSAGES[searchParams.error] : null;

  return (
    <div className="mx-auto mt-16 max-w-sm rounded-2xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold">Owner Login</h1>
      <p className="mt-1 text-sm text-slate-600">
        Enter the admin password to manage PawCoupons.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form action={loginAdmin} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="text-sm font-semibold">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            autoFocus
            className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="••••••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700"
        >
          Log in
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        <a href="/" className="underline hover:text-slate-600">
          ← Back to PawCoupons
        </a>
      </p>
    </div>
  );
}
