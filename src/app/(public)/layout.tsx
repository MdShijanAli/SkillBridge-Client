import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { getSession } from "better-auth/api";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await userService.getSession();
  const { session, user } = data || {};
  const isLoggedIn = !!session;
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userData={user} />
      {children}
      <Footer />
    </>
  );
}
