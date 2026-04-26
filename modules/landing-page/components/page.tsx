import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import AISpotlightSection from "./AISpotlightSection";
import LandMapSection from "./LandMapSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-green-100 font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AISpotlightSection />
      <LandMapSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
