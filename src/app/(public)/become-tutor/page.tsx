"use client";

import {
  DollarSign,
  Clock,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  {
    icon: DollarSign,
    title: "Earn on Your Terms",
    description:
      "Set your own rates and keep up to 85% of every session. Top tutors earn $50-150+/hour.",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Work when you want. Set your availability and accept bookings that fit your life.",
  },
  {
    icon: Globe,
    title: "Teach Anywhere",
    description:
      "Connect with students worldwide from the comfort of your home or anywhere with internet.",
  },
  {
    icon: Users,
    title: "Build Your Brand",
    description:
      "Create a professional profile, collect reviews, and grow your tutoring business.",
  },
];

const steps = [
  {
    step: "1",
    title: "Apply",
    description:
      "Submit your application with your qualifications and expertise.",
  },
  {
    step: "2",
    title: "Get Verified",
    description:
      "Our team reviews your credentials and verifies your identity.",
  },
  {
    step: "3",
    title: "Create Profile",
    description:
      "Build your tutor profile, set rates, and define your availability.",
  },
  {
    step: "4",
    title: "Start Teaching",
    description: "Accept bookings and start earning by sharing your knowledge.",
  },
];

const requirements = [
  "Bachelor's degree or equivalent experience in your subject",
  "Strong communication skills",
  "Reliable internet connection and computer",
  "Passion for teaching and helping others learn",
  "Background check clearance",
];

const BecomeTutor = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your Knowledge,{" "}
              <span className="text-gradient-primary">Earn Money</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of tutors on SkillBridge and turn your expertise
              into income. Teach students worldwide on your own schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link href="/register?role=tutor">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">$75</p>
              <p className="text-muted-foreground text-sm">Avg. hourly rate</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                10K+
              </p>
              <p className="text-muted-foreground text-sm">Active tutors</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">85%</p>
              <p className="text-muted-foreground text-sm">
                Tutor earnings share
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                50K+
              </p>
              <p className="text-muted-foreground text-sm">Sessions monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Tutor with SkillBridge?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Requirements
            </h2>
            <div className="glass-card p-8 rounded-2xl">
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-2xl text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <blockquote className="text-lg mb-6">
              "SkillBridge changed my life. I went from teaching part-time to
              running a full tutoring business earning $8,000+ per month. The
              platform handles everything so I can focus on teaching."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                MJ
              </div>
              <div className="text-left">
                <p className="font-semibold">Michael Johnson</p>
                <p className="text-sm text-muted-foreground">
                  Mathematics Tutor, 3 years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our community of expert tutors and start earning today.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/register?role=tutor">
              Apply to Become a Tutor <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BecomeTutor;
