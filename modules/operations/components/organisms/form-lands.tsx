"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import {
  FileText,
  Map,
  MapPin,
  Maximize,
  Search,
  LocateFixed,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormField } from "@/common/types/form-field";
import { Land } from "../../types/lands";

const MapPickerDynamic = dynamic(() => import("../molecules/map-picker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[350px] w-full animate-pulse flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50/50 text-green-500 font-medium gap-3">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span>Memuat Peta Lahan...</span>
    </div>
  ),
});

export interface FarmerLandFormDataFlat {
  name: string;
  total_area: number | string;
  address: string;
  latitude: string;
  longitude: string;
}

interface FormLandsProps {
  id: string;
  fields: FormField[];
  initialData?: Land | null;
  onSubmit: (values: any) => void;
  isSubmitting?: boolean;
}

const getDefaultValues = (data?: Land | null): FarmerLandFormDataFlat => ({
  name: data?.name || "",
  total_area: Number(data?.total_area) || "",
  address: data?.location?.address || "",
  latitude: data?.location?.latitude || "",
  longitude: data?.location?.longitude || "",
});

const getIconForField = (type: string, fieldId: string) => {
  if (type === "select") return null;
  const props = {
    size: 18,
    className:
      "absolute left-4 top-3.5 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
  };

  if (fieldId.includes("area")) return <Maximize {...props} />;
  if (fieldId.includes("latitude") || fieldId.includes("longitude"))
    return <Map {...props} />;
  if (fieldId.includes("address"))
    return <MapPin {...props} className="top-4" />;
  if (fieldId.includes("certificate")) return <FileText {...props} />;
  return null;
};

export const FormFarmerLands = ({
  id,
  fields,
  initialData,
  onSubmit,
  isSubmitting = false,
}: FormLandsProps) => {
  const form = useForm<FarmerLandFormDataFlat>({
    defaultValues: useMemo(() => getDefaultValues(initialData), [initialData]),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    form.reset(getDefaultValues(initialData));
  }, [initialData, form]);

  const handleLocalSubmit = (values: FarmerLandFormDataFlat) => {
    onSubmit({
      name: values.name,
      total_area: Number(values.total_area),
      location: {
        address: values.address,
        latitude: values.latitude ? Number(values.latitude) : null,
        longitude: values.longitude ? Number(values.longitude) : null,
      },
    });
  };

  const handleSearchLocation = async (
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError("");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&limit=1`,
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];

        form.setValue("latitude", lat, {
          shouldValidate: true,
          shouldDirty: true,
        });
        form.setValue("longitude", lon, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setSearchError(
          "Lokasi tidak ditemukan. Coba gunakan nama kota atau kecamatan.",
        );
      }
    } catch (error) {
      setSearchError("Terjadi kesalahan jaringan saat mencari lokasi.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      setIsSearching(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude.toString(), {
            shouldValidate: true,
            shouldDirty: true,
          });
          form.setValue("longitude", position.coords.longitude.toString(), {
            shouldValidate: true,
            shouldDirty: true,
          });
          setIsSearching(false);
        },
        (error) => {
          setSearchError("Akses lokasi ditolak atau GPS tidak aktif.");
          setIsSearching(false);
        },
      );
    } else {
      setSearchError("Browser Anda tidak mendukung fitur lokasi.");
    }
  };

  const currentLat = form.watch("latitude");
  const currentLng = form.watch("longitude");

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(handleLocalSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field) => {
          if (field.id === "owner_id") return null;

          const isFullWidth =
            field.type === "textarea" ||
            ["land_certificate_url", "address"].includes(field.id);
          const isCoordinate =
            field.id === "latitude" || field.id === "longitude";
          const icon = getIconForField(field.type, field.id);
          const paddingClass = icon ? "pl-11" : "pl-4";

          return (
            <Controller
              key={field.id}
              name={field.id as keyof FarmerLandFormDataFlat}
              control={form.control}
              rules={{
                required: field.required ? `${field.label} wajib diisi` : false,
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <div
                  className={cn(
                    "group space-y-2",
                    isFullWidth && "md:col-span-2",
                  )}
                >
                  <div className="ml-1 flex items-center justify-between">
                    <Label
                      htmlFor={field.id}
                      className={cn(
                        "text-xs font-black tracking-widest uppercase transition-colors",
                        error
                          ? "text-red-500"
                          : "text-slate-400 group-focus-within:text-green-600",
                      )}
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </Label>
                  </div>

                  <div className="relative">
                    {icon}
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        ref={ref}
                        value={value ?? ""}
                        onChange={onChange}
                        disabled={isSubmitting}
                        placeholder={field.placeholder}
                        className={cn(
                          "flex min-h-[120px] w-full resize-y rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-medium transition-all duration-200",
                          "focus:ring-4 focus:outline-none disabled:bg-slate-100 disabled:opacity-70 focus:bg-white",
                          paddingClass,
                          error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-green-500 focus:ring-green-500/10",
                        )}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        onValueChange={onChange}
                        value={value?.toString() || ""}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          id={field.id}
                          className={cn(
                            "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 font-medium px-4 text-sm transition-all focus:ring-4 focus:ring-green-500/10 focus:bg-white",
                            error && "border-red-500 focus:ring-red-500/10",
                          )}
                        >
                          <SelectValue
                            placeholder={
                              field.placeholder || `Pilih ${field.label}`
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                          {field.options?.map((opt) => {
                            if (opt.value === "") return null;
                            return (
                              <SelectItem
                                key={opt.value}
                                value={opt.value.toString()}
                                className="cursor-pointer rounded-lg font-medium focus:bg-green-50 focus:text-green-700"
                              >
                                {opt.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        ref={ref}
                        type={field.type}
                        value={value ?? ""}
                        onChange={onChange}
                        readOnly={isCoordinate}
                        disabled={isSubmitting}
                        placeholder={
                          isCoordinate
                            ? "Didapatkan dari Peta"
                            : field.placeholder
                        }
                        step={field.type === "number" ? "any" : undefined}
                        className={cn(
                          "h-12 rounded-2xl border-slate-200 bg-slate-50 font-medium transition-all focus-visible:bg-white focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/10",
                          paddingClass,
                          isCoordinate &&
                            "cursor-not-allowed bg-slate-100 text-slate-500 font-mono",
                          error &&
                            "border-red-500 focus-visible:ring-red-500/10",
                        )}
                      />
                    )}
                  </div>
                  {error && (
                    <p className="animate-in fade-in slide-in-from-top-1 text-[11px] font-bold text-red-500 transition-all duration-200 px-1">
                      {error.message || "Input tidak valid"}
                    </p>
                  )}
                </div>
              )}
            />
          );
        })}

        <div className="mt-4 space-y-4 md:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex flex-col gap-1 mb-2">
            <Label className="text-sm font-black tracking-widest text-slate-800 uppercase flex items-center gap-2">
              <MapPin size={18} className="text-green-500" />
              Titik Koordinat Lahan
            </Label>
            <p className="text-xs text-slate-500 font-medium">
              Cari nama daerah, atau gunakan lokasi Anda saat ini agar peta
              langsung mengarah ke lokasi lahan Anda.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-3 text-slate-400"
                size={18}
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearchLocation();
                  }
                }}
                placeholder="Cari Kota, Kecamatan, atau Desa..."
                className="h-12 pl-11 rounded-2xl border-slate-200 bg-slate-50 focus-visible:bg-white focus-visible:ring-green-500/10 focus-visible:border-green-500"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSearchLocation}
                disabled={isSearching || !searchQuery.trim()}
                className="h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold px-6 shadow-lg shadow-green-200"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Cari"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCurrentLocation}
                title="Gunakan Lokasi Saat Ini (GPS)"
                className="h-12 w-12 rounded-2xl border-slate-200 text-slate-600 hover:text-green-600 hover:bg-green-50 hover:border-green-200 transition-colors p-0"
              >
                <LocateFixed size={20} />
              </Button>
            </div>
          </div>

          {searchError && (
            <p className="text-xs font-bold text-red-500 px-1 bg-red-50 py-2 rounded-lg border border-red-100 flex items-center">
              <span className="mr-2">⚠️</span> {searchError}
            </p>
          )}

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner mt-2 h-[350px] relative z-0">
            <MapPickerDynamic
              lat={currentLat}
              lng={currentLng}
              onChange={(lat, lng) => {
                form.setValue("latitude", lat, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                form.setValue("longitude", lng, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
