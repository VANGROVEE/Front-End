"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsGrid } from "@/modules/dashboard/components/molecules/AnalyticsGrid";
import { Dashboard3D } from "@/modules/dashboard/components/molecules/dashboard3D";
import { useAnalysis } from "@/modules/dashboard/hooks/useAnalyze";
import { motion, Variants } from "framer-motion";
import { AiHealthAssistant } from "../molecules/AiHealthAssistant";

// 1. Definisikan tipe Variants secara eksplisit untuk menghindari error Ease
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Menggunakan Cubic Bezier untuk kemanan tipe data & kehalusan
    },
  },
};

export default function DashboardPage() {
  const { isLoading } = useAnalysis();

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-10 max-w-[1700px] mx-auto min-h-screen bg-[#f8fafc]/50"
    >
      {/* Grid Utama */}
      <div className="grid grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-10">
          <motion.section variants={itemVariants} className="flex-1">
            <div className="relative h-full rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/80 overflow-hidden bg-white group transition-all duration-500 hover:shadow-[0_50px_120px_-20px_rgba(16,185,129,0.15)]">
              {isLoading ? (
                <Skeleton className="h-[75vh] w-full rounded-[4rem]" />
              ) : (
                <Dashboard3D />
              )}
            </div>
          </motion.section>
        </div>

        <motion.aside
          variants={itemVariants}
          className="col-span-12 lg:col-span-3"
        >
          <div className="h-full rounded-[3rem] shadow-2xl shadow-emerald-900/5 overflow-hidden bg-transparent">
            <AiHealthAssistant />
          </div>
        </motion.aside>

        <motion.section variants={itemVariants} className="col-span-12">
          <div className="rounded-[3rem] bg-white/30 backdrop-blur-sm border border-white/50 p-2 transition-all">
            <AnalyticsGrid />
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
