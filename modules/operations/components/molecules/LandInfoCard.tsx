"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Maximize2,
  FileText,
  Navigation,
  Landmark,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Land } from "../../types/lands";

interface LandInfoCardProps {
  land: Land;
}

export const LandInfoCard = ({ land }: LandInfoCardProps) => {
  const formattedDate = new Date(land.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="w-full overflow-hidden rounded-[32px] border-none bg-white shadow-xl shadow-green-900/5 transition-all hover:shadow-green-900/10">
      {/* Accent Line khas Vangrove */}
      <div className="h-1.5 w-full bg-gradient-to-r from-green-600 to-emerald-400" />

      <div className="flex flex-col md:flex-row items-center">
        <CardHeader className="flex-1 space-y-3 p-8">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-2xl text-green-600">
              <Landmark size={24} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-black tracking-tight text-slate-800">
                  {land.name}
                </CardTitle>
                <Badge
                  className={cn(
                    "rounded-xl border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                    land.land_certificate_url
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700",
                  )}
                >
                  {land.land_certificate_url
                    ? "Sertifikasi"
                    : "Belum Sertifikasi"}
                </Badge>
              </div>
              <div className="flex items-center text-sm font-bold text-slate-400">
                <MapPin className="mr-1.5 h-4 w-4 text-green-500" />
                {land.location?.address || "Alamat belum diatur"}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-[1.5] p-8 md:border-l border-slate-50">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Luas Area */}
            <div className="space-y-1">
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Maximize2 className="mr-1.5 h-3 w-3" /> Luas Area
              </div>
              <div className="text-xl font-black text-slate-800">
                {Number(land.total_area)}{" "}
                <span className="text-xs text-slate-400">Ha</span>
              </div>
            </div>

            {/* Terdaftar Sejak */}
            <div className="space-y-1">
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Calendar className="mr-1.5 h-3 w-3" /> Terdaftar
              </div>
              <div className="text-sm font-black text-slate-800">
                {formattedDate}
              </div>
            </div>

            {/* Koordinat */}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <Navigation className="mr-1.5 h-3 w-3" /> Koordinat
              </div>
              <div className="font-mono text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg w-fit">
                {land.location?.latitude.toString().slice(0, 8)},{" "}
                {land.location?.longitude.toString().slice(0, 8)}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-8">
          {land.land_certificate_url && (
            <button
              title="Download Sertifikat"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 transition-all hover:bg-green-50 hover:text-green-600"
            >
              <FileText size={20} />
            </button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
