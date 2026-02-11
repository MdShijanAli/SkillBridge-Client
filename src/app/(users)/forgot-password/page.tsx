"use client";

import { useState } from "react";
import {
  GraduationCap,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  Lock,
  CheckCircle2,
  ShieldCheck,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const passwordRequirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  {
    label: "At least one uppercase letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least one lowercase letter",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  { label: "At least one number", test: (pw: string) => /\d/.test(pw) },
  {
    label: "At least one special character",
    test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  },
];

const steps = [
  { id: 1, title: "Enter Email", icon: Mail },
  { id: 2, title: "Verify Code", icon: KeyRound },
  { id: 3, title: "New Password", icon: Lock },
];

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.emailOtp.requestPasswordReset({
        email: email,
      });

      if (error) {
        // Check if it's a 404 error (plugin not configured on backend)
        if (error.status === 404) {
          toast.error("Email OTP not configured", {
            description:
              "The emailOTP plugin is not enabled on the backend server.",
            duration: 5000,
          });
          console.error(
            "❌ Backend Configuration Required:\n\n" +
              "The emailOTP plugin is not configured on your Better Auth server.\n\n" +
              "To fix this, add to your backend auth config:\n\n" +
              "import { emailOTP } from 'better-auth/plugins';\n\n" +
              "plugins: [\n" +
              "  emailOTP({\n" +
              "    async sendVerificationOTP({ email, otp, type }) {\n" +
              "      if (type === 'forget-password') {\n" +
              "        // Send OTP email here\n" +
              "      }\n" +
              "    },\n" +
              "    otpLength: 6,\n" +
              "    expiresIn: 300,\n" +
              "  })\n" +
              "]\n\n" +
              "Then restart your backend server.",
          );
        } else {
          toast.error("Failed to send code", {
            description: error.message || "Please try again.",
          });
        }
        return;
      }

      toast.success("Verification code sent!", {
        description: `Check your email at ${email}`,
      });
      setCurrentStep(2);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to send verification code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Invalid code", {
        description: "Please enter the full 6-digit code.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        email: email,
        type: "forget-password",
        otp: otp,
      });

      if (error) {
        toast.error("Verification failed", {
          description:
            error.message || "Invalid or expired code. Please try again.",
        });
        return;
      }

      setIsVerified(true);

      toast.success("Code verified!", {
        description: "You can now reset your password.",
      });
      setCurrentStep(3);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to verify code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const failed = passwordRequirements.filter((r) => !r.test(newPassword));
    if (failed.length > 0) {
      toast.error("Weak password", {
        description: "Please meet all password requirements.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.emailOtp.resetPassword({
        email: email,
        otp: otp,
        password: newPassword,
      });

      if (error) {
        if (
          error.status === 429 ||
          error.message?.includes("TOO_MANY_ATTEMPTS")
        ) {
          toast.error("Too many attempts", {
            description: "Please request a new verification code.",
          });
          setCurrentStep(1);
          setOtp("");
          return;
        }

        toast.error("Password reset failed", {
          description: error.message || "Please try again.",
        });
        return;
      }

      toast.success("Password reset successful!", {
        description: "You can now sign in with your new password.",
      });
      setIsComplete(true);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to reset password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      const { data, error } = await authClient.emailOtp.requestPasswordReset({
        email: email,
      });

      if (error) {
        toast.error("Failed to resend code", {
          description: error.message || "Please try again.",
        });
        return;
      }

      toast.success("Code resent!", {
        description: `A new code has been sent to ${email}`,
      });
      setOtp("");
      setIsVerified(false);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to resend code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Password Reset Complete
          </h1>
          <p className="text-muted-foreground">
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>
          <Button asChild variant="hero" size="lg" className="w-full">
            <Link href="/login">
              Back to Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-1 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="relative z-10 flex flex-col justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Reset Your Password
            </h2>
            <p className="text-muted-foreground mb-8">
              Follow the steps below to securely reset your password and regain
              access to your account.
            </p>

            {/* Step Indicators */}
            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isDone = currentStep > step.id;
                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? "bg-green-500/20 text-green-500"
                          : isActive
                            ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        isDone
                          ? "text-green-500"
                          : isActive
                            ? "text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      Step {step.id}: {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-primary">
              SkillBridge
            </span>
          </Link>

          {/* Mobile Steps */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    currentStep > step.id
                      ? "bg-green-500/20 text-green-500"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                {step.id < 3 && (
                  <div
                    className={`w-8 h-0.5 ${currentStep > step.id ? "bg-green-500" : "bg-border"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {currentStep === 1 && (
            <>
              <h1 className="text-2xl font-bold text-foreground">
                Forgot your password?
              </h1>
              <p className="text-muted-foreground mt-2">
                Enter the email address associated with your account and we'll
                send you a verification code.
              </p>
              <form onSubmit={handleSendCode} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </>
          )}

          {/* Step 2: OTP */}
          {currentStep === 2 && (
            <>
              <h1 className="text-2xl font-bold text-foreground">
                Check your email
              </h1>
              <p className="text-muted-foreground mt-2">
                We've sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-primary hover:underline"
                  >
                    Resend code
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: New Password */}
          {currentStep === 3 && (
            <>
              <h1 className="text-2xl font-bold text-foreground">
                Create new password
              </h1>
              <p className="text-muted-foreground mt-2">
                Enter a strong password for your account.
              </p>
              <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {passwordRequirements.map((req) => {
                      const met = req.test(newPassword);
                      return (
                        <div
                          key={req.label}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 transition-colors ${met ? "text-green-500" : "text-muted-foreground/40"}`}
                          />
                          <span
                            className={
                              met ? "text-foreground" : "text-muted-foreground"
                            }
                          >
                            {req.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {confirmPassword && newPassword === confirmPassword && (
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Passwords match
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
