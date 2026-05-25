"use client";

import React, { useState, useRef, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import Webcam from "react-webcam";
import { format, isBefore, startOfDay } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Camera,
  X,
  Upload,
  AlertCircle,
  ChevronsUpDown,
  Check,
  Scale,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

import { MediaPreview } from "../molecules/MediaPreview";
import { AiInsightCard } from "../molecules/AiInsightCard";
import { getIconForField } from "../../const/getIcon";

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

export const FormActivity = ({
  id,
  cycle,
  fields,
  onSubmit,
  onPredict,
}: any) => {
  const form = useForm({
    defaultValues: {
      activity_date: new Date(),
      activity_type: "",
      amount: "",
      unit: "",
      notes: "",
      total_yield_kg: "",
      image_preview: "",
      image_url: "",
      image_key: "",
      is_productive: true,
      ai_raw_result: null,
    },
  });

  const [openCombobox, setOpenCombobox] = useState<Record<string, boolean>>({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [statusMedia, setStatusMedia] = useState<
    "idle" | "uploading" | "analyzing" | "ready" | "error"
  >("idle");
  const webcamRef = useRef<Webcam>(null);

  const selectedType = useWatch({
    control: form.control,
    name: "activity_type",
  });
  const selectedDate = useWatch({
    control: form.control,
    name: "activity_date",
  });
  const aiResult = useWatch({ control: form.control, name: "ai_raw_result" });
  const imagePreview = useWatch({
    control: form.control,
    name: "image_preview",
  });

  const visibleFields = useMemo(() => {
    const needsDose = ["FERTILIZING", "PEST_CONTROL"].includes(selectedType);

    return fields.filter((f: any) => {
      if (f.type === "upload" || f.id === "total_yield_kg") return false;
      if ((f.id === "amount" || f.id === "unit") && !needsDose) return false;
      return true;
    });
  }, [fields, selectedType]);

  const needsMedia = ["OBSERVATION", "HARVESTING"].includes(selectedType);
  const isObservationMode = selectedType === "OBSERVATION";
  const isHarvestingMode = selectedType === "HARVESTING";

  const isDateInvalid = useMemo(() => {
    if (!selectedDate || !cycle?.start_date) return false;
    return isBefore(
      startOfDay(new Date(selectedDate)),
      startOfDay(new Date(cycle.start_date)),
    );
  }, [selectedDate, cycle]);

  const handleAIAnalysis = async (url: string) => {
    setStatusMedia("analyzing");
    try {
      const res = await onPredict(url);
      form.setValue("ai_raw_result", res);
      setStatusMedia("ready");
    } catch (err) {
      setStatusMedia("error");
      toast.error("Gagal menganalisis gambar");
    }
  };

  const handleUploadAndProcess = async (file: File) => {
    setStatusMedia("uploading");
    form.setValue("image_preview", URL.createObjectURL(file));
    try {
      const res = await uploadFiles("healthReportImage", { files: [file] });
      if (!res?.[0]) throw new Error();
      form.setValue("image_url", res[0].url);
      form.setValue("image_key", res[0].key);

      if (isObservationMode) await handleAIAnalysis(res[0].url);
      else setStatusMedia("ready");
    } catch (err) {
      setStatusMedia("idle");
      toast.error("Upload gagal");
    }
  };

  const handleOnSubmit = (data: any) => {
    if (isDateInvalid) return toast.error("Tanggal tidak valid");

    const formattedPayload = {
      ...data,
      cycle_id: cycle.id,
      amount: data.amount ? Number(data.amount) : null,
      total_yield_kg: isHarvestingMode ? Number(data.total_yield_kg || 0) : 0,
      image_proof_url: isHarvestingMode ? form.getValues("image_url") : null,
    };
    onSubmit(formattedPayload);
  };

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(handleOnSubmit)}
      className="space-y-6"
    >
      {/* Alert Tanggal */}
      {isDateInvalid && (
        <Alert
          variant="destructive"
          className="rounded-2xl bg-red-50 border-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-[11px] font-bold text-red-800">
            Aktivitas tidak boleh sebelum tanggal tanam (
            {format(new Date(cycle.start_date), "dd MMM yyyy")}).
          </AlertDescription>
        </Alert>
      )}

      {/* Media Preview Area */}
      {(imagePreview || statusMedia !== "idle") && (
        <div className="space-y-4 animate-in fade-in zoom-in-95">
          <MediaPreview
            preview={imagePreview}
            status={statusMedia}
            onReset={() => {
              form.setValue("image_preview", "");
              form.setValue("ai_raw_result", null);
              setStatusMedia("idle");
            }}
            onRetry={() => handleAIAnalysis(form.getValues("image_url"))}
          />
          {statusMedia === "ready" && isObservationMode && aiResult && (
            <AiInsightCard data={aiResult} />
          )}
        </div>
      )}

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleFields.map((field: any) => (
          <Controller
            key={field.id}
            name={field.id as any}
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <div
                className={cn(
                  "space-y-2",
                  (field.id === "activity_type" || field.type === "textarea") &&
                    "md:col-span-2",
                )}
              >
                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
                  {field.label}
                </Label>
                <div className="relative">
                  {getIconForField(field.type, field.id)}

                  {field.type === "select" ? (
                    <Popover
                      open={openCombobox[field.id]}
                      onOpenChange={(o) =>
                        setOpenCombobox((p) => ({ ...p, [field.id]: o }))
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-12 w-full justify-between rounded-2xl bg-slate-50 pl-11 text-sm font-bold border-slate-200/60"
                        >
                          {value
                            ? field.options?.find(
                                (o: any) =>
                                  o.value.toString() === value.toString(),
                              )?.label
                            : field.placeholder}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-30" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl shadow-2xl border-slate-100 overflow-hidden">
                        <Command>
                          <CommandInput
                            placeholder="Cari..."
                            className="h-11 font-medium"
                          />
                          <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            <CommandEmpty className="py-6 text-xs text-slate-400 font-bold uppercase text-center">
                              Tidak ditemukan
                            </CommandEmpty>
                            <CommandGroup>
                              {field.options?.map((opt: any) => (
                                <CommandItem
                                  key={opt.value}
                                  onSelect={() => {
                                    onChange(opt.value.toString());
                                    setOpenCombobox((p) => ({
                                      ...p,
                                      [field.id]: false,
                                    }));
                                  }}
                                  className="cursor-pointer py-3 px-4 rounded-xl mb-1 aria-selected:bg-emerald-50 aria-selected:text-emerald-700"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-emerald-600 shrink-0",
                                      value === opt.value.toString()
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <span className="font-bold text-xs">
                                    {opt.label}
                                  </span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : field.type === "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-12 w-full justify-start rounded-2xl bg-slate-50 pl-11 text-sm font-bold border-slate-200/60",
                            isDateInvalid && "border-red-500 bg-red-50",
                            value && "border-emerald-200 text-emerald-900",
                          )}
                        >
                          {value
                            ? format(value, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            : field.placeholder}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-auto p-0 rounded-[28px] shadow-2xl border-none overflow-hidden"
                      >
                        <Calendar
                          mode="single"
                          selected={value}
                          onSelect={(d) => {
                            onChange(d);
                            document.dispatchEvent(
                              new KeyboardEvent("keydown", { key: "Escape" }),
                            );
                          }}
                          disabled={(date) =>
                            isBefore(
                              startOfDay(date),
                              startOfDay(new Date(cycle.start_date)),
                            )
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      type={field.type}
                      onChange={onChange}
                      value={value || ""}
                      placeholder={field.placeholder}
                      className="h-12 rounded-2xl bg-slate-50 pl-11 border-slate-200 focus:bg-white transition-all font-bold text-sm"
                    />
                  )}
                </div>
              </div>
            )}
          />
        ))}

        {/* Media Uploader - Hanya muncul jika butuh media & belum ada preview */}
        {needsMedia && !imagePreview && (
          <div className="md:col-span-2 space-y-4 animate-in slide-in-from-bottom-2">
            <Label
              className={cn(
                "text-[10px] font-black uppercase tracking-widest pl-1",
                isObservationMode ? "text-emerald-600" : "text-amber-600",
              )}
            >
              {isObservationMode ? "Analisis Vangrove AI" : "Bukti Aktivitas"}
            </Label>

            {isCameraOpen ? (
              <div className="relative rounded-[32px] overflow-hidden aspect-video bg-black border-4 border-slate-800 shadow-2xl ring-4 ring-emerald-500/20">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "environment" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 inset-x-0 flex justify-center gap-4 px-6">
                  <Button
                    type="button"
                    onClick={() => {
                      const src = webcamRef.current?.getScreenshot();
                      if (src)
                        fetch(src)
                          .then((r) => r.blob())
                          .then((b) =>
                            handleUploadAndProcess(
                              new File([b], "cam.jpg", { type: "image/jpeg" }),
                            ),
                          );
                      setIsCameraOpen(false);
                    }}
                    className="rounded-full bg-white text-slate-900 px-8 h-14 font-black shadow-2xl flex-1"
                  >
                    SCAN DAUN
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setIsCameraOpen(false)}
                    className="rounded-full w-14 h-14 p-0 shadow-2xl"
                  >
                    <X size={24} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center h-[140px] border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[32px] cursor-pointer hover:border-emerald-400 transition-all group">
                  <div className="p-3 bg-white rounded-xl shadow-sm mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="h-5 w-5 text-slate-400 group-hover:text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Pilih Media
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUploadAndProcess(f);
                    }}
                  />
                </label>
                <Button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className={cn(
                    "h-[140px] rounded-[32px] flex flex-col gap-2 font-black text-[10px] tracking-widest shadow-xl active:scale-95 transition-all",
                    isObservationMode
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-900 hover:bg-slate-800",
                  )}
                >
                  <Camera size={28} /> BUKA KAMERA
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Harvesting Section */}
      {isHarvestingMode && (
        <div className="p-6 rounded-[32px] bg-amber-50/30 border border-dashed border-amber-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-amber-700 tracking-widest pl-1">
              Hasil Panen (Kg)
            </Label>
            <div className="relative">
              <Scale
                className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400"
                size={18}
              />
              <Input
                type="number"
                step="any"
                placeholder="0.00"
                {...form.register("total_yield_kg")}
                className="h-12 pl-11 rounded-2xl border-amber-200 bg-white font-bold"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <div className="space-y-0.5">
              <Label className="text-xs font-black text-slate-700 uppercase tracking-tight">
                Status Lahan
              </Label>
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight">
                Lanjutkan Siklus Tanam?
              </p>
            </div>
            <Switch
              checked={form.watch("is_productive")}
              onCheckedChange={(v) => form.setValue("is_productive", v)}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        </div>
      )}
    </form>
  );
};
