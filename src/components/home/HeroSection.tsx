"use client";

import Link from "next/link";
import {
  Search,
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const stats = [
    { value: "500+", label: "Expert Tutors", icon: Users },
    { value: "50k+", label: "Sessions", icon: BookOpen },
    { value: "4.9", label: "Avg Rating", icon: Star },
    { value: "98%", label: "Success Rate", icon: TrendingUp },
  ];

  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden">
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
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-6xl px-5 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Welcome to the Future of Learning
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up animation-delay-100">
            Connect with Expert Tutors,{" "}
            <span className="text-gradient-primary">Master Anything</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            Transform your learning experience with personalized, one-on-one
            sessions from world-class tutors. Available 24/7.
          </p>

          {/* Search Bar - Enhanced */}
          <div className="mt-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            <div className="glass-card p-3 rounded-2xl border border-border/50 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="What do you want to learn today?"
                    className="pl-12 h-14 bg-background/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20 text-base"
                  />
                </div>
                <Button
                  className="h-14 px-8 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/tutors">
                    Find Tutors
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Popular:{" "}
              <span className="text-primary font-medium">Mathematics</span>,{" "}
              <span className="text-primary font-medium">Programming</span>,{" "}
              <span className="text-primary font-medium">English</span>
            </p>
          </div>

          {/* Stats - Enhanced */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animation-delay-400">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
