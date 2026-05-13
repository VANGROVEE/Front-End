"use client";

import {
  Bell,
  LogOut,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Pencil,
  User,
} from "lucide-react";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { useProfile } from "@/common/hooks/use-profile";
import { EditProfileForm } from "@/modules/auth/components/organisms/editProfilForm";
import { createClient } from "@/lib/supabase/client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export const UserProfile = () => {
  const { user, logout } = useAuthStore();
  const { profile, loading, updating, handleUpdate } = useProfile();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const displayName =
    profile?.nickname ||
    profile?.name ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Pengguna";

  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ pindah ke halaman profile
  const handleGoToProfile = () => {
    setOpen(false);
    router.push("/dashboard/profile");
  };

  // ✅ logout
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    logout();
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Bell */}
        <button className="relative p-2 text-slate-400 hover:text-green-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Profile Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 bg-white p-1 pr-3 rounded-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full overflow-hidden flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-sm">{initial}</span>
              )}
            </div>

            <div className="flex flex-col leading-none text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Welcome!
              </span>
              {loading ? (
                <span className="text-xs text-slate-400 animate-pulse">
                  Memuat...
                </span>
              ) : (
                <span className="text-xs font-black text-slate-700 truncate max-w-[100px]">
                  {displayName}
                </span>
              )}
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
              {/* Header */}
              <div className="flex flex-col items-center gap-2 py-5 px-4 bg-green-50 border-b border-green-100">
                <div className="w-16 h-16 bg-green-600 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={displayName || "avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-black text-2xl">
                      {initial}
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-sm font-black text-slate-800">
                    {profile?.name ?? "-"}
                  </p>

                  {profile?.nickname ? (
                    <p className="text-[11px] text-slate-500">
                      @{profile.nickname}
                    </p>
                  ) : null}

                  <span className="text-[10px] text-white bg-green-500 rounded-full px-3 py-0.5 mt-1 inline-block font-semibold capitalize">
                    {(profile?.role ?? "user").toLowerCase()}
                  </span>
                </div>
              </div>

              {/* Detail */}
              <div className="px-4 py-3 space-y-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-500">
                  <User size={13} className="text-green-500" />
                  <span className="text-xs">{profile?.name || "-"}</span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-500">
                  <Mail size={13} className="text-green-500" />
                  <span className="text-xs">
                    {profile?.email || user?.email || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-500">
                  <Phone size={13} className="text-green-500" />
                  <span className="text-xs">
                    {profile?.phone_number || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-slate-500">
                  <MapPin size={13} className="text-green-500" />
                  <span className="text-xs">
                    {profile?.address_home || "-"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-3 py-2 space-y-1">
                {/* ✅ Lihat Profile */}
                <button
                  onClick={handleGoToProfile}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors text-sm font-semibold"
                >
                  <User size={15} />
                  Lihat Profile
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-semibold"
                >
                  <LogOut size={15} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Edit */}
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
