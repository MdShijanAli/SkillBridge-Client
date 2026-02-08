"use client";

import {
  Star,
  Quote,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stories = [
  {
    name: "Emily Chen",
    role: "High School Student",
    subject: "Mathematics",
    image: null,
    initials: "EC",
    rating: 5,
    story:
      "I went from failing calculus to getting an A+ in just 3 months. My tutor, Dr. Sarah, made complex concepts so easy to understand. I'm now pursuing engineering in college!",
    result: "Grade improved from F to A+",
  },
  {
    name: "Marcus Johnson",
    role: "Career Changer",
    subject: "Programming",
    image: null,
    initials: "MJ",
    rating: 5,
    story:
      "At 35, I decided to switch careers to tech. My Python tutor helped me build a portfolio of projects, and within 6 months I landed my first developer job at a startup.",
    result: "Landed first tech job",
  },
  {
    name: "Sofia Rodriguez",
    role: "Business Professional",
    subject: "Languages",
    image: null,
    initials: "SR",
    rating: 5,
    story:
      "I needed to learn Mandarin for my new role in international business. My tutor's immersive approach helped me achieve conversational fluency in just 8 months.",
    result: "Achieved conversational fluency",
  },
  {
    name: "James Williams",
    role: "College Student",
    subject: "Science",
    image: null,
    initials: "JW",
    rating: 5,
    story:
      "Organic chemistry was my nightmare until I found SkillBridge. My tutor broke down mechanisms into simple steps. I aced my MCAT and got into my dream medical school!",
    result: "Accepted to medical school",
  },
  {
    name: "Aisha Patel",
    role: "Graduate Student",
    subject: "Test Prep",
    image: null,
    initials: "AP",
    rating: 5,
    story:
      "My GRE prep tutor helped me develop strategies that boosted my score by 15 points. The personalized approach made all the difference in my grad school applications.",
    result: "GRE score increased by 15 points",
  },
  {
    name: "David Kim",
    role: "Hobbyist",
    subject: "Music",
    image: null,
    initials: "DK",
    rating: 5,
    story:
      "I always wanted to play piano but never had time. My tutor worked around my busy schedule, and now I can play my favorite songs. It's the highlight of my week!",
    result: "Learned to play favorite songs",
  },
];

const stats = [
  { icon: TrendingUp, value: "95%", label: "Report improved grades" },
  { icon: Award, value: "4.9", label: "Average tutor rating" },
  { icon: Users, value: "50K+", label: "Success stories" },
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Success</span> Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real students who transformed their learning
            journey with SkillBridge tutors.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div
                key={story.name}
                className="glass-card p-6 rounded-2xl border border-border/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{story.story}</p>

                <div className="bg-primary/10 rounded-lg px-3 py-2 mb-6">
                  <p className="text-primary text-sm font-medium">
                    {story.result}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {story.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{story.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.role} • {story.subject}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Watch Their Stories</h2>
            <p className="text-muted-foreground mb-8">
              Hear directly from students about how SkillBridge tutors helped
              them achieve their goals.
            </p>
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                </div>
                <p className="text-muted-foreground">
                  Video testimonials coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Success Story</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students who have transformed their learning with
            SkillBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link href="/tutors">
                Find a Tutor <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
