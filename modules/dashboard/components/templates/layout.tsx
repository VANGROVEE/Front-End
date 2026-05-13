import React from "react";
import { TopNavbar } from "@/modules/dashboard/components/organisms/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FCFDF8] p-4 lg:p-6 text-slate-900 font-sans">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
        {/* Navbar Global untuk area Dashboard */}
        <TopNavbar />

        {/* Area ini akan diisi oleh konten dari page.tsx */}
        <section className="w-full">{children}</section>
      </div>
    </main>
  );
}
