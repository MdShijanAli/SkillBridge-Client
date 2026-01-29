"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-primary/20">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/10" />
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Start Today
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ready to <span className="text-gradient-primary">Transform</span>{" "}
              Your Learning?
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Join thousands of students who have achieved their goals with
              SkillBridge. Your personalized learning journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="h-14 px-10 text-lg bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 px-10 text-lg border-border/50 hover:border-primary/30 hover:bg-primary/5"
                asChild
              >
                <Link href="/tutors">Browse Tutors</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Cancel anytime • 24/7 support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
