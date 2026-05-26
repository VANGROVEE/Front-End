import dynamic from "next/dynamic";
import AISpotlightSection from "./AISpotlightSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import NewsletterSection from "./NewsletterSection";

const LandMapSection = dynamic(
  () => import("@/modules/landing-page/components/LandMapSection"),
  { ssr: false },
);
export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-green-100 font-sans">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <AISpotlightSection />
      <LandMapSection />
      <HowItWorks />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
