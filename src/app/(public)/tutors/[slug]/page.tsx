import { getTutorBySlug } from "@/services/tutor.service";
import TutorProfile from "./tutor-profile";

export default async function TutorDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("TutorDetailsPage slug:", slug);
  const tutorData = await getTutorBySlug(slug);
  console.log("Tutor data fetched in TutorDetailsPage:", tutorData);
  return (
    <div>
      <TutorProfile tutorData={tutorData.data} />
    </div>
  );
}
