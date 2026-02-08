"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  Users,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const faqs = [
  {
    question: "How do I book a tutoring session?",
    answer:
      "Simply browse our tutors, select one that matches your needs, choose an available time slot, and confirm your booking. You'll receive a confirmation email with all the details.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "You can cancel or reschedule up to 24 hours before your session for a full refund. Changes made within 24 hours may be subject to a cancellation fee.",
  },
  {
    question: "How are tutors verified?",
    answer:
      "All tutors go through a rigorous verification process including identity verification, credential checks, and background screening. We also review their qualifications and teaching experience.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal. All payments are processed securely through our encrypted payment system.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes! We offer a satisfaction guarantee. If you're not happy with your first session with a new tutor, we'll help you find a better match or provide a full refund.",
  },
  {
    question: "How do online sessions work?",
    answer:
      "Sessions are conducted through our integrated video platform. You'll receive a link before your session. All you need is a stable internet connection and a device with a camera and microphone.",
  },
];

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    contact: "support@skillbridge.com",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available Mon-Fri, 9am-6pm",
    contact: "Start a conversation",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We typically respond within",
    contact: "2-4 business hours",
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Visit us at",
    contact: "San Francisco, CA",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Message Sent! We've received your message and will get back to you soon.",
    );

    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-12 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How Can We <span className="text-gradient-primary">Help?</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or need assistance? We're here to help you succeed
              in your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-2xl text-center border border-border/50"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  {method.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-12">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(value) => setValue("subject", value)}>
                    <SelectTrigger
                      className={errors.subject ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="booking">Booking Help</SelectItem>
                      <SelectItem value="technical">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="tutor">Become a Tutor</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
                  Find quick answers to common questions about our platform.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-xl px-4 border border-border/50"
                  >
                    <AccordionTrigger className="hover:no-underline text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Browse Help Topics</h2>
            <p className="text-muted-foreground">
              Explore our help center for more detailed information
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                New to SkillBridge? Learn the basics of finding and booking
                tutors.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">For Tutors</h3>
              <p className="text-sm text-muted-foreground">
                Interested in teaching? Learn how to become a tutor on our
                platform.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Payments & Billing</h3>
              <p className="text-sm text-muted-foreground">
                Questions about payments, refunds, or subscription plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
