import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  const responseAPI = await fetch(`${request.nextUrl.origin}/auth/callback`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (
    responseAPI.status === 200 &&
    request.nextUrl.pathname === "/auth/signin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (
    responseAPI.status !== 200 &&
    request.nextUrl.pathname !== "/auth/signin"
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
}
// Add your protected routes
export const config = {
  matcher: ["/auth/signin", "/admin"],
};
