"use client";

import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Sprout, Calendar, CheckCircle2, Settings2, Tag } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormField } from "@/common/types/form-field";

export interface CycleFormData {
  commodity_name: string;
  variety?: string;
  planting_method?: string;
  start_date: string;
  estimated_harvest?: string;
  status: string;
}

interface FormCycleProps {
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
      "absolute left-4 top-3.5 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
  };
  if (fieldId === "commodity_name") return <Sprout {...props} />;
  if (fieldId === "variety") return <Tag {...props} />;
  if (fieldId === "planting_method") return <Settings2 {...props} />;
  if (fieldId.includes("date") || fieldId.includes("harvest"))
    return <Calendar {...props} />;
  return null;
};

export const FormCycle = ({
  id,
  fields,
  onSubmit,
  isSubmitting = false,
  initialData,
}: FormCycleProps) => {
  const form = useForm<CycleFormData>({
    defaultValues: useMemo(
      () => ({
        commodity_name: initialData?.commodity_name || "",
        variety: initialData?.variety || "",
        planting_method: initialData?.planting_method || "",
        start_date: initialData?.start_date || "",
        estimated_harvest: initialData?.estimated_harvest || "",
        status: initialData?.status || "ACTIVE", // Default ke sedang berjalan
      }),
      [initialData],
    ),
  });

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field) => {
          const isFullWidth = ["commodity_name", "status"].includes(field.id);
          const icon = getIconForField(field.id);
          const paddingClass = icon ? "pl-11" : "pl-4";

          return (
            <Controller
              key={field.id}
              name={field.id as keyof CycleFormData}
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

                    {field.type === "select" ? (
                      <Select
                        onValueChange={onChange}
                        value={value?.toString() || ""}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 font-medium px-4 text-sm transition-all focus:ring-4 focus:ring-green-500/10 focus:bg-white",
                            error && "border-red-500 focus:ring-red-500/10",
                          )}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                          {field.options?.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                              className="cursor-pointer rounded-lg font-medium focus:bg-green-50 focus:text-green-700"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        ref={ref}
                        type={field.type}
                        value={value ?? ""}
                        onChange={onChange}
                        disabled={isSubmitting}
                        placeholder={field.placeholder}
                        className={cn(
                          "h-12 rounded-2xl border-slate-200 bg-slate-50 font-medium transition-all focus-visible:bg-white focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/10",
                          paddingClass,
                          error &&
                            "border-red-500 focus-visible:ring-red-500/10",
                        )}
                      />
                    )}
                  </div>
                  {error && (
                    <p className="px-1 text-[11px] font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          );
        })}
      </div>
    </form>
  );
};
