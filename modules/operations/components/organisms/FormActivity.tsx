"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Scale,
  Check,
  ChevronsUpDown,
  ClipboardList,
  CalendarIcon,
  Droplets,
  PenLine,
  Sprout,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
import { FormField } from "@/common/types/form-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const getIconForField = (type: string, fieldId: string) => {
  const props = {
    size: 18,

    className:
      "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
  };

  if (type === "textarea" || fieldId.includes("notes")) {
    return (
      <PenLine
        size={18}
        className="absolute left-4 top-4 text-slate-400 z-10 transition-colors group-focus-within:text-green-600"
      />
    );
  }

  if (type === "select" || fieldId.includes("type"))
    return <ClipboardList {...props} />;
  if (fieldId.includes("date")) return <CalendarIcon {...props} />;
  if (fieldId.includes("amount")) return <Scale {...props} />;
  if (fieldId.includes("unit")) return <Droplets {...props} />;

  return <Sprout {...props} />;
};

interface FormActivityProps {
  id: string;
  fields: FormField[];
  onSubmit: (values: any) => void;
  isSubmitting?: boolean;
}

export const FormActivity = ({
  id,
  fields,
  onSubmit,
  isSubmitting = false,
}: FormActivityProps) => {
  const form = useForm({
    defaultValues: {
      activity_date: new Date().toISOString().split("T")[0],
      activity_type: "",
      amount: "",
      unit: "",
      notes: "",
    },
  });

  const [openCombobox, setOpenCombobox] = useState<Record<string, boolean>>({});

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field: FormField) => {
          const isFullWidth =
            field.type === "textarea" || field.id === "activity_type";
          const icon = getIconForField(field.type, field.id);
          const paddingClass = icon ? "pl-11" : "pl-4";

          return (
            <Controller
              key={field.id}
              name={field.id as any}
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
                        "text-[11px] font-black uppercase tracking-widest transition-colors",
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
                      <Popover
                        open={openCombobox[field.id]}
                        onOpenChange={(open) =>
                          setOpenCombobox((prev) => ({
                            ...prev,
                            [field.id]: open,
                          }))
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            id={field.id}
                            variant="outline"
                            role="combobox"
                            disabled={isSubmitting}
                            className={cn(
                              "h-12 w-full justify-between rounded-2xl border-slate-200 bg-slate-50 text-sm font-medium transition-all hover:bg-white focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10",
                              paddingClass,
                              error &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                              !value && "text-slate-500 font-normal",
                            )}
                          >
                            {value
                              ? field.options?.find(
                                  (opt) =>
                                    opt.value.toString() === value?.toString(),
                                )?.label
                              : field.placeholder || `Pilih ${field.label}`}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-2xl border-slate-200 p-0 shadow-xl">
                          <Command>
                            <CommandInput
                              placeholder={`Cari ${field.label}...`}
                              className="h-11"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Tidak ada data ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {field.options?.map((opt) => {
                                  if (opt.value === "") return null;
                                  return (
                                    <CommandItem
                                      key={opt.value}
                                      value={opt.label}
                                      onSelect={() => {
                                        onChange(opt.value.toString());
                                        setOpenCombobox((prev) => ({
                                          ...prev,
                                          [field.id]: false,
                                        }));
                                      }}
                                      className="cursor-pointer rounded-xl font-medium aria-selected:bg-green-50 aria-selected:text-green-700"
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          value === opt.value.toString()
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {opt.label}
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        {...ref}
                        onChange={onChange}
                        value={value}
                        disabled={isSubmitting}
                        placeholder={field.placeholder}
                        className={cn(
                          "min-h-[120px] w-full resize-y rounded-2xl border-slate-200 bg-slate-50 py-3 text-sm font-medium transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 disabled:bg-slate-100 disabled:opacity-70",
                          paddingClass,
                          error &&
                            "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                        )}
                      />
                    ) : field.type === "date" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isSubmitting}
                            className={cn(
                              "h-12 w-full justify-start rounded-2xl border-slate-200 bg-slate-50 text-left font-medium transition-all hover:bg-white focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10", // Menggunakan tema green dan rounded-2xl
                              paddingClass,
                              !value && "text-slate-500 font-normal",
                              error &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                            )}
                          >
                            {value ? (
                              format(value as Date, "dd MMMM yyyy", {
                                locale: idLocale,
                              })
                            ) : (
                              <span>{field.placeholder}</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto rounded-2xl p-0 shadow-lg"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={value as Date}
                            onSelect={onChange}
                            className="rounded-2xl border border-slate-200 p-3" // Padding dalam kalender agar tidak menempel
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Input
                        id={field.id}
                        {...ref}
                        type={field.type}
                        onChange={onChange}
                        value={value}
                        disabled={isSubmitting}
                        placeholder={field.placeholder}
                        className={cn(
                          "h-12 w-full rounded-2xl border-slate-200 bg-slate-50 font-medium transition-all focus-visible:bg-white focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/10",
                          paddingClass,
                          error &&
                            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/10",
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
