import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { userService } from "@/services/user.service";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const api = userService;
  const { data } = await api.getSession();
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
