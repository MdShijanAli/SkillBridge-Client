import { getTutorBySlug } from "@/services/tutor.service";
import TutorProfile from "./tutor-profile";
import { userService } from "@/services/user.service";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("TutorDetailsPage slug:", slug);
  const tutorData = await getTutorBySlug(slug);
  console.log("Tutor data fetched in TutorDetailsPage:", tutorData);

  const api = userService;
  const { data } = await api.getSession();
  const { user } = data || {};
  console.log("Current user session data in TutorProfile:", user);
  return (
    <div>
      <TutorProfile tutorData={tutorData.data} auth={user} />
    </div>
  );
}
