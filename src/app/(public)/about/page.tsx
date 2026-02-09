"use client";

import {
  Target,
  Heart,
  Users,
  Globe,
  Award,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Student-First",
    description:
      "Every decision we make starts with asking: 'How does this help students learn better?'",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We rigorously vet every tutor to ensure students get the best possible learning experience.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Quality education should be available to everyone, everywhere, regardless of location.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously improve our platform with the latest technology to enhance learning.",
  },
];

const team = [
  { name: "Sarah Mitchell", role: "CEO & Co-founder", initials: "SM" },
  { name: "James Chen", role: "CTO & Co-founder", initials: "JC" },
  { name: "Maria Garcia", role: "Head of Education", initials: "MG" },
  { name: "David Park", role: "Head of Product", initials: "DP" },
];

const milestones = [
  {
    year: "2020",
    event: "SkillBridge founded with a mission to democratize education",
  },
  { year: "2021", event: "Reached 10,000 students and 1,000 tutors" },
  { year: "2022", event: "Expanded to 50+ countries worldwide" },
  { year: "2023", event: "Launched mobile app and AI-powered matching" },
  { year: "2024", event: "Celebrating 100,000+ successful sessions" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient-primary">SkillBridge</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're on a mission to connect every learner with the perfect
              tutor, making quality education accessible to everyone,
              everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <span className="text-primary font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Empowering Learners Through Personal Connection
              </h2>
              <p className="text-muted-foreground mb-4">
                We believe that everyone deserves access to great teachers.
                SkillBridge was born from a simple idea: what if we could
                connect students with expert tutors from around the world,
                removing the barriers of geography and cost?
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to be the leading platform for online
                tutoring, serving thousands of students and tutors across 50+
                countries. But we're just getting started.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-4xl font-bold text-primary">50K+</p>
                  <p className="text-muted-foreground text-sm">Students</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">10K+</p>
                  <p className="text-muted-foreground text-sm">Expert Tutors</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-muted-foreground text-sm">Countries</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-primary">100K+</p>
                  <p className="text-muted-foreground text-sm">Sessions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass-card p-6 rounded-2xl text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-3 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="glass-card p-4 rounded-xl flex-1 border border-border/50">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Leadership Team
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Our team brings together expertise from education, technology, and
            business to build the best possible learning platform.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  {member.initials}
                </div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Whether you want to learn or teach, there's a place for you at
            SkillBridge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link href="/tutors">
                Find a Tutor <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/become-tutor">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
