import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidAdminSession } from "@/lib/admin-session";

/**
 * Protects /admin. Runs before every matching request — page loads, RSC
 * payloads and server-action POSTs — so admin server actions cannot be
 * called without a valid session cookie either. The login page is at
 * /login (outside /admin) and is never matched here.
 */
export async function middleware(request: NextRequest) {
  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidAdminSession(session)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
