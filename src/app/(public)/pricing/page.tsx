"use client";

import { Check, Star, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Pay As You Go",
    description: "Perfect for occasional learners",
    price: "No subscription",
    features: [
      "Pay per session",
      "Access to all tutors",
      "Message tutors directly",
      "Session recordings",
      "Basic support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Student Pro",
    description: "Best for regular learners",
    price: "$29",
    period: "/month",
    features: [
      "10% off all sessions",
      "Priority booking",
      "Unlimited messaging",
      "Session recordings",
      "Progress tracking",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Student Premium",
    description: "For serious students",
    price: "$79",
    period: "/month",
    features: [
      "20% off all sessions",
      "Priority booking",
      "Unlimited messaging",
      "Session recordings",
      "Progress tracking",
      "1-on-1 learning advisor",
      "Group session access",
      "24/7 premium support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient-primary">Transparent</span>{" "}
            Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. No hidden fees, cancel
            anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card rounded-2xl p-8 relative ${
                  plan.popular
                    ? "border-2 border-primary"
                    : "border border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                All transactions are encrypted and secure
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Instant Booking</h3>
              <p className="text-muted-foreground text-sm">
                Book sessions instantly with available tutors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Satisfaction Guarantee</h3>
              <p className="text-muted-foreground text-sm">
                Not happy? Get a full refund on your first session
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of students already learning with SkillBridge tutors.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/tutors">
              Find a Tutor <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
