"use client";

import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  Github,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - Demo logins
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo logic - route based on email
    if (formData.email.includes("admin")) {
      toast.success("Welcome back, Admin!");
      redirect("/admin");
    } else if (formData.email.includes("tutor")) {
      toast.success("Welcome back, Tutor!");
      redirect("/tutor/dashboard");
    } else {
      toast.success("Welcome back!");
      redirect("/dashboard");
    }

    setIsLoading(false);
  };

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
            <div className="space-y-4">
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

            {/* Features */}
            <div className="grid gap-4 pt-4">
              {[
                {
                  icon: Shield,
                  label: "Secure & Private",
                  desc: "Your data is protected with encryption",
                },
                {
                  icon: Zap,
                  label: "Instant Access",
                  desc: "Connect with tutors in real-time",
                },
                {
                  icon: Sparkles,
                  label: "Personalized",
                  desc: "Tailored learning experience",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {feature.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
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
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/50 flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Use any password to login
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
          <div className="space-y-3 mb-6">
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 h-11 bg-background border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 h-11 bg-background border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
