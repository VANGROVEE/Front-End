"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/molecules/logo";
import { UserProfile } from "../molecules/UserProfile";

export const TopNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Monitoring", href: "/dashboard/monitoring" },
    { label: "Laporan", href: "/dashboard/reports" },
    { label: "Pengaturan", href: "/dashboard/settings" },
  ];

  return (
    <header className="flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-4 rounded-[32px] border border-slate-100 shadow-sm sticky top-4 z-50">
      <div className="flex items-center gap-10">
        <Logo />
        <nav className="hidden md:flex gap-8 text-[13px] font-bold text-slate-400">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors pb-1 ${
                  isActive
                    ? "text-green-600 border-b-2 border-green-600"
                    : "hover:text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <UserProfile />
    </header>
  );
};
