import {
  getAllAvailabilitySlots,
  getTutorProfile,
} from "@/services/tutor.service";
import TutorAvailability from "./tutor-availability";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, UserCircle, ArrowRight } from "lucide-react";

export default async function TutorAvailabilityPage() {
  const tutorProfile = await getTutorProfile();

  console.log("Tutor Profile in Availability Page:", tutorProfile?.data?.id);

  if (!tutorProfile?.data?.id) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center p-8">
        <div className="glass-card p-8 md:p-12 rounded-2xl max-w-2xl w-full text-center space-y-3">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <div className="relative bg-primary/10 p-6 rounded-full">
                <UserCircle className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Tutor Profile Required
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Before you can set your availability, you need to complete your
              tutor profile. This helps students learn more about you and your
              expertise.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">What you'll set up:</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your teaching specialization and experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Subjects you teach and languages you speak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your hourly rate and educational background</span>
              </li>
            </ul>
          </div>

          <Link href="/tutor/profile">
            <Button className="mt-4 group" variant="hero" size="lg">
              Create Tutor Profile
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const availabilitySlots = await getAllAvailabilitySlots(
    tutorProfile?.data?.id,
  );

  return (
    <div>
      <TutorAvailability
        tutorProfileId={tutorProfile?.data?.id}
        availabilitySlots={availabilitySlots?.data}
      />
    </div>
  );
}
