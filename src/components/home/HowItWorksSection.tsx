"use client";

import { Zap, Search, BookOpen, Star } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: Search,
    title: "Find Your Tutor",
    desc: "Browse verified tutors by subject, rating, price, and availability. Read reviews from real students.",
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    step: "2",
    icon: BookOpen,
    title: "Book a Session",
    desc: "Choose a time that works for you and book instantly. Flexible scheduling with 24/7 availability.",
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    step: "3",
    icon: Star,
    title: "Learn & Grow",
    desc: "Attend your session, learn from experts, and track your progress. Achieve your goals faster.",
    color: "from-amber-500/10 to-orange-500/10",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Find your perfect tutor in just three
            simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((item, i) => (
            <div key={i} className="relative">
              <div
                className={`glass-card p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-2 group bg-gradient-to-br ${item.color}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
