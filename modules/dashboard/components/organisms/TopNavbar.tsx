"use client";

import { FileBarChart, LayoutDashboard, Menu, Monitor } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/molecules/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UserProfile } from "../molecules/UserProfile";

export const TopNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // ← tambah state

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    {
      label: "Monitoring",
      href: "/dashboard/monitoring",
      icon: <Monitor size={16} />,
    },
    {
      label: "Laporan",
      href: "/dashboard/reports",
      icon: <FileBarChart size={16} />,
    },
  ];

  return (
    <header className="sticky top-4 z-50 flex items-center justify-between bg-[#FCFDF8]/90 backdrop-blur-md px-4 md:px-8 py-3 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm mx-4 select-none">
      <div className="flex items-center gap-4 md:gap-10">
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            {" "}
            {/* ← tambah open & onOpenChange */}
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl h-9 w-9 border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
              >
                <Menu size={18} className="text-slate-700" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="rounded-r-[32px] w-[280px] p-6 border-r border-slate-100 bg-[#FCFDF8]"
            >
              <SheetHeader className="mb-8">
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)} // ← tutup saat diklik
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98]",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <div
                        className={cn(
                          "shrink-0",
                          isActive ? "text-emerald-600" : "text-slate-400",
                        )}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:block">
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-5 py-2 rounded-full text-[13px] font-black uppercase tracking-tight transition-all",
                  isActive
                    ? "text-emerald-700 bg-emerald-50/50"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <UserProfile />
      </div>
    </header>
  );
};
