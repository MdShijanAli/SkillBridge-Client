import { userService } from "@/services/user.service";
import TutorDashboard from "./dashboard";

export default async function UserDashboard() {
  const api = userService;
  const { data } = await api.getSession();
  console.log("Session data in TutorDashboard page:", data);
  return (
    <div>
      <TutorDashboard userData={data.user} />
    </div>
  );
}
