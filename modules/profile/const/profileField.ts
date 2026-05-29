import { FormField } from "@/common/types/form-field";

export const PROFILE_FIELDS: FormField[] = [
  {
    id: "name",
    label: "Nama Lengkap",
    type: "text",
    placeholder: "Contoh: Budi Petani Modern",
    required: true,
  },
  {
    id: "nickname",
    label: "Nama Panggilan",
    type: "text",
    placeholder: "Contoh: Budi",
    required: false,
  },
  {
    id: "phone_number",
    label: "Nomor Telepon",
    type: "number",
    placeholder: "Contoh: 081234567890",
    required: false,
    pattern: "[0-9]*",
  },
  {
    id: "address_home",
    label: "Alamat Domisili",
    type: "text",
    placeholder: "Masukkan alamat lengkap rumah Anda",
    required: false,
  },
];
