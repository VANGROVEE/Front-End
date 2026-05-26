import { z } from "zod";

export const profileSchema = z.object({
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
  avatar_url: z.string().optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
