import Link from "next/link";
import {
  Home,
  Search,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
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

          {/* 404 Illustration */}
          <div className="relative mb-12">
            <div className="text-[180px] md:text-[240px] font-bold leading-none">
              <span className="text-gradient-primary">404</span>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary/20 rounded-lg rotate-12 animate-float" />
            <div
              className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-cyan-500/20 rounded-full animate-float"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-accent/20 rounded-lg -rotate-12 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Oops! Page Not Found
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            This Page Doesn't Exist
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have taken a study break. Let's
            get you back on track with your learning journey.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              className="h-12 px-8 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-12 px-8 border-border/50 hover:border-primary/30 hover:bg-primary/5"
              asChild
            >
              <Link href="/tutors">
                <Search className="w-5 h-5 mr-2" />
                Browse Tutors
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="glass-card rounded-2xl p-8 border border-border/50 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "Find Tutors", href: "/tutors" },
                { label: "Sign In", href: "/login" },
                { label: "Register", href: "/register" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group text-center"
                >
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
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
