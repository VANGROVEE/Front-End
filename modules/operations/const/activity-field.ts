import { FormField } from "@/common/types/form-field";

export const activityFormFields: FormField[] = [
  {
    id: "activity_date",
    label: "Tanggal Aktivitas",
    type: "date",
    placeholder: "Pilih tanggal aktivitas",
    required: true,
  },
  {
    id: "activity_type",
    label: "Jenis Aktivitas",
    type: "select",
    placeholder: "Pilih Jenis Aktivitas",
    required: true,

    options: [
      { label: "Penanaman / Penyemaian", value: "PLANTING" },
      { label: "Penyiraman", value: "WATERING" },
      { label: "Pemupukan", value: "FERTILIZING" },
      { label: "Pengendalian Hama", value: "PEST_CONTROL" },
      { label: "Perawatan Lahan", value: "MAINTENANCE" },
      { label: "Observasi / Pengecekan", value: "OBSERVATION" },
      { label: "Panen", value: "HARVESTING" },
      { label: "Lainnya", value: "OTHER" },
    ],
  },
  {
    id: "amount",
    label: "Jumlah (Opsional)",
    type: "number",
    placeholder: "Cth: 50",
    required: false,
  },
  {
    id: "unit",
    label: "Satuan (Opsional)",
    type: "text",
    placeholder: "Cth: Kg, Liter, Tangki...",
    required: false,
  },
  {
    id: "notes",
    label: "Catatan / Keterangan (Opsional)",
    type: "textarea",
    placeholder: "Masukkan detail aktivitas atau pengamatan lahan hari ini...",
    required: false,
  },
];
