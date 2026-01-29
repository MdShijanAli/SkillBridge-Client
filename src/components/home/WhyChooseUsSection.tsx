"use client";

import { Shield, Clock, Heart, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Tutors",
    desc: "All tutors are background-checked and verified",
    color: "text-blue-500",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    desc: "Learn anytime, anywhere at your convenience",
    color: "text-green-500",
  },
  {
    icon: Heart,
    title: "Personalized",
    desc: "Customized lessons tailored to your needs",
    color: "text-pink-500",
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "Connect with tutors from around the world",
    color: "text-purple-500",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose{" "}
            <span className="text-gradient-primary">SkillBridge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students achieving their learning goals with our
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass-card p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1 group text-center"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${feature.color}`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
