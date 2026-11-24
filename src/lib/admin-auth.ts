"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  hashPassword,
  safeEqual,
} from "./admin-session";

/**
 * Login/logout server actions for the /admin password gate.
 *
 * - The owner sets ONE password in the env var ADMIN_PASSWORD (Vercel ->
 *   Settings -> Environment Variables). No user accounts, no database.
 * - On login, the server hashes the password with SHA-256 and stores the
 *   hash in an httpOnly cookie ("pawcoupons_admin") for 7 days. The raw
 *   password is never stored in the cookie.
 * - middleware.ts checks the cookie on every /admin request, and the admin
 *   layout double-checks it server-side. The login page lives at /login
 *   (NOT under /admin) so the guard can never redirect the login page
 *   to itself.
 * - If ADMIN_PASSWORD is not set, login always fails (fail closed).
 */

/** Server action: check the password, set the session cookie, go to /admin. */
export async function loginAdmin(formData: FormData) {
  const password = getAdminPassword();
  const submitted = String(formData.get("password") ?? "");
  if (!password) {
    redirect("/login?error=config");
  }
  if (!submitted || !safeEqual(await hashPassword(submitted), await hashPassword(password))) {
    redirect("/login?error=wrong");
  }
  const token = await hashPassword(password);
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  redirect("/admin");
}

/** Server action: clear the session cookie, go back to the login page. */
export async function logoutAdmin() {
  // Delete with the same path the cookie was set with, otherwise the
  // browser keeps the /admin-scoped cookie.
  cookies().set(ADMIN_COOKIE, "", { maxAge: 0, path: "/admin" });
  redirect("/login");
}
