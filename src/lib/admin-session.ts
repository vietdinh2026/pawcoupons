/**
 * Pure session helpers for the /admin password gate. This file has NO
 * "use server" directive on purpose: it is imported by middleware.ts
 * (Edge runtime) and by the admin layout (Node runtime), which cannot
 * import server actions. The actual login/logout actions live in
 * ./admin-auth.ts and import these helpers.
 */

export const ADMIN_COOKIE = "pawcoupons_admin";
const SESSION_SALT = "pawcoupons-admin-session-v1";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

/** SHA-256 hex of salt + password (Web Crypto: works in Node + Edge). */
export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${SESSION_SALT}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time-ish string comparison (avoids early-exit timing leaks). */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when the cookie value matches the hash of the configured password. */
export async function isValidAdminSession(value: string | undefined): Promise<boolean> {
  const password = getAdminPassword();
  if (!password || !value) return false;
  const expected = await hashPassword(password);
  return safeEqual(value, expected);
}
