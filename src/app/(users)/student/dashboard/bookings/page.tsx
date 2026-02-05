import { userService } from "@/services/user.service";
import StudentBookings from "./student-boookings";

export default async function StudentBookingsPage() {
  const api = userService;
  const { data } = await api.getSession();

  return <StudentBookings user={data.user} />;
}
