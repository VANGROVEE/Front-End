"use client";

import { Mail, Phone, MapPin, User, Pencil, ArrowLeft } from "lucide-react";
import { useProfile } from "@/common/hooks/use-profile";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { EditProfileForm } from "@/modules/auth/components/organisms/editProfilForm";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  const { user } = useAuthStore();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Memuat profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-600 transition-colors font-semibold"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-green-500 to-green-600" />

        {/* Avatar & Nama */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="w-20 h-20 bg-green-600 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-4 border-white">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-black text-3xl">
                  {initial}
                </span>
              )}
            </div>
            <Button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold"
            >
              <Pencil size={14} />
              Edit Profile
            </Button>
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-800">
              {profile?.name || "-"}
            </h1>
            {profile?.nickname && (
              <p className="text-sm text-slate-500">@{profile.nickname}</p>
            )}
            <span className="text-[11px] text-white bg-green-500 rounded-full px-3 py-0.5 mt-2 inline-block font-semibold capitalize">
              {profile?.role?.toLowerCase() || "farmer"}
            </span>
            {profile?.bio && <p>{profile.bio}</p>}
          </div>
        </div>
      </div>

      {/* Info Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h2 className="text-sm font-black text-slate-700 uppercase tracking-wide">
          Informasi Pribadi
        </h2>

        {/* Nama */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-green-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Nama Lengkap
            </span>
            <span className="text-sm text-slate-700 font-semibold truncate">
              {profile?.name || "-"}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-green-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Email
            </span>
            <span className="text-sm text-slate-700 font-semibold truncate">
              {profile?.email || user?.email || "-"}
            </span>
          </div>
        </div>

        {/* No HP */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone size={16} className="text-green-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Nomor HP
            </span>
            <span className="text-sm text-slate-700 font-semibold truncate">
              {profile?.phone_number || "-"}
            </span>
          </div>
        </div>

        {/* Alamat */}
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin size={16} className="text-green-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Alamat Rumah
            </span>
            <span className="text-sm text-slate-700 font-semibold truncate">
              {profile?.address_home || "-"}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      {/* Edit Profile Dialog */}
      <EditProfileForm
        open={editOpen}
        onClose={() => setEditOpen(false)} // ← pastikan ini
        profile={profile}
        onUpdate={handleUpdate}
        updating={updating}
      />
    </div>
  );
};
