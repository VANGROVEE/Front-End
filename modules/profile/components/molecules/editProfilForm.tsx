"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Camera, User, Check } from "lucide-react";
import { toast } from "sonner";

// UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Modules & Libs
import { PROFILE_FIELDS } from "@/modules/profile/const/profileField";
import {
  ProfileFormValues,
  profileSchema,
} from "@/modules/profile/components/schema/profile.schema";
import { UserProfile } from "@/modules/profile/components/api/profil";
import { UploadButton } from "@/common/utils/uploadthing";
import { cn } from "@/lib/utils";

interface EditProfileFormProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => Promise<any>;
  updating: boolean;
}

export const EditProfileForm = ({
  open,
  onClose,
  profile,
  onUpdate,
  updating,
}: EditProfileFormProps) => {
  const [previewUrl, setAvatarUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      nickname: "",
      phone_number: "",
      bio: "",
      address_home: "",
      avatar_url: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (profile && open) {
      reset({
        name: profile.name || "",
        nickname: profile.nickname || "",
        phone_number: profile.phone_number || "",
        bio: profile.bio || "",
        address_home: profile.address_home || "",
        avatar_url: profile.avatar_url || "",
      });
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile, open, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const result = await onUpdate(values);
      if (result) {
        onClose();
      }
    } catch (error) {
      toast.error("Gagal memperbarui profil");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => !updating && !isUploading && onClose()}
    >
      <DialogContent className="sm:max-w-lg rounded-[32px] border-none shadow-2xl p-0 overflow-hidden outline-none">
        {/* Header Section */}
        <DialogHeader className="px-8 pt-8 pb-6 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100">
          <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Pengaturan Profil
          </DialogTitle>
          <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Personalisasi Identitas Vangrove Anda
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-8 pb-8 pt-6 space-y-6"
        >
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative">
              <Avatar
                className={cn(
                  "w-28 h-28 border-4 border-white shadow-2xl rounded-[32px] transition-all duration-500",
                  isUploading && "opacity-50 scale-95",
                )}
              >
                <AvatarImage src={previewUrl} className="object-cover" />
                <AvatarFallback className="bg-emerald-50 text-emerald-600 rounded-[32px] font-black text-3xl">
                  {profile?.name?.charAt(0) || <User size={40} />}
                </AvatarFallback>
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-[32px]">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                  </div>
                )}
              </Avatar>

              <div className="absolute -bottom-2 -right-2">
                <UploadButton
                  endpoint="healthReportImage"
                  onUploadBegin={() => setIsUploading(true)}
                  onClientUploadComplete={(res) => {
                    const url = res?.[0].url;
                    setAvatarUrl(url);
                    setValue("avatar_url", url);
                    setIsUploading(false);
                    toast.success("Foto profil diperbarui");
                  }}
                  onUploadError={(error: Error) => {
                    setIsUploading(false);
                    toast.error(`Upload gagal: ${error.message}`);
                  }}
                  appearance={{
                    button:
                      "h-11 w-11 rounded-2xl bg-slate-900 hover:bg-emerald-600 transition-colors ut-uploading:bg-slate-400 shadow-xl border-2 border-white",
                    allowedContent: "hidden",
                  }}
                  content={{
                    button: isUploading ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <Camera size={18} className="text-white" />
                    ),
                  }}
                />
              </div>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Klik kamera untuk unggah foto baru
            </p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
            {PROFILE_FIELDS.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label
                  htmlFor={field.id}
                  className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1"
                >
                  {field.label}{" "}
                  {field.required && (
                    <span className="text-emerald-500">*</span>
                  )}
                </Label>
                <Input
                  {...register(field.id as keyof ProfileFormValues)}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500 transition-all h-11 text-sm font-bold placeholder:text-slate-300"
                  disabled={updating || isUploading}
                />
                {errors[field.id as keyof ProfileFormValues] && (
                  <p className="text-[9px] font-black text-red-500 ml-1 uppercase">
                    {errors[field.id as keyof ProfileFormValues]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Bio Singkat
            </Label>
            <Textarea
              {...register("bio")}
              placeholder="Ceritakan sedikit tentang aktivitas pertanian Anda..."
              className="rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white min-h-[100px] text-sm font-medium resize-none transition-all"
              disabled={updating || isUploading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 rounded-2xl font-black text-[10px] tracking-widest text-slate-400 hover:text-slate-600 h-12 uppercase"
              disabled={updating || isUploading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-[2] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] tracking-[0.2em] h-12 shadow-lg shadow-emerald-200 active:scale-95 transition-all"
              disabled={updating || isUploading}
            >
              {updating ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  MENYIMPAN
                </>
              ) : (
                <>
                  <Check size={16} className="mr-2" strokeWidth={4} />
                  SIMPAN PROFIL
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
