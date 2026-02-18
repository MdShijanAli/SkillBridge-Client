import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data, error } = await userService.getSession();

  console.log("Middleware session data:", data);

  // If there's an error fetching session (including 401), treat as unauthenticated
  if (error) {
    console.log("Session error:", error);
  }

  // Check if user is on public auth pages (login, register, forgot-password, etc.)
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
  ].some((page) => pathname.startsWith(page));

  // Check if user is trying to access protected routes
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/tutor") ||
    pathname.startsWith("/student");

  // If user is logged in and tries to access auth pages, redirect to their dashboard
  if (isAuthPage && data?.session) {
    const role = data.user?.role;

    if (role === Roles.ADMIN) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (role === Roles.TUTOR) {
      return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
  }

  // If user is on auth pages and not logged in, allow access
  if (isAuthPage && (!data || !data.session)) {
    return NextResponse.next();
  }

  // If user is not logged in and tries to access protected pages, redirect to login
  if (isProtectedRoute && (!data || !data.session)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user?.role;

  // Prevent users from accessing dashboards they don't have permission for
  if (
    role === Roles.ADMIN &&
    (pathname.startsWith("/tutor") || pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (
    role === Roles.TUTOR &&
    (pathname.startsWith("/admin") || pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  }

  if (
    role === Roles.STUDENT &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/tutor/:path*",
    "/student/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
  ],
};
