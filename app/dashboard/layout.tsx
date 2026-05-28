import { TooltipProvider } from "@/components/ui/tooltip";
import { TopNavbar } from "@/modules/dashboard/components/organisms/TopNavbar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FCFDF8] p-4 lg:p-6 text-slate-900 font-sans">
      <div className="container mx-auto flex flex-col gap-6">
        <TopNavbar />

        <section className="w-full">
          <TooltipProvider>{children}</TooltipProvider>
        </section>
      </div>
    </main>
  );
}
