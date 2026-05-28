"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import React from "react";

export interface DeleteAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  itemName?: string;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
}

export const DeleteAlert = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  itemName = "data ini",
  title = "Konfirmasi Hapus",
  description,
  confirmText = "Ya, Hapus Data",
}: DeleteAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl max-w-[440px] p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 text-slate-900 text-base font-bold">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100/50">
              <Trash2 size={18} />
            </div>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="pt-3 text-[13px] text-slate-500 leading-relaxed font-medium">
            {description ? (
              description
            ) : (
              <>
                Apakah Anda yakin ingin menghapus{" "}
                <span className="font-bold text-slate-900">{itemName}</span>?
                Tindakan ini tidak dapat dibatalkan dan semua data terkait akan
                dihapus secara permanen dari sistem.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-11 rounded-xl border-slate-200 text-xs font-bold uppercase text-slate-500 hover:bg-slate-50 px-5"
          >
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="h-11 rounded-xl bg-rose-600 px-6 text-xs font-bold uppercase text-white shadow-lg shadow-rose-100 transition-all hover:bg-rose-700 active:scale-95 disabled:opacity-70"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                <span>Menghapus...</span>
              </div>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
