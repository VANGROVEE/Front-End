"use client";

import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar, Activity, Database, Scale, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormField } from "@/common/types/form-field";

const getIconForField = (fieldId: string) => {
  const props = {
    size: 18,
    className:
      "absolute left-4 top-3.5 text-slate-400 group-focus-within:text-green-600 transition-colors z-10",
  };
  if (fieldId === "activity_date") return <Calendar {...props} />;
  if (fieldId === "activity_type") return <Activity {...props} />;
  if (fieldId === "amount") return <Database {...props} />;
  if (fieldId === "unit") return <Scale {...props} />;
  if (fieldId === "notes") return <StickyNote {...props} className="top-4" />;
  return null;
};

export const FormActivity = ({ id, fields, onSubmit, isSubmitting }: any) => {
  const form = useForm({
    defaultValues: {
      activity_date: new Date().toISOString().split("T")[0],
      activity_type: "",
      amount: "",
      unit: "",
      notes: "",
    },
  });

  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field: FormField) => {
          const isFullWidth =
            field.type === "textarea" || field.id === "activity_type";
          const icon = getIconForField(field.id);

          return (
            <Controller
              key={field.id}
              name={field.id as any}
              control={form.control}
              rules={{ required: field.required }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <div
                  className={cn(
                    "group space-y-1.5",
                    isFullWidth && "md:col-span-2",
                  )}
                >
                  <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="relative">
                    {icon}
                    {field.type === "select" ? (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger
                          className={cn(
                            "h-12 rounded-2xl bg-slate-50 border-slate-200 pl-11 font-bold",
                            error && "border-red-500",
                          )}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          {field.options?.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                              className="font-medium rounded-xl"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        {...ref}
                        onChange={onChange}
                        value={value}
                        placeholder={field.placeholder}
                        className={cn(
                          "min-h-[100px] rounded-2xl bg-slate-50 border-slate-200 pl-11 pt-4 font-medium",
                          error && "border-red-500",
                        )}
                      />
                    ) : (
                      <Input
                        type={field.type}
                        onChange={onChange}
                        value={value}
                        placeholder={field.placeholder}
                        className={cn(
                          "h-12 rounded-2xl bg-slate-50 border-slate-200 pl-11 font-bold",
                          error && "border-red-500",
                        )}
                      />
                    )}
                  </div>
                </div>
              )}
            />
          );
        })}
      </div>
    </form>
  );
};
