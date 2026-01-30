import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;
  console.log("Proxy middleware triggered for:", request.url);
  const { data } = await userService.getSession();
  if (!data || !data.session) {
    console.log("No active session found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (data.user) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.ADMIN;
    isTutor = data.user.role === Roles.TUTOR;
    isStudent = data.user.role === Roles.STUDENT;
  }
  if (!isAuthenticated) {
    console.log("User is not authenticated. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    isAdmin &&
    (pathname.startsWith("/tutor") || pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  if (
    isTutor &&
    (pathname.startsWith("/admin") || pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  }

  if (
    !isAdmin &&
    !isTutor &&
    (pathname.startsWith("/admin") || pathname.startsWith("/tutor"))
  ) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/tutor/dashboard/:path*",
  ],
};
