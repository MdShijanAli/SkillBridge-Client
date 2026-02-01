import { getAllTutors } from "@/services/tutor.service";
import BrowseTutors from "./browse-tutors";

export default async function TutorsPage() {
  const tutors = await getAllTutors();
  console.log("Tutors fetched in TutorsPage:", tutors);
  return (
    <div>
      <BrowseTutors tutorData={tutors} />
    </div>
  );
}
