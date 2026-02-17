"use client";

import { useState } from "react";
import {
  GraduationCap,
  ArrowRight,
  Chrome,
  Github,
  Sparkles,
  Shield,
  Zap,
  EyeIcon,
  EyeOff,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useRouter } from "next/navigation";
import { Roles } from "@/constants/roles";
import { Checkbox } from "../ui/checkbox";

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = LoginFormSchema.safeParse(value);
        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      console.log("Submited Values", value);
      const toastId = toast.loading("Logging in...");
      setIsLoading(true);
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(`Login failed: ${error.message}`, { id: toastId });
          return;
        }
        toast.success("Logged in successfully!", { id: toastId });
        console.log("Login successful:", data);

        // Get user role from the response
        const userRole = (data.user as any)?.role;

        if (userRole === Roles.ADMIN) {
          router.push("/admin/dashboard");
        } else if (userRole === Roles.TUTOR) {
          router.push("/tutor/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An unexpected error occurred. Please try again.", {
          id: toastId,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const socialLogin = (provider: string) => {
    toast.info(`${provider} login coming soon!`);
  };
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

      {/* Left Panel - Enhanced Decorative */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-card via-card/95 to-background relative overflow-hidden border-r border-border/50">
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
        <div className="absolute top-20 left-20 w-20 h-20 border border-primary/20 rounded-lg rotate-12 animate-float" />
        <div
          className="absolute bottom-40 right-20 w-16 h-16 border border-cyan-500/20 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-12 h-12 border border-accent/20 rounded-lg -rotate-12 animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 max-w-2xl mx-auto">
          <div className="space-y-8">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all group-hover:scale-105">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-primary">
                SkillBridge
              </span>
            </Link>

            {/* Main Content */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Welcome Back
                </span>
              </div>

              <h2 className="text-4xl xl:text-5xl font-bold text-foreground leading-tight">
                Continue Your
                <br />
                <span className="text-gradient-primary">Learning Journey</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Access your personalized dashboard, track your progress, and
                connect with expert tutors to achieve your learning goals.
              </p>
            </div>

            {/* Demo Accounts Card */}
            <div className="glass-card rounded-2xl p-6 border border-border/50 shadow-xl backdrop-blur-xl bg-card/40">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Demo Accounts</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    role: "Student",
                    email: "student@example.com",
                    color: "primary",
                  },
                  { role: "Tutor", email: "tutor@example.com", color: "cyan" },
                  {
                    role: "Admin",
                    email: "admin@example.com",
                    color: "accent",
                  },
                ].map((account, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {account.role}
                    </span>
                    <span className="text-sm text-muted-foreground font-mono group-hover:text-foreground transition-colors">
                      {account.email}
                    </span>
                    <Copy
                      className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(account.email);
                        toast.success("Email copied to clipboard!");
                      }}
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/50 flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Use password to login:{" "}
                  <span className="font-mono">Password123@</span>
                  <Copy
                    className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText("Password123@");
                      toast.success("Password copied to clipboard!");
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Enhanced Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              SkillBridge
            </span>
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Sign in to your account
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Social Login */}
          {/* <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              onClick={() => socialLogin("Google")}
            >
              <Chrome className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Continue with Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              onClick={() => socialLogin("GitHub")}
            >
              <Github className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>Continue with GitHub</span>
            </Button>
          </div> */}

          {/* Divider */}
          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">
                Or continue with email
              </span>
            </div>
          </div> */}

          {/* Login Form */}
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
            </FieldGroup>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <form.Field
                  name="rememberMe"
                  children={(field) => {
                    return (
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.state.value || false}
                          onCheckedChange={() =>
                            field.handleChange(!field.state.value)
                          }
                        />
                        <Label
                          htmlFor="rememberMe"
                          className="text-sm font-medium"
                        >
                          Remember Me
                        </Label>
                      </div>
                    );
                  }}
                />
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              form="login-form"
              className="w-full h-12 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-primary/80 font-semibold transition-colors inline-flex items-center gap-1"
              >
                Create one
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>

          {/* Mobile Demo Info */}
          <div className="lg:hidden mt-8 glass-card rounded-xl p-4 border border-border/50 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="font-semibold text-foreground text-sm">
                Demo Accounts
              </h3>
            </div>
            <div className="space-y-2">
              {[
                { role: "Student", email: "student@example.com" },
                { role: "Tutor", email: "tutor@example.com" },
                { role: "Admin", email: "admin@example.com" },
              ].map((account, i) => (
                <div
                  key={i}
                  className="flex justify-between text-xs p-2 rounded-lg bg-background/50"
                >
                  <span className="font-medium text-foreground">
                    {account.role}:
                  </span>
                  <span className="text-muted-foreground font-mono">
                    {account.email}
                  </span>
                  <Copy
                    className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(account.email);
                      toast.success("Email copied to clipboard!");
                    }}
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-2 border-t border-border/50 flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Use password to login:{" "}
                <span className="font-mono">Password123@</span>
                <Copy
                  className="w-3 h-3 cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText("Password123@");
                    toast.success("Password copied to clipboard!");
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
