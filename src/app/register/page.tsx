import RegistrationForm from "@/components/auth/registration-form";
import { Suspense } from "react";

export default async function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  );
}
