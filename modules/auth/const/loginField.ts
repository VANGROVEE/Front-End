import { FormField } from "@/common/types/form-field";

export const loginFormFields: FormField[] = [
  {
    id: "email",
    label: "Alamat Email",
    type: "email",
    placeholder: "Masukkan email terdaftar...",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    required: true,
  },
  {
    id: "remember",
    label: "Ingat Saya",
    type: "checkbox",
    required: false,
  },
];
