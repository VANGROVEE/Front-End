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
}

export const DeleteAlert = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  itemName = "data ini",
  title = "Konfirmasi Hapus",
  description,
}: DeleteAlertProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={18} />
            </div>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2 text-slate-500">
            {description ? (
              description
            ) : (
              <>
                Apakah Anda yakin ingin menghapus{" "}
                <span className="font-bold text-slate-900">{itemName}</span>? Tindakan ini tidak
                dapat dibatalkan dan semua data terkait akan dihapus secara permanen.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-3">
          <AlertDialogCancel
            disabled={isDeleting}
            className="h-11 rounded-xl border-slate-200 px-6 text-slate-600 hover:bg-slate-50"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="h-11 rounded-xl bg-red-600 px-8 text-white shadow-md shadow-red-100 transition-all hover:bg-red-700 active:scale-95"
          >
            {isDeleting ? (
              <div className="flex items-center">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Sedang Menghapus...
              </div>
            ) : (
              "Ya, Hapus Data"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
