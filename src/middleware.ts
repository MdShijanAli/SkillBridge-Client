import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (!data || !data.session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user?.role;

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
  matcher: ["/admin/:path*", "/tutor/:path*", "/student/:path*"],
};
