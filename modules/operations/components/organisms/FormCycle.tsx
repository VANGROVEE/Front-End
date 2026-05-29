"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Settings2,
  Sprout,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FormField } from "@/common/types/form-field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface CycleFormData {
  commodity_id: string;
  variety: string;
  planting_method: string;
  start_date: Date | undefined;
  estimated_harvest: Date | undefined;
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
      "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
  };

  if (fieldId === "commodity_id" || fieldId === "commodity_name")
    return <Sprout {...props} />;
  if (fieldId === "variety") return <Tag {...props} />;
  if (fieldId === "planting_method") return <Settings2 {...props} />;
  if (fieldId.includes("date") || fieldId.includes("harvest"))
    return <CalendarIcon {...props} />;
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
        commodity_id: initialData?.commodity_id || "",
        variety: initialData?.variety || "",
        planting_method: initialData?.planting_method || "",
        start_date: initialData?.start_date || undefined,
        estimated_harvest: initialData?.estimated_harvest || undefined,
        status: initialData?.status || "HARVESTED",
      }),
      [initialData],
    ),
  });

  const [openCombobox, setOpenCombobox] = useState<Record<string, boolean>>({});

  return (
    <form
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 outline-none"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field) => {
          const isFullWidth = [
            "commodity_id",
            "commodity_name",
            "status",
          ].includes(field.id);
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
                              "h-12 w-full justify-between rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm font-medium transition-all hover:bg-white focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10",
                              paddingClass,
                              error &&
                                "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                              !value && "font-normal text-slate-500",
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

                            <CommandList className="max-h-[250px] overflow-y-auto overflow-x-hidden">
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
                    ) : field.type === "date" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={isSubmitting}
                            className={cn(
                              "h-12 w-full justify-start rounded-2xl border-slate-200 bg-slate-50 text-left font-medium transition-all hover:bg-white focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10",
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
                            className="rounded-2xl border border-slate-200 p-3"
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Input
                        id={field.id}
                        ref={ref}
                        type={field.type}
                        value={(value as string) ?? ""}
                        onChange={onChange}
                        disabled={isSubmitting}
                        placeholder={field.placeholder}
                        className={cn(
                          "h-12 rounded-2xl border-slate-200 bg-slate-50 font-medium transition-all focus-visible:bg-white focus-visible:border-green-500 focus-visible:ring-4 focus-visible:ring-green-500/10",
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
