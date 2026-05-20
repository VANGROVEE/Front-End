"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserProfile } from "@/lib/api/profil";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  nickname: z.string().optional(),
  phone_number: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .regex(/^[0-9+]+$/, "Hanya boleh angka dan +")
    .optional()
    .or(z.literal("")),
  bio: z.string().optional(),
  address_home: z.string().optional(),
  avatar_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  open: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => Promise<boolean>;
  updating: boolean;
}

export const EditProfileForm = ({
  open,
  onClose,
  profile,
  onUpdate,
  updating,
}: EditProfileFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        nickname: profile.nickname || "",
        phone_number: profile.phone_number || "",
        bio: profile.bio || "",
        address_home: profile.address_home || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    console.log("FORM SUBMIT DATA:", data);
    const success = await onUpdate(data);
    if (success) {
      onClose(); // ← pastikan ini ada
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-slate-800 font-black">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Nama */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">
              Nama Lengkap <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("name")}
              placeholder="Masukkan nama lengkap"
              className="rounded-xl"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Nickname */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">Nickname</Label>
            <Input
              {...register("nickname")}
              placeholder="Masukkan nickname"
              className="rounded-xl"
            />
          </div>

          {/* Email (readonly) */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">Email</Label>
            <Input
              value={profile?.email || ""}
              disabled
              className="rounded-xl bg-slate-50 text-slate-400 cursor-not-allowed"
            />
            <p className="text-[10px] text-slate-400">
              Email tidak dapat diubah
            </p>
          </div>

          {/* No HP */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">Nomor HP</Label>
            <Input
              {...register("phone_number")}
              placeholder="Contoh: 08123456789"
              className="rounded-xl"
            />
            {errors.phone_number && (
              <p className="text-xs text-red-500">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Alamat */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">
              Alamat Rumah
            </Label>
            <Input
              {...register("address_home")}
              placeholder="Masukkan alamat rumah"
              className="rounded-xl"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">Bio</Label>
            <Textarea
              {...register("bio")}
              placeholder="Ceritakan sedikit tentang diri kamu..."
              className="rounded-xl resize-none"
              rows={3}
            />
          </div>

          {/* Avatar URL */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-600">
              URL Avatar
            </Label>
            <Input
              {...register("avatar_url")}
              placeholder="https://example.com/avatar.jpg"
              className="rounded-xl"
            />
            {errors.avatar_url && (
              <p className="text-xs text-red-500">
                {errors.avatar_url.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
              disabled={updating}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
              disabled={updating}
            >
              {updating ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-1" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
