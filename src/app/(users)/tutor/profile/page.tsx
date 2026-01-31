import Profile from "@/components/dashboard/Profile";
import { userService } from "@/services/user.service";
import TutorProfile from "./tutor-profile";

export default async function TutorProfilePage() {
  const api = userService;
  const { data } = await api.getSession();
  const { user } = data || {};
  return (
    <div>
      <TutorProfile userData={user} />
    </div>
  );
}
