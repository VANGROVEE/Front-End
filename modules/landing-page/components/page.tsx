"use client";

import AISpotlightSection from "./AISpotlightSection";
import FeaturesSection from "./FeaturesSection";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import LandMapSection from "./LandMapSection";
import Navbar from "./Navbar";
import Footer from "./footer";

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#FCFDF8] text-slate-900 selection:bg-emerald-100 font-sans antialiased">
      {/* 
        ORAMEN BACKGROUND GLOBAL DIHAPUS DARI SINI 
        Karena tiap seksi (Hero, AISpotlight, Footer) sudah mengelola glow background-nya sendiri secara presisi.
        Menaruhnya di sini hanya akan membuat warna glow bertumpuk terlalu pekat.
      */}

      {/* Komponen Navigasi Utama */}
      <Navbar />

      {/* Membungkus Konten Utama dengan Tag Semantik <main> untuk UX & SEO yang lebih baik */}
      <main className="relative z-10">
        <HeroSection />

        {/* Konten Edukasi & Fitur Utama */}
        <AISpotlightSection />
        <FeaturesSection />

        {/* Konten Pemetaan Spasial & Alur Kerja */}
        <LandMapSection />
        <HowItWorks />
      </main>

      {/* Komponen Kaki Halaman */}
      <Footer />
    </div>
  );
};

export default LandingPage;
