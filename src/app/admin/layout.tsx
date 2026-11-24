import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-session";
import { logoutAdmin } from "@/lib/admin-auth";

/**
 * Guards every page under /admin. The login page lives at /login (outside
 * /admin), so this layout can never redirect the login page to itself.
 * Middleware.ts enforces the same check on all /admin requests, including
 * server-action POSTs; this layout is the second layer, so the admin pages
 * never render without a session.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = cookies().get(ADMIN_COOKIE)?.value;
  if (!(await isValidAdminSession(session))) {
    redirect("/login");
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-xl border bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Log out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
