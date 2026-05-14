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
  Loader2,
  X,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormField } from "@/common/types/form-field";
import { generateReactHelpers, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";

export interface HealthFormData {
  image_url: string;
  image_key: string;
  notes: string;
}

interface FormHealthCheckProps {
  id: string;
  fields: FormField[];
  onSubmit: (values: any) => void;
  isSubmitting?: boolean;
  initialData?: any;
}

const getIconForField = (fieldId: string) => {
  const props = {
    size: 18,
    className:
      "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 transition-colors group-focus-within:text-blue-600",
  };

  if (fieldId === "image") return <ImageIcon {...props} />;
  if (fieldId === "notes")
    return <FileText {...props} style={{ top: "24px" }} />;
  return null;
};

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
        image_url: initialData?.image_url || "",
        image_key: initialData?.image_key || "",
        notes: initialData?.notes || "",
      }),
      [initialData],
    ),
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isUploadingCam, setIsUploadingCam] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const { uploadFiles } = generateReactHelpers<OurFileRouter>();
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

  const captureAndUpload = useCallback(
    async (onChange: (url: string) => void) => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      setIsUploadingCam(true);
      try {
        const file = base64ToFile(imageSrc, `cam-${Date.now()}.jpg`);

        const res = await uploadFiles("healthReportImage", {
          files: [file],
        });

        if (res && res.length > 0) {
          form.setValue("image_url", res[0].url);
          form.setValue("image_key", res[0].key);
          onChange(res[0].url);
          setIsCameraOpen(false);
        }
      } catch (error) {
        console.error("Gagal mengunggah foto dari kamera:", error);
        alert("Gagal mengunggah foto. Periksa koneksi Anda.");
      } finally {
        setIsUploadingCam(false);
      }
    },
    [form],
  );

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6">
        {fields.map((field) => {
          const icon = getIconForField(field.id);
          const paddingClass = icon ? "pl-11" : "pl-4";

          return (
            <Controller
              key={field.id}
              name={field.id as keyof HealthFormData}
              control={form.control}
              rules={{
                required: field.required ? `${field.label} wajib diisi` : false,
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
                          : "text-slate-400 group-focus-within:text-blue-600",
                      )}
                    >
                      {field.label}{" "}
                      {field.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </Label>
                  </div>

                  <div className="relative">
                    {field.type === "upload" ? (
                      <div className="space-y-3">
                        {!form.watch("image_url") ? (
                          isCameraOpen ? (
                            <div className="relative rounded-[40px] overflow-hidden bg-slate-950 aspect-square sm:aspect-video flex flex-col items-center justify-center shadow-inner">
                              <button
                                type="button"
                                onClick={() => setIsCameraOpen(false)}
                                className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full backdrop-blur hover:bg-red-500 transition-colors"
                              >
                                <X size={20} />
                              </button>

                              {isUploadingCam ? (
                                <div className="flex flex-col items-center justify-center z-20 space-y-4">
                                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                                  <p className="text-white text-xs font-black tracking-widest uppercase">
                                    Memproses Foto AI...
                                  </p>
                                </div>
                              ) : (
                                <>
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
                                    onClick={() => captureAndUpload(onChange)}
                                    className="absolute bottom-6 bg-white text-blue-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center gap-2"
                                  >
                                    <Camera size={18} />
                                    Jepret & Analisis
                                  </button>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-5">
                              <UploadDropzone<
                                OurFileRouter,
                                "healthReportImage"
                              >
                                endpoint="healthReportImage"
                                onClientUploadComplete={(res) => {
                                  form.setValue("image_url", res[0].url);
                                  form.setValue("image_key", res[0].key);
                                  onChange(res[0].url);
                                }}
                                onUploadError={(error: Error) => {
                                  console.error(`ERROR! ${error.message}`);
                                }}
                                content={{
                                  label: "Pilih dari Galeri",
                                  allowedContent: "Gambar (Maks 4MB)",
                                }}
                                appearance={{
                                  container: cn(
                                    "border-2 border-dashed border-slate-200 bg-slate-50 rounded-[32px] transition-all hover:bg-white hover:border-blue-400 shadow-inner p-4",
                                    error && "border-red-500 bg-red-50/30",
                                  ),
                                  button:
                                    "bg-slate-900 rounded-xl px-8 py-2 font-bold after:bg-blue-600",
                                }}
                              />

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
                                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-[24px] h-14 font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all"
                              >
                                <Camera size={20} />
                                Gunakan Kamera Langsung
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="relative group/preview rounded-[40px] overflow-hidden border-2 border-slate-100 bg-white shadow-lg aspect-square sm:aspect-video flex items-center justify-center">
                            <Image
                              fill
                              src={form.getValues("image_url")}
                              alt="Tanaman yang dianalisis"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/preview:opacity-100 transition-all flex flex-col items-center justify-center backdrop-blur-[2px] gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  form.setValue("image_url", "");
                                  form.setValue("image_key", "");
                                  onChange("");
                                }}
                                className="bg-white text-slate-950 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center gap-2 hover:bg-red-50 hover:text-red-600"
                              >
                                <RotateCcw size={16} />
                                Ganti Foto
                              </button>
                            </div>
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-in zoom-in-50">
                              <Zap className="h-3 w-3 fill-white" />
                              <span className="text-[10px] font-black uppercase tracking-tighter">
                                Siap Dianalisis AI
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>

                  {error && (
                    <p className="px-2 flex items-center gap-1.5 text-[11px] font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={14} /> {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          );
        })}
      </div>

      <div className="p-5 rounded-[32px] bg-blue-50/50 border border-blue-100 flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <Sparkles className="h-5 w-5 text-blue-600" />
        </div>
        <div className="space-y-1">
          <p className="text-[12px] font-black text-blue-900 uppercase tracking-tight">
            Analisis Visual Tanaman
          </p>
          <p className="text-[11px] leading-relaxed text-blue-700/80 font-medium">
            Sistem AI mendeteksi tanda penyakit pada permukaan daun. Anda bisa
            <strong> memilih foto dari galeri</strong> atau menggunakan{" "}
            <strong>kamera web langsung</strong> untuk hasil cepat.
          </p>
        </div>
      </div>
    </form>
  );
};
