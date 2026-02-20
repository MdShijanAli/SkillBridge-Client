import { userService } from "@/services/user.service";
import StudentDashboard from "./dashboard";

export default async function UserDashboard() {
  const api = await userService;
  const { data } = await api.getSession();
  console.log("Current user session:", data);
  return (
    <div>
      <StudentDashboard auth={data?.user} />
    </div>
  );
}
