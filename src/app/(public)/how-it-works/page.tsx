"use client";

import {
  Search,
  Calendar,
  Video,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Clock,
  CreditCard,
  MessageSquare,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Find Your Perfect Tutor",
      description:
        "Browse our curated network of verified tutors. Filter by subject, price, rating, and availability to find the ideal match for your learning goals.",
      features: [
        "Advanced search filters",
        "Verified profiles",
        "Read real reviews",
      ],
    },
    {
      number: "02",
      icon: Calendar,
      title: "Book a Session",
      description:
        "Choose a time slot that fits your schedule. Our tutors offer flexible availability across different time zones.",
      features: ["Instant booking", "Flexible scheduling", "Calendar sync"],
    },
    {
      number: "03",
      icon: Video,
      title: "Learn Online",
      description:
        "Connect with your tutor via our integrated video platform. Share screens, collaborate on documents, and get personalized attention.",
      features: ["HD video calls", "Screen sharing", "Interactive whiteboard"],
    },
    {
      number: "04",
      icon: Star,
      title: "Achieve Your Goals",
      description:
        "Track your progress, leave reviews, and book follow-up sessions. Watch your skills grow with consistent, expert guidance.",
      features: ["Progress tracking", "Session history", "Achievement badges"],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Tutors",
      description:
        "Every tutor undergoes a rigorous verification process including background checks and credential validation.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Book sessions that fit your lifestyle. Morning, evening, or weekends — learn when it works for you.",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Pay securely through our platform. Your payment is only released after each successful session.",
    },
    {
      icon: MessageSquare,
      title: "Direct Messaging",
      description:
        "Communicate with your tutor before and after sessions to discuss goals and share materials.",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description:
        "Not satisfied with your first session? We offer a full refund, no questions asked.",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join a community of learners. Access resources, forums, and study groups.",
    },
  ];

  const faqs = [
    {
      question: "How do I choose the right tutor?",
      answer:
        "Browse tutor profiles to view their qualifications, experience, teaching style, and student reviews. You can also filter by subject, price range, and availability to find tutors that match your needs.",
    },
    {
      question: "What if I need to reschedule or cancel?",
      answer:
        "You can reschedule or cancel sessions up to 24 hours before the scheduled time without any charges. Last-minute cancellations may be subject to our cancellation policy.",
    },
    {
      question: "How are sessions conducted?",
      answer:
        "Sessions are conducted through our integrated video platform with features like screen sharing, interactive whiteboard, and file sharing for an optimal learning experience.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes! We use industry-standard encryption and secure payment processing. Your payment details are never shared with tutors, and funds are only released after sessions are completed.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "We offer a satisfaction guarantee. If you're not happy with your first session with a new tutor, contact our support team within 24 hours for a full refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-hero-pattern">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight animate-fade-in-up">
              How <span className="text-gradient-primary">SkillBridge</span>{" "}
              Works
            </h1>
            <p className="mt-6 text-lg text-muted-foreground animate-fade-in-up animation-delay-100">
              Get started in minutes. Find expert tutors, book sessions, and
              start learning from anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 lg:gap-16`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl md:text-6xl font-bold text-primary/20">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="relative">
                      <step.icon className="w-24 h-24 md:w-32 md:h-32 text-primary/20 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose SkillBridge?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We've built a platform that prioritizes quality, safety, and
              convenience for both students and tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glass-card rounded-xl p-6 hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-16 text-center glow-primary">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of students who have transformed their learning
              journey with SkillBridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/tutors">Browse Tutors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
