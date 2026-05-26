import { FormField } from "@/common/types/form-field";

export const registerFormFields: FormField[] = [
  {
    id: "name",
    label: "Nama Lengkap",
    type: "text",
    placeholder: "Masukkan nama lengkap Anda...",
    required: true,
  },
  {
    id: "email",
    label: "Alamat Email",
    type: "email",
    placeholder: "budi@contoh.com",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Minimal 8 karakter",
    required: true,
  },
  {
    id: "confirmPassword",
    label: "Konfirmasi Password",
    type: "password",
    placeholder: "Ulangi password Anda",
    required: true,
  },
];
