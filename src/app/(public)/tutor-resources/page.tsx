"use client";

import {
  BookOpen,
  Video,
  FileText,
  Users,
  Lightbulb,
  Download,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const resources = [
  {
    icon: Video,
    title: "Video Tutorials",
    description:
      "Learn platform features, teaching techniques, and best practices through our comprehensive video library.",
    link: "#",
    linkText: "Watch Videos",
  },
  {
    icon: FileText,
    title: "Teaching Guides",
    description:
      "Download our curated guides on effective online tutoring, student engagement, and session planning.",
    link: "#",
    linkText: "Browse Guides",
  },
  {
    icon: Users,
    title: "Community Forum",
    description:
      "Connect with fellow tutors, share experiences, and learn from the community.",
    link: "#",
    linkText: "Join Forum",
  },
  {
    icon: Lightbulb,
    title: "Tips & Best Practices",
    description:
      "Expert advice on growing your tutoring business, managing students, and improving outcomes.",
    link: "#",
    linkText: "Read Tips",
  },
];

const guides = [
  { title: "Getting Started as a Tutor", downloads: "2.5K" },
  { title: "Effective Online Teaching Strategies", downloads: "1.8K" },
  { title: "Building Your Tutor Brand", downloads: "1.2K" },
  { title: "Managing Difficult Students", downloads: "950" },
  { title: "Maximizing Your Earnings", downloads: "1.5K" },
  { title: "Session Planning Template", downloads: "3.1K" },
];

const tips = [
  {
    title: "Prepare Before Each Session",
    content:
      "Review student progress, prepare materials, and set clear objectives for each session.",
  },
  {
    title: "Engage Students Actively",
    content:
      "Use interactive tools, ask questions frequently, and encourage students to participate.",
  },
  {
    title: "Provide Constructive Feedback",
    content:
      "Balance praise with areas for improvement. Be specific and actionable in your feedback.",
  },
  {
    title: "Set Clear Expectations",
    content:
      "Establish ground rules, session structure, and homework expectations from the start.",
  },
];

const TutorResources = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-12 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tutor <span className="text-gradient-primary">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed as a SkillBridge tutor. Access
            guides, tutorials, and community support to grow your tutoring
            business.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-colors border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {resource.description}
                </p>
                <a
                  href={resource.link}
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  {resource.linkText} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-colors border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{guide.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {guide.downloads} downloads
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick Tips for Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {tips.map((tip, index) => (
              <div
                key={tip.title}
                className="glass-card p-6 rounded-xl border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {tip.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our support team is here to help you succeed. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" asChild>
              <Link href="/contact">
                Contact Support <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/become-tutor">Become a Tutor</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorResources;
