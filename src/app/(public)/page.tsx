"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedTutorsSection } from "@/components/home/FeaturedTutorsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CTASection } from "@/components/home/CTASection";
import { BecomeTutorSection } from "@/components/home/BecomeTutorSection";
import TrustBadge from "../../components/home/TrustBadge";
import Testimonial from "@/components/home/Testimonial";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TrustBadge />
      <CategoriesSection />
      <FeaturedTutorsSection />
      <HowItWorksSection />
      <Testimonial />
      <WhyChooseUsSection />
      <CTASection />
      <BecomeTutorSection />
    </div>
  );
};
export default HomePage;
