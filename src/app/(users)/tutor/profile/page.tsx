import { userService } from "@/services/user.service";
import TutorProfile from "./tutor-profile";
import { getTutorProfile } from "@/services/tutor.service";

export default async function TutorProfilePage() {
  const api = userService;
  const { data } = await api.getSession();
  const { user } = data || {};
  const tutorProfile = await getTutorProfile();
  console.log("Tutor Profile Data:", tutorProfile);
  return (
    <div>
      <TutorProfile
        userData={tutorProfile?.data?.id ? tutorProfile.data : user}
      />
    </div>
  );
}
