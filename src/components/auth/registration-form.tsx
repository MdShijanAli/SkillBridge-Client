"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  User,
  ArrowRight,
  Chrome,
  Github,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  TrendingUp,
  EyeIcon,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import * as z from "zod";
import { Roles } from "@/constants/roles";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

const RegistrationFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum([Roles.STUDENT, Roles.TUTOR]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm passwords don't match",
    path: ["confirmPassword"],
  });

const RegistrationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: Roles.STUDENT,
    },
    validators: {
      onSubmit: RegistrationFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form Values:", value);
      try {
        setIsLoading(true);
        const result = await authClient.signUp.email({ ...value });
        console.log("Registration result :", result);
        toast.success(
          "Account created! Welcome to SkillBridge. You can now sign in.",
        );
        router.push("/login");
      } catch (error: any) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      } finally {
        setIsLoading(false);
      }
    },
  });

  const socialRegister = (provider: string) => {
    toast.info(`${provider} registration coming soon!`);
  };

  const benefits = [
    {
      icon: BookOpen,
      title: "Expert Tutors",
      desc: "Learn from verified professionals",
    },
    {
      icon: Award,
      title: "Personalized Learning",
      desc: "Tailored to your goals",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Join thousands of learners",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      desc: "Monitor your growth",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              SkillBridge
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Join thousands of learners and start your journey today
            </p>
          </div>

          {/* Social Registration */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              onClick={() => socialRegister("Google")}
            >
              <Chrome className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Sign up with Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              onClick={() => socialRegister("GitHub")}
            >
              <Github className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Sign up with GitHub</span>
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Registration Form */}
          <form
            id="registration-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <FieldGroup>
              {/* Role Selection */}
              <div className="space-y-3">
                <form.Field
                  name="role"
                  children={(field) => {
                    return (
                      <RadioGroup
                        value={field.state.value ?? Roles.STUDENT}
                        onValueChange={(value) => field.handleChange(value)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div>
                          <RadioGroupItem
                            value={Roles.STUDENT}
                            id="student"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="student"
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-5 hover:bg-card/80 hover:border-primary/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-primary/10 cursor-pointer transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 peer-data-[state=checked]:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                              <User className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-semibold text-foreground mb-1">
                              Learn
                            </span>
                            <span className="text-xs text-muted-foreground text-center">
                              I'm a student
                            </span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value={Roles.TUTOR}
                            id="tutor"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="tutor"
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm p-5 hover:bg-card/80 hover:border-primary/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-primary/10 cursor-pointer transition-all group"
                          >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 peer-data-[state=checked]:bg-primary/20 flex items-center justify-center mb-3 transition-colors">
                              <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-semibold text-foreground mb-1">
                              Teach
                            </span>
                            <span className="text-xs text-muted-foreground text-center">
                              I'm a tutor
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    );
                  }}
                />
              </div>

              <div className="space-y-2">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="Your full name"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="space-y-2">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Email Address
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          placeholder="Your email address"
                          value={field.state.value ?? ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="space-y-2">
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                          >
                            {showPassword ? (
                              <EyeIcon className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>
              <div className="space-y-2">
                <form.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          Confirm Password
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <EyeIcon className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <Button
                type="submit"
                form="registration-form"
                className="w-full h-12 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </FieldGroup>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold transition-colors inline-flex items-center gap-1"
              >
                Sign in
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Enhanced Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-card via-card/95 to-background relative overflow-hidden border-l border-border/50">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5" />

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-20 h-20 border border-primary/20 rounded-lg -rotate-12 animate-float" />
        <div
          className="absolute bottom-40 left-20 w-16 h-16 border border-cyan-500/20 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-12 h-12 border border-accent/20 rounded-lg rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 max-w-2xl mx-auto">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Join SkillBridge Today
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                Start Your
                <br />
                <span className="text-gradient-primary">Learning Journey</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of students and tutors who are transforming
                education through personalized learning experiences.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 pt-4">
              {[
                {
                  step: "1",
                  title: "Create your account",
                  desc: "Quick and easy signup process",
                },
                {
                  step: "2",
                  title: "Complete your profile",
                  desc: "Tell us about your goals",
                },
                {
                  step: "3",
                  title: "Find the perfect match",
                  desc: "Connect with expert tutors",
                },
                {
                  step: "4",
                  title: "Start learning",
                  desc: "Book your first session",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <span className="text-primary font-bold">{item.step}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-xl backdrop-blur-xl bg-card/40">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What you'll get
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
