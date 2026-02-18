"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type VerificationState = "verifying" | "success" | "error" | "expired";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [isResending, setIsResending] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [showResendForm, setShowResendForm] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setState("error");
        setErrorMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await authClient.verifyEmail({
          query: {
            token,
          },
        });

        console.log("Email verification response:", response);

        if (response.data?.status) {
          setState("success");
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                router.push("/login");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        } else {
          setState("error");
          setErrorMessage(
            (response as any).message ||
              (response as any).error ||
              "Verification failed. The link may be invalid or expired.",
          );
        }
      } catch (error: any) {
        setState("error");
        setErrorMessage(
          error.message || "An error occurred during verification.",
        );
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    if (!resendEmail) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resendEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsResending(true);

      const response = await authClient.sendVerificationEmail({
        email: resendEmail,
      });

      console.log("Resend verification response:", response);

      if (response.data?.status) {
        setResendSuccess(true);
        toast.success("Verification email sent! Please check your inbox.");
        setShowResendForm(false);
      } else {
        toast.error(
          (response as any).message ||
            (response as any).error ||
            "Failed to resend verification email. Please try again.",
        );
      }
    } catch (error: any) {
      toast.error(
        error.message || "An error occurred while resending the email.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-10">
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

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient-primary">
            SkillBridge
          </span>
        </Link>

        <div className="glass-card rounded-2xl p-8 shadow-2xl border border-border/50 bg-gradient-to-br from-card via-card to-background">
          {state === "verifying" && (
            <div className="text-center space-y-6">
              <div className="mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Verifying Your Email
                </h1>
                <p className="text-muted-foreground">
                  Please wait while we verify your email address...
                </p>
              </div>

              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}

          {state === "success" && (
            <div className="text-center space-y-6">
              <div className="mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/25 animate-bounce-slow">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center border-4 border-background shadow-lg animate-bounce-slow">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 mx-auto">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">
                    Email Verified Successfully
                  </span>
                </div>

                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                  Verification Complete!
                </h1>
                <p className="text-muted-foreground">
                  Your email has been verified successfully. You can now access
                  all features of SkillBridge.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2 text-left">
                  {[
                    {
                      icon: CheckCircle2,
                      text: "Your account is now fully activated",
                    },
                    {
                      icon: Mail,
                      text: "You can receive important notifications",
                    },
                    {
                      icon: GraduationCap,
                      text: "Ready to start learning or teaching",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-sm text-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <p className="text-sm text-primary">
                    Redirecting to login in {countdown} seconds...
                  </p>
                </div>

                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-12 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue to Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="text-center space-y-6">
              <div className="mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center shadow-lg shadow-red-500/25">
                  <XCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-foreground">
                  Verification Failed
                </h1>
                <p className="text-muted-foreground">{errorMessage}</p>
              </div>

              <div className="space-y-3 pt-4">
                {resendSuccess ? (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <p className="text-sm text-foreground font-semibold">
                        Verification Email Sent!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Check your inbox at{" "}
                      <span className="font-semibold text-foreground">
                        {resendEmail}
                      </span>{" "}
                      for the new verification link.
                    </p>
                  </div>
                ) : showResendForm ? (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <p className="text-sm text-foreground font-semibold">
                        Resend Verification Email
                      </p>
                    </div>
                    <div className="space-y-2 text-left">
                      <Label htmlFor="resend-email" className="text-sm">
                        Enter your email address
                      </Label>
                      <Input
                        id="resend-email"
                        type="email"
                        placeholder="your@email.com"
                        value={resendEmail}
                        onChange={(e) => setResendEmail(e.target.value)}
                        className="h-10"
                        disabled={isResending}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowResendForm(false)}
                        className="flex-1 border-border/50"
                        disabled={isResending}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleResendVerification}
                        className="flex-1 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold"
                        disabled={isResending}
                      >
                        {isResending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Email
                            <Mail className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-left">
                    <p className="text-sm text-foreground mb-2 font-semibold">
                      What you can do:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Request a new verification email</li>
                      <li>Check if you already verified your email</li>
                      <li>Contact support if the issue persists</li>
                    </ul>
                  </div>
                )}

                {!showResendForm && !resendSuccess && (
                  <Button
                    onClick={() => setShowResendForm(true)}
                    variant="outline"
                    className="w-full h-11 border-primary/30 hover:bg-primary/10 text-primary font-semibold group"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Resend Verification Email
                  </Button>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/register")}
                    className="flex-1 border-border/50 hover:bg-accent/50"
                  >
                    Back to Register
                  </Button>
                  <Button
                    onClick={() => router.push("/login")}
                    className="flex-1 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25"
                  >
                    Go to Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
