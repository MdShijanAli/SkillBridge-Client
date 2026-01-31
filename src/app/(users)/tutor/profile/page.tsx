import Profile from "@/components/dashboard/Profile";
import { userService } from "@/services/user.service";

export default async function TutorProfilePage() {
  const api = userService;
  const { data } = await api.getSession();
  const { user } = data || {};
  return (
    <div>
      <Profile userData={user} />
    </div>
  );
}
