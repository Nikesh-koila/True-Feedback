import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
  const token = await getToken({ req: request });

  const url = new URL(request.url);

  if (token) {
    if (
      url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/dashboard", url));
    }
  } else {
    if (url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", url));
    }
    if (url.pathname.startsWith("/reset-password")) {
      const userName = url.pathname.split("/").pop();

      if (userName) {
        const result = await axios.post(`${url.origin}/api/check-user`, {
          userName,
        });

        if (result.data.redirect) {
          return NextResponse.redirect(new URL(result.data.redirect, url));
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/",
    "/verify/:path*",
    "/dashboard/:path*",
    "/reset-password/:path*",
  ],
};
