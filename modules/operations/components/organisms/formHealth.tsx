"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Webcam from "react-webcam";
import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  Camera,
  RotateCcw,
  Zap,
  X,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  TrendingUp,
  Sprout,
  XCircle,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormField } from "@/common/types/form-field";
import Image from "next/image";

export interface HealthFormData {
  imageFile: File | null;
  image_preview: string;
  notes: string;
}

interface FormHealthCheckProps {
  id: string;
  fields: FormField[];
  onSubmit: (values: HealthFormData) => void;
  isSubmitting?: boolean;
  initialData?: any;
}

export const FormHealthCheck = ({
  id,
  fields,
  onSubmit,
  isSubmitting = false,
  initialData,
}: FormHealthCheckProps) => {
  const form = useForm<HealthFormData>({
    defaultValues: useMemo(
      () => ({
        imageFile: null,
        image_preview: initialData?.image_url || "",
        notes: initialData?.notes || "",
      }),
      [initialData],
    ),
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const base64ToFile = (base64String: string, fileName: string) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  const captureImage = useCallback(
    (onChange: (file: File) => void) => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      const file = base64ToFile(imageSrc, `cam-${Date.now()}.jpg`);

      onChange(file);
      form.setValue("image_preview", imageSrc);
      setIsCameraOpen(false);
    },
    [form],
  );

  const handleLocalSubmit = async (data: HealthFormData) => {
    try {
      const res = await (onSubmit as any)(data);
      if (res) {
        setAiResult(res);
      }
    } catch (err) {
      console.error("Gagal memproses submit form analisis:", err);
    }
  };

  const hasResult = !!aiResult;
  const isHealthy = hasResult && !aiResult.disease;
  const confidencePercentage = hasResult
    ? Math.round(aiResult.confidence_score * 100)
    : 0;

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(handleLocalSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      {hasResult ? (
        <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500">
          <div
            className={cn(
              "p-5 rounded-[28px] border flex items-center justify-between gap-4 bg-white shadow-sm",
              isHealthy
                ? "border-emerald-100 bg-emerald-50/20 text-emerald-900"
                : "border-red-100 bg-red-50/20 text-red-900",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0",
                  isHealthy
                    ? "bg-emerald-600 text-white"
                    : "bg-red-600 text-white",
                )}
              >
                {isHealthy ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <AlertTriangle size={22} />
                )}
              </div>
              <div>
                <h4 className="text-sm font-black tracking-tight uppercase">
                  {aiResult.disease?.name || "Tanaman Sehat / Normal"}
                </h4>
                <p className="text-[10px] font-bold opacity-60 italic">
                  {aiResult.disease?.scientific_name || "Status Terkendali"}
                </p>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-100 flex flex-col items-end shrink-0 shadow-inner">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                Akurasi
              </span>
              <span className="text-xs font-black text-slate-800 flex items-center gap-0.5">
                <TrendingUp size={12} className="text-blue-500" />{" "}
                {confidencePercentage}%
              </span>
            </div>
          </div>

          {aiResult.is_outbreak_trigger && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] font-medium leading-relaxed">
                <strong className="font-black uppercase tracking-wide block mb-0.5">
                  Peringatan Resiko Wabah!
                </strong>
                Penyakit ini memiliki tingkat penyebaran yang sangat masif.
                Segera lakukan isolasi tanaman dan ikuti panduan mitigasi
                darurat di bawah ini.
              </div>
            </div>
          )}

          <div className="relative rounded-[32px] overflow-hidden border border-slate-100 shadow-md aspect-square sm:aspect-video flex items-center justify-center bg-slate-900">
            <Image
              fill
              src={form.watch("image_preview")}
              alt="Gambar diagnosis"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Zap className="h-3 w-3 fill-white animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-wider">
                Diagnosis Selesai
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <FileText size={12} /> Rangkuman Gejala
                </h5>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {aiResult.gemini_insight?.disease_description ||
                    aiResult.disease?.description ||
                    "Tidak ada gejala penyakit patogen berbahaya yang terdeteksi."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <XCircle size={12} /> Faktor Penyebab
                </h5>
                <p className="text-xs leading-relaxed text-slate-600 font-medium">
                  {aiResult.gemini_insight?.causes ||
                    "Faktor lingkungan, nutrisi, dan perawatan berada dalam kondisi optimal."}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 w-fit px-2.5 py-1 rounded-full flex items-center gap-1">
                <Wrench size={10} /> Tindakan Kuratif (Pengobatan)
              </h5>
              <ul className="space-y-1.5">
                {(
                  aiResult.gemini_insight?.treatment || [
                    aiResult.disease?.local_treatment ||
                      "Lanjutkan perawatan rutin harian Anda.",
                  ]
                )
                  .filter(Boolean)
                  .map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 font-medium flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded bg-slate-100 text-slate-700 font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm space-y-2">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 w-fit px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sprout size={10} /> Tindakan Preventif (Pencegahan)
              </h5>
              <ul className="space-y-1.5">
                {(
                  aiResult.gemini_insight?.prevention || [
                    aiResult.disease?.preventive_action ||
                      "Jaga kebersihan area sekitar tanaman dari gulma.",
                  ]
                )
                  .filter(Boolean)
                  .map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 font-medium flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
              </ul>
            </div>

            {aiResult.gemini_insight?.recovery && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] leading-relaxed text-slate-500 font-medium">
                <span className="font-bold text-slate-700 uppercase tracking-tight block mb-0.5">
                  Prospek Pemulihan Tanaman:
                </span>
                {aiResult.gemini_insight.recovery}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {fields.map((field) => {
            const isUploadField =
              field.type === "upload" ||
              field.id === "image" ||
              field.id === "image_url";
            const targetFieldName = isUploadField ? "imageFile" : field.id;

            return (
              <Controller
                key={field.id}
                name={targetFieldName as any}
                control={form.control}
                rules={{
                  required: field.required
                    ? `${field.label} wajib diisi`
                    : false,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="group space-y-2">
                    <div className="ml-1 flex items-center justify-between">
                      <Label
                        htmlFor={field.id}
                        className={cn(
                          "text-xs font-black tracking-widest uppercase transition-colors",
                          error
                            ? "text-red-500"
                            : "text-slate-400 group-focus-within:text-emerald-600",
                        )}
                      >
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                    </div>

                    <div className="relative">
                      {isUploadField ? (
                        <div className="space-y-3">
                          {!form.watch("image_preview") ? (
                            isCameraOpen ? (
                              <div className="relative rounded-[40px] overflow-hidden bg-slate-950 aspect-square sm:aspect-video flex flex-col items-center justify-center shadow-inner">
                                <button
                                  type="button"
                                  onClick={() => setIsCameraOpen(false)}
                                  className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-red-500"
                                >
                                  <X size={20} />
                                </button>
                                <Webcam
                                  audio={false}
                                  ref={webcamRef}
                                  screenshotFormat="image/jpeg"
                                  videoConstraints={{
                                    facingMode: "environment",
                                  }}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => captureImage(onChange)}
                                  className="absolute bottom-6 bg-white text-emerald-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center gap-2"
                                >
                                  <Camera size={18} /> Ambil Foto
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <label
                                  className={cn(
                                    "flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50 rounded-[32px] p-8 text-center cursor-pointer hover:bg-white hover:border-emerald-400 transition-all",
                                    error && "border-red-500 bg-red-50/30",
                                  )}
                                >
                                  <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
                                  <span className="text-sm font-bold text-slate-700">
                                    Pilih dari Galeri
                                  </span>
                                  <span className="text-xs text-slate-400 mt-1">
                                    Gambar lokal (Maks 16MB)
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        onChange(file);
                                        form.setValue(
                                          "image_preview",
                                          URL.createObjectURL(file),
                                        );
                                      }
                                    }}
                                  />
                                </label>

                                <div className="relative flex items-center py-1">
                                  <div className="flex-grow border-t border-slate-200"></div>
                                  <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-black tracking-widest uppercase">
                                    ATAU
                                  </span>
                                  <div className="flex-grow border-t border-slate-200"></div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setIsCameraOpen(true)}
                                  className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[24px] h-14 font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all"
                                >
                                  <Camera size={20} /> Gunakan Kamera Langsung
                                </button>
                              </div>
                            )
                          ) : (
                            <div className="relative group/preview rounded-[40px] overflow-hidden border-2 border-slate-100 bg-white shadow-lg aspect-square sm:aspect-video flex items-center justify-center">
                              <Image
                                fill
                                src={form.watch("image_preview")}
                                alt="Preview Daun"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/preview:opacity-100 transition-all flex flex-col items-center justify-center backdrop-blur-[2px]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onChange(null);
                                    form.setValue("image_preview", "");
                                  }}
                                  className="bg-white text-slate-950 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-red-600"
                                >
                                  <RotateCcw size={16} /> Ganti Foto
                                </button>
                              </div>
                              <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                <Zap className="h-3 w-3 fill-white" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">
                                  Sudah Dipilih
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Textarea
                          id={field.id}
                          className="rounded-[24px] border-slate-200 focus-visible:ring-emerald-500 min-h-[120px] pt-4 pl-4"
                          placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                          value={value || ""}
                          onChange={onChange}
                          disabled={isSubmitting}
                        />
                      )}
                    </div>
                    {error && (
                      <p className="px-2 flex items-center gap-1.5 text-[11px] font-bold text-red-500">
                        <AlertCircle size={14} /> {error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            );
          })}
        </div>
      )}

      {!hasResult && (
        <div className="p-5 rounded-[32px] bg-emerald-50/50 border border-emerald-100 flex items-start gap-4">
          <Sparkles className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-[12px] font-black text-emerald-900 uppercase tracking-tight">
              Analisis Sekali Klik
            </p>
            <p className="text-[11px] leading-relaxed text-emerald-700/80 font-medium">
              Foto akan otomatis diunggah dan dianalisis langsung oleh
              kecerdasan buatan ketika Anda menekan tombol simpan di bawah
              modal.
            </p>
          </div>
        </div>
      )}
    </form>
  );
};
