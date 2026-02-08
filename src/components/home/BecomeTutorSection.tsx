"use client";

import Link from "next/link";
import {
  Users,
  TrendingUp,
  Clock,
  Globe,
  Zap,
  Star,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: TrendingUp, text: "Set your own hourly rates" },
  { icon: Clock, text: "Flexible schedule - teach when you want" },
  { icon: Globe, text: "Reach students from around the world" },
  { icon: Zap, text: "Built-in video tools and scheduling" },
];

const stats = [
  { label: "Active Tutors", value: "500+", icon: Users },
  { label: "Countries", value: "50+", icon: Globe },
  { label: "Satisfaction Rate", value: "98%", icon: Star },
  { label: "Total Sessions", value: "50k+", icon: BookOpen },
];

export function BecomeTutorSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                For Tutors
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Share Your Knowledge,{" "}
              <span className="text-gradient-accent">Earn Money</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our community of expert tutors. Set your own rates, choose
              your schedule, and make a real impact while earning on your terms.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((item, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-lg text-foreground">{item.text}</span>
                </li>
              ))}
            </ul>

            <Button
              className="h-14 px-10 text-lg bg-gradient-to-r from-accent to-orange-400 hover:from-accent/90 hover:to-orange-400/90 text-white font-semibold shadow-xl shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-105"
              asChild
            >
              <Link href="/register?role=tutor">
                Become a Tutor
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-border/50 backdrop-blur-xl">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient-accent mb-1">
                    $5,000+
                  </div>
                  <div className="text-muted-foreground">
                    Average monthly earnings
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
