"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/modules/profile/components/hooks/use-profile";
import { EditProfileForm } from "@/modules/profile/components/molecules/editProfilForm";
import { ChevronDown, LogOut, Mail, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationDropdown } from "./NotificationDropdown";

export const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const { profile, loading, updating, handleUpdate } = useProfile();
  const [editOpen, setEditOpen] = useState(false);
  const router = useRouter();

  const displayName =
    profile?.nickname ||
    profile?.name ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Pengguna";

  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      const supabase = createClient();

      await supabase.auth.signOut();

      localStorage.removeItem("vangrove-profile-cache");

      logout();

      window.location.href = "/auth";
    } catch (error) {
      console.error("Error saat logout:", error);

      logout();
      window.location.href = "/auth";
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 sm:gap-4">
        <NotificationDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 h-auto p-1 pr-3 rounded-full border border-slate-100 bg-white hover:bg-slate-50 shadow-sm transition-all focus-visible:ring-emerald-500"
            >
              <Avatar className="w-8 h-8 border border-emerald-100 shadow-sm">
                <AvatarImage
                  src={profile?.avatar_url || ""}
                  alt={displayName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-emerald-600 text-white font-bold text-xs">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="hidden sm:flex flex-col leading-none text-left">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                  Welcome!
                </span>
                {loading ? (
                  <div className="h-3 w-16 bg-slate-100 animate-pulse rounded mt-1" />
                ) : (
                  <span className="text-xs font-black text-slate-700 truncate max-w-[80px]">
                    {displayName}
                  </span>
                )}
              </div>

              <ChevronDown size={12} className="text-slate-400 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72 p-0 rounded-[24px] overflow-hidden border-slate-100 shadow-2xl z-[60]"
            align="end"
          >
            <div className="bg-emerald-50/50 p-6 flex flex-col items-center text-center gap-2 border-b border-emerald-100/50">
              <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                <AvatarImage
                  src={profile?.avatar_url || ""}
                  className="object-cover"
                />
                <AvatarFallback className="bg-emerald-600 text-white text-xl font-black">
                  {initial}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-0.5">
                <DropdownMenuLabel className="p-0 text-sm font-black text-slate-800 uppercase tracking-tight">
                  {profile?.name || "User Vangrove"}
                </DropdownMenuLabel>
                {profile?.nickname && (
                  <p className="text-[10px] font-bold text-slate-400">
                    @{profile.nickname}
                  </p>
                )}
                <Badge
                  variant="secondary"
                  className="mt-2 bg-emerald-500 text-white hover:bg-emerald-600 border-none font-bold text-[9px] uppercase px-3 py-0.5"
                >
                  {profile?.role || "Petani"}
                </Badge>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 px-2">
                <Mail size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[11px] font-bold text-slate-500 truncate">
                  {profile?.email || user?.email || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3 px-2">
                <Phone size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[11px] font-bold text-slate-500">
                  {profile?.phone_number || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3 px-2">
                <MapPin size={14} className="text-emerald-500 shrink-0" />
                <span className="text-[11px] font-bold text-slate-500 line-clamp-1">
                  {profile?.address_home || "Alamat belum diatur"}
                </span>
              </div>
            </div>

            <DropdownMenuSeparator className="bg-slate-100" />

            <DropdownMenuGroup className="p-2">
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer gap-3"
              >
                <User size={16} /> Kelola Akun
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={() => setEditOpen(true)}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer gap-3"
              >
                <Settings size={16} /> Pengaturan
              </DropdownMenuItem> */}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100" />

            <div className="p-2">
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-xl px-4 py-2.5 text-sm font-black text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer gap-3"
              >
                <LogOut size={16} /> Keluar Sistem
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EditProfileForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onUpdate={handleUpdate}
        updating={updating}
      />
    </>
  );
};
