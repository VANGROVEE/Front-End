"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  AlignLeft,
  Lock,
  Mail,
  Phone,
  User,
  Calendar,
  Check,
} from "lucide-react";
import { FormField } from "@/common/types/form-field";

interface DynamicFormProps {
  id?: string;
  form: UseFormReturn<any>;
  fields: FormField[];
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export const DynamicForm = ({
  id,
  form,
  fields,
  onSubmit,
  isSubmitting,
}: DynamicFormProps) => {
  const getIcon = (type: string, fieldId: string) => {
    const iconProps = {
      size: 18,
      className:
        "absolute left-3 top-3.5 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
    };
    if (fieldId.includes("email")) return <Mail {...iconProps} />;
    if (fieldId.includes("name")) return <User {...iconProps} />;
    if (fieldId.includes("phone")) return <Phone {...iconProps} />;
    if (type === "password") return <Lock {...iconProps} />;
    if (type === "textarea") return <AlignLeft {...iconProps} />;
    if (type === "date") return <Calendar {...iconProps} />;
    return null;
  };

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 outline-none"
    >
      <div className="grid gap-5">
        {fields.map((field) => (
          <Controller
            key={field.id}
            name={field.id}
            control={form.control}
            render={({ field: { onChange, value, ref }, fieldState }) => {
              const hasError = !!fieldState.error;
              const isCheckbox = field.type === "checkbox";

              return (
                <div
                  className={cn(
                    "group space-y-2",
                    isCheckbox &&
                      "flex flex-row items-center space-x-3 space-y-0 p-1",
                  )}
                >
                  {/* Label - Sembunyikan jika checkbox karena checkbox punya styling sendiri */}
                  {!isCheckbox && (
                    <div className="ml-1 flex items-center justify-between">
                      <label
                        htmlFor={field.id}
                        className={cn(
                          "text-[12px] font-bold tracking-wider uppercase transition-colors",
                          hasError
                            ? "text-red-500"
                            : "text-slate-500 group-focus-within:text-green-600",
                        )}
                      >
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-red-400">*</span>
                        )}
                      </label>
                    </div>
                  )}

                  <div
                    className={cn(
                      "relative w-full",
                      isCheckbox && "flex items-center gap-3",
                    )}
                  >
                    {/* Render Icon untuk Input Text/Password */}
                    {!isCheckbox &&
                      field.type !== "select" &&
                      getIcon(field.type, field.id)}

                    {(() => {
                      switch (field.type) {
                        case "textarea":
                          return (
                            <Textarea
                              id={field.id}
                              ref={ref}
                              value={value ?? ""}
                              onChange={onChange}
                              disabled={isSubmitting}
                              placeholder={field.placeholder}
                              className={cn(
                                "min-h-[100px] rounded-xl border bg-white pl-10 transition-all focus:ring-4",
                                hasError
                                  ? "border-red-500 focus:ring-red-500/10"
                                  : "border-slate-200 focus:border-green-500 focus:ring-green-500/10",
                              )}
                            />
                          );
                        case "select":
                          return (
                            <Select
                              onValueChange={onChange}
                              value={value?.toString()}
                              disabled={isSubmitting}
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-12 rounded-xl border-slate-200 bg-white px-4 text-sm focus:ring-4 focus:ring-green-500/10",
                                  hasError &&
                                    "border-red-500 focus:ring-red-500/10",
                                )}
                              >
                                <SelectValue
                                  placeholder={
                                    field.placeholder || `Pilih ${field.label}`
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-slate-200">
                                {field.options?.map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value.toString()}
                                    className="cursor-pointer focus:bg-green-50 focus:text-green-600"
                                  >
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        case "checkbox":
                          return (
                            <>
                              <Checkbox
                                id={field.id}
                                checked={value}
                                onCheckedChange={onChange}
                                disabled={isSubmitting}
                                className="h-5 w-5 rounded-md border-slate-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                              />
                              <label
                                htmlFor={field.id}
                                className="text-sm font-semibold text-slate-600 cursor-pointer select-none"
                              >
                                {field.label}
                              </label>
                            </>
                          );
                        default:
                          return (
                            <Input
                              id={field.id}
                              ref={ref}
                              type={field.type}
                              value={value ?? ""}
                              onChange={onChange}
                              disabled={isSubmitting}
                              placeholder={field.placeholder}
                              className={cn(
                                "h-12 rounded-xl border-slate-200 pl-10 transition-all focus-visible:ring-4",
                                hasError
                                  ? "border-red-500 focus-visible:ring-red-500/10"
                                  : "focus-visible:border-green-500 focus-visible:ring-green-500/10",
                              )}
                            />
                          );
                      }
                    })()}
                  </div>

                  {/* Error Message */}
                  {hasError && (
                    <p className="animate-in fade-in slide-in-from-top-1 text-[11px] font-bold text-red-500 ml-1">
                      {fieldState.error?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
        ))}
      </div>
    </form>
  );
};
