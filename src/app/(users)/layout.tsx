import Navbar from "@/components/layout/Navbar";
import { userService } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function StudentDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const api = userService;
  const { data } = await api.getSession();
  const { session, user } = data || {};
  const isLoggedIn = !!session;
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} userData={user} />
      <div className="max-w-6xl px-5 mx-auto">{children}</div>
    </>
  );
}
