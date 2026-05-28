"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Save, X } from "lucide-react";
import React from "react";

interface DynamicFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  formId: string;
  isLoading?: boolean;
  isEditMode?: boolean;
  children: React.ReactNode;
}

export function DynamicFormDialog({
  isOpen,
  onClose,
  title,
  description,
  formId,
  isLoading = false,
  isEditMode = false,
  children,
}: DynamicFormDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-3xl overflow-hidden border-none bg-white p-0 shadow-2xl rounded-[32px]"
      >
        <DialogHeader className="m-0 flex flex-row items-center justify-between space-y-0 border-b border-slate-100 bg-white px-8 py-6">
          <div className="flex-1 space-y-1.5 pr-4 text-left">
            <DialogTitle className="text-xl font-black tracking-tight text-slate-800 normal-case">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="m-0 text-xs font-medium leading-relaxed text-slate-400">
                {description}
              </DialogDescription>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </DialogHeader>

        <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-8 py-6">
          {children}
        </div>

        <DialogFooter className="m-0 flex gap-3 border-t border-slate-100 bg-slate-50/80 px-8 py-5 backdrop-blur-sm sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="h-12 w-full rounded-2xl font-bold px-6 text-slate-500 transition-colors hover:bg-slate-200/50 sm:w-auto"
          >
            Batal
          </Button>

          <Button
            type="submit"
            form={formId}
            disabled={isLoading}
            className="h-12 w-full sm:w-fit rounded-2xl bg-green-600 px-10 text-white font-bold shadow-lg shadow-green-200 transition-all hover:bg-green-700 hover:shadow-green-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="tracking-wide">Memproses...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span className="tracking-wide">
                    {isEditMode ? "Simpan Perubahan" : "Konfirmasi & Simpan"}
                  </span>
                </>
              )}
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
