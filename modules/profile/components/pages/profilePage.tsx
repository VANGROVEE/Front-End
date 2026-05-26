"use client";

import {
  ExternalLink,
  LucideIcon,
  Mail,
  Map as MapIcon,
  MapPin,
  Maximize2,
  Pencil,
  Phone,
  ShieldCheck,
  Trees,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { useProfile } from "@/modules/profile/components/hooks/use-profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Land } from "@/modules/operations/types/lands";
import { EditProfileForm } from "@/modules/profile/components/molecules/editProfilForm";
import { LoadingState } from "../molecules/LoadingState";

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl transition-all group hover:bg-slate-50/80 border border-transparent hover:border-slate-100">
    <div className="w-10 h-10 bg-white shadow-sm text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-slate-50">
      <Icon size={18} strokeWidth={2.5} />
    </div>
    <div className="flex flex-col min-w-0 flex-1">
      <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
        {label}
      </span>
      <span className="text-sm text-slate-700 font-bold truncate">
        {value || "Belum diatur"}
      </span>
    </div>
  </div>
);

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const { profile, loading, updating, handleUpdate } = useProfile();
  const [editOpen, setEditOpen] = useState(false);

  const displayName = profile?.name || user?.name || "Pengguna Vangrove";
  const userRole = profile?.role || "FARMER";
  const landCount = profile?._count?.lands || 0;
  const totalArea =
    profile?.lands?.reduce(
      (acc: number, land: Land) => acc + land.total_area,
      0,
    ) || 0;
  const userInitial = displayName.charAt(0).toUpperCase();

  if (loading) return <LoadingState />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION: Branding & Identity */}
      <Card className="rounded-[40px] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
        <div className="h-32 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <CardContent className="px-10 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 rounded-[32px] border-[6px] border-white shadow-2xl transition-transform group-hover:scale-[1.02] duration-500">
                  <AvatarImage
                    src={profile?.avatar_url || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-100 text-slate-400 font-black text-4xl">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 -right-2 bg-emerald-500 hover:bg-emerald-600 border-4 border-white text-[10px] font-black shadow-lg px-3 py-1 rounded-full uppercase tracking-widest">
                  {userRole === "ADMIN" ? "Staff" : "Pro"}
                </Badge>
              </div>

              <div className="text-center md:text-left space-y-1 pb-2">
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                  {displayName}
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-50 text-emerald-700 text-[10px] font-black tracking-widest border-none px-3 py-1"
                  >
                    <ShieldCheck size={12} className="mr-1.5" strokeWidth={3} />
                    {userRole.toUpperCase()}
                  </Badge>
                  {profile?.nickname && (
                    <span className="text-xs font-bold text-slate-400 lowercase italic">
                      @{profile.nickname}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={() => setEditOpen(true)}
              className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[11px] px-8 h-12 shadow-xl shadow-slate-200 active:scale-95 transition-all gap-3 tracking-[0.1em] uppercase"
            >
              <Pencil size={14} strokeWidth={3} />
              Edit Profil
            </Button>
          </div>

          {/* STATS GRID: Digital Twin of Lands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <Card className="rounded-[28px] bg-slate-50/50 border-slate-100 p-6 flex items-center justify-between group hover:bg-emerald-50/50 transition-colors">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Trees size={18} strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Aset Lahan
                  </span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                  {landCount}{" "}
                  <span className="text-sm text-slate-400 font-bold uppercase ml-1">
                    Titik
                  </span>
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                asChild
              >
                <Link href="/dashboard/land">
                  <MapIcon size={18} />
                </Link>
              </Button>
            </Card>

            <Card className="rounded-[28px] bg-slate-50/50 border-slate-100 p-6 flex items-center justify-between group hover:bg-blue-50/50 transition-colors">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-600">
                  <Maximize2 size={18} strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Cakupan Area
                  </span>
                </div>
                <p className="text-3xl font-black text-slate-900">
                  {totalArea}{" "}
                  <span className="text-sm text-slate-400 font-bold uppercase ml-1">
                    Ha
                  </span>
                </p>
              </div>
              <div className="p-3 bg-white rounded-full shadow-sm">
                <ExternalLink size={18} className="text-slate-300" />
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* DETAIL INFORMATION SECTION */}
      <Card className="rounded-[40px] border-none shadow-xl shadow-slate-100/50 bg-white">
        <CardHeader className="px-10 pt-10 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-6 bg-emerald-500 rounded-full" />
            <CardTitle className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em]">
              Informasi Protokol
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-10 space-y-1">
          <InfoItem icon={User} label="Identitas Lengkap" value={displayName} />
          <Separator className="bg-slate-100/50 mx-6 opacity-50" />
          <InfoItem
            icon={Mail}
            label="Verifikasi Email"
            value={profile?.email || user?.email || ""}
          />
          <Separator className="bg-slate-100/50 mx-6 opacity-50" />
          <InfoItem
            icon={Phone}
            label="Saluran WhatsApp"
            value={profile?.phone_number || ""}
          />
          <Separator className="bg-slate-100/50 mx-6 opacity-50" />
          <InfoItem
            icon={MapPin}
            label="Koordinat Domisili"
            value={profile?.address_home || ""}
          />
        </CardContent>
      </Card>

      {/* FOOTER METADATA */}
      <div className="flex flex-col items-center gap-3 py-6">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-slate-200" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Vangrove Engine v2.1
          </p>
          <div className="h-[1px] w-12 bg-slate-200" />
        </div>
        <Badge
          variant="outline"
          className="text-[8px] font-bold border-slate-100 text-slate-300 rounded-full px-4"
        >
          DATA TERENKRIPSI AES-256
        </Badge>
      </div>

      {/* MODAL OVERLAY */}
      <EditProfileForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onUpdate={handleUpdate}
        updating={updating}
      />
    </div>
  );
};
