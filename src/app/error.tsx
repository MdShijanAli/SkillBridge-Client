"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Home,
  RefreshCw,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-primary">
              SkillBridge
            </span>
          </Link>

          {/* Error Icon */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-destructive/20 to-orange-500/20 flex items-center justify-center border-4 border-destructive/30 animate-pulse">
              <AlertTriangle className="w-16 h-16 text-destructive" />
            </div>

            {/* Floating Elements */}
            <div className="absolute top-0 left-1/4 w-12 h-12 border-2 border-destructive/20 rounded-lg rotate-12 animate-float" />
            <div
              className="absolute top-1/4 right-1/4 w-10 h-10 border-2 border-orange-500/20 rounded-full animate-float"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-0 left-1/3 w-8 h-8 border-2 border-accent/20 rounded-lg -rotate-12 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
            <Sparkles className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Something Went Wrong
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Oops! An Error Occurred
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            We encountered an unexpected issue. Don't worry, our team has been
            notified and we're working on it. Try refreshing the page or go back
            home.
          </p>

          {/* Error Details (Development Mode) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 p-4 rounded-lg bg-destructive/5 border border-destructive/20 text-left max-w-2xl mx-auto">
              <p className="text-sm font-mono text-destructive break-all">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              className="h-12 px-8 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
              onClick={reset}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>

            <Button
              variant="outline"
              className="h-12 px-8 border-border/50 hover:border-primary/30 hover:bg-primary/5"
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="glass-card rounded-2xl p-8 border border-border/50 backdrop-blur-xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <LifeBuoy className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Need Help?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/"
                className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Go Home
                </span>
              </Link>

              <Link
                href="/tutors"
                className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Find Tutors
                </span>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Reload Page
                </span>
              </button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              If the problem persists, please contact our support team at{" "}
              <a
                href="mailto:support@skillbridge.com"
                className="text-primary hover:underline font-medium"
              >
                support@skillbridge.com
              </a>
            </p>
          </div>

          {/* Go Back Button */}
          <div className="mt-8">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
