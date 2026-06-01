import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
  remember: z.boolean().default(false).optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

export const googleLoginSchema = z.object({
  token: z.string(),
});

export type LoginValue = z.infer<typeof loginSchema>;
export type RegisterValue = z.infer<typeof registerSchema>;
export type LoginGoogleValue = z.infer<typeof googleLoginSchema>;
