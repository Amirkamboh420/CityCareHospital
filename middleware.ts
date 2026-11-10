import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenEdge } from "./lib/auth";

const ROLE_ROUTES: Record<string, string[]> = {
  ADMIN: ["/admin"],
  DOCTOR: ["/doctor"],
  RECEPTIONIST: ["/reception"],
  PATIENT: ["/patient"],
};

const PROTECTED_PREFIXES = ["/admin", "/doctor", "/reception", "/patient", "/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsProtection = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!needsProtection) return NextResponse.next();

  const token = req.cookies.get("citycare_session")?.value;
  const session = token ? await verifyTokenEdge(token) : null;

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Role guard: each role area only for its role (admin can view all)
  const allowed = ROLE_ROUTES[session.role] || [];
  const isAllowed =
    session.role === "ADMIN" ||
    pathname === "/dashboard" ||
    allowed.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isAllowed) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/reception/:path*", "/patient/:path*", "/dashboard/:path*"],
};
