import { FormField } from "@/common/types/form-field"; // Sesuaikan path ini dengan project kamu
import { Commodity } from "../types/commodity";

export const getCycleFormFields = (
  commodities: Commodity[] = [],
): FormField[] => [
  {
    id: "commodity_id",
    label: "Nama Komoditas",
    type: "select",
    placeholder: "Pilih Komoditas",
    required: true,
    options: [
      { label: "pilih komoditi", value: "" },
      ...commodities.map((commodity) => ({
        label: commodity.name,
        value: commodity.id,
      })),
    ],
  },
  {
    id: "variety",
    label: "Varietas (Opsional)",
    type: "text",
    placeholder: "Cth: IR64, Bonanza F1, Servo F1...",
    required: false,
  },
  {
    id: "planting_method",
    label: "Metode Tanam (Opsional)",
    type: "text",
    placeholder: "Cth: Tanam Pindah, Tugal, Persemaian...",
    required: false,
  },
  {
    id: "start_date",
    label: "Tanggal Mulai Tanam",
    type: "date",
    placeholder: "Pilih tanggal mulai",
    required: true,
  },
  {
    id: "estimated_harvest",
    label: "Perkiraan Tanggal Panen (Opsional)",
    type: "date",
    placeholder: "Pilih tanggal perkiraan panen",
    required: false,
  },
  {
    id: "status",
    label: "Status Siklus",
    type: "select",
    placeholder: "Pilih Status",
    required: true,
    options: [
      { label: "Sedang Berjalan", value: "HARVESTED" },
      { label: "Selesai / Panen", value: "COMPLETED" },
      { label: "Gagal", value: "FAILED" },
    ],
  },
];
