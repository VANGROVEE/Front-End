import { FormField } from "@/common/types/form-field"; // Sesuaikan path ini dengan project kamu

export const cycleFormFields: FormField[] = [
  // {
  //   id: "land_id",
  //   label: "ID Lahan",
  //   type: "hidden", // Biasanya tidak perlu ditampilkan, diambil dari konteks halaman
  //   required: true,
  // },
  {
    id: "commodity_name",
    label: "Nama Komoditas",
    type: "text",
    placeholder: "Cth: Padi Sawah, Jagung Manis, Tomat...",
    required: true,
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
