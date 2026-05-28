"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  FileText,
  Loader2,
  LocateFixed,
  MapPin,
  Maximize,
  Navigation,
  Search,
} from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { AreaConverter } from "@/common/utils/unit";
import { landSchema, type LandFormData } from "../../schema/land-schema";
import { Land } from "../../types/lands";

interface FormFarmerLandsProps {
  id: string;
  initialData?: Land | null;
  onSubmit: (values: LandFormData) => void;
  isSubmitting?: boolean;
}

const MapPickerDynamic = dynamic(() => import("../molecules/map-picker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-green-100 bg-green-50/30 text-green-600 gap-3">
      <Loader2 className="h-10 w-10 animate-spin opacity-50" />
      <span className="text-xs font-black uppercase tracking-widest">
        Sinkronisasi Citra Satelit...
      </span>
    </div>
  ),
});

export const FormFarmerLands = ({
  id,
  initialData,
  onSubmit,
  isSubmitting = false,
}: FormFarmerLandsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LandFormData>({
    resolver: zodResolver(landSchema) as Resolver<LandFormData>,
    defaultValues: useMemo(
      () => ({
        name: initialData?.name || "",
        total_area: initialData?.total_area
          ? AreaConverter.toHectare(initialData.total_area)
          : 0,
        location: {
          address: initialData?.location?.address || "",
          latitude: initialData?.location?.latitude
            ? Number(initialData.location.latitude)
            : 0,
          longitude: initialData?.location?.longitude
            ? Number(initialData.location.longitude)
            : 0,
        },
      }),
      [initialData],
    ),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const areaWatch = watch("total_area");
  const latWatch = watch("location.latitude");
  const lngWatch = watch("location.longitude");

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        total_area: Number(initialData.total_area),
        location: {
          address: initialData.location?.address || "",
          latitude: Number(initialData.location?.latitude),
          longitude: Number(initialData.location?.longitude),
        },
      });
    }
  }, [initialData, reset]);

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
      );
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const item = data[0];
        setValue("location.latitude", parseFloat(item.lat), {
          shouldValidate: true,
        });
        setValue("location.longitude", parseFloat(item.lon), {
          shouldValidate: true,
        });
      } else {
        setSearchError("Lokasi tidak ditemukan.");
      }
    } catch (err) {
      setSearchError("Gangguan koneksi pencarian lokasi.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleGetCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setValue("location.latitude", pos.coords.latitude, {
          shouldValidate: true,
        });
        setValue("location.longitude", pos.coords.longitude, {
          shouldValidate: true,
        });
      });
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 outline-none"
    >
      {/* SECTION 1: INFORMASI UMUM */}
      <div className="bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
              Informasi Aset
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Data dasar kepemilikan lahan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              Nama Lahan
            </Label>
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                size={18}
              />
              <Input
                {...register("name")}
                placeholder="Lahan Gambut Blok A"
                className={cn(
                  "h-12 pl-11 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-emerald-500/10 font-bold",
                  errors.name && "border-red-500 focus:ring-red-500/10",
                )}
              />
            </div>
            {errors.name && (
              <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-tighter">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              Luas Lahan (Ha)
            </Label>
            <div className="relative group">
              <Maximize
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                size={18}
              />
              <Input
                {...register("total_area")}
                type="number"
                step="any"
                placeholder="0.00"
                className={cn(
                  "h-12 pl-11 rounded-2xl bg-white border-slate-200 focus:ring-4 focus:ring-emerald-500/10 font-bold",
                  errors.total_area && "border-red-500 focus:ring-red-500/10",
                )}
              />
            </div>
            {errors.total_area && (
              <p className="text-[10px] text-red-500 font-bold ml-1 uppercase tracking-tighter">
                {errors.total_area.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">
              Alamat Lengkap
            </Label>
            <Textarea
              {...register("location.address")}
              placeholder="Jl. Raya Mangrove No. 12..."
              className="min-h-[100px] rounded-[24px] bg-white border-slate-200 focus:ring-4 focus:ring-emerald-500/10 font-medium p-4"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: GEOLOKASI & PETA */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Navigation size={20} />
            </div>
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800">
              Koordinat & Area
            </h3>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={14}
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), handleSearchLocation())
                }
                placeholder="Cari daerah..."
                className="h-10 pl-9 rounded-xl bg-slate-50 border-none text-xs font-bold"
              />
            </div>
            <Button
              type="button"
              onClick={handleSearchLocation}
              disabled={isSearching}
              className="h-10 rounded-xl bg-slate-900 text-white px-4 text-xs font-black uppercase tracking-tighter"
            >
              {isSearching ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                "Cari"
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">
                Latitude
              </p>
              <p className="text-xs font-mono font-bold text-slate-700 italic">
                {latWatch || "0.0000"}
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase mb-1">
                Longitude
              </p>
              <p className="text-xs font-mono font-bold text-slate-700 italic">
                {lngWatch || "0.0000"}
              </p>
            </div>
          </div>

          <div className="rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-inner h-[400px] relative z-0 group">
            <MapPickerDynamic
              lat={latWatch?.toString() || null}
              lng={lngWatch?.toString() || null}
              areaHectares={Number(areaWatch)}
              onChange={(lat, lng) => {
                setValue("location.latitude", parseFloat(lat), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setValue("location.longitude", parseFloat(lng), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />

            <Button
              type="button"
              onClick={handleGetCurrentLocation}
              className="absolute bottom-6 right-6 rounded-full w-12 h-12 shadow-2xl bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100 p-0 z-10"
            >
              <LocateFixed size={20} />
            </Button>
          </div>

          {searchError && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase">
              <Check size={14} className="rotate-45" /> {searchError}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
