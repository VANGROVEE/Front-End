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
    label: "Jumlah / Dosis (Opsional)",
    type: "number",
    placeholder: "Cth: 15",
    required: false,
  },
  {
    id: "unit",
    label: "Satuan (Opsional)",
    type: "text",
    placeholder: "Cth: Liter, Kg, Tangki, Karung...",
    required: false,
  },
  {
    id: "notes",
    label: "Catatan / Keterangan (Opsional)",
    type: "textarea",
    placeholder:
      "Masukkan detail aktivitas, nama merek pupuk/pestisida, atau kondisi sirkulasi udara lahan hari ini...",
    required: false,
  },
  // 🌟 FIELD BARU: Hanya akan muncul secara kondisional jika activity_type === "HARVESTING"
  // {
  //   id: "image_proof_url",
  //   label: "Bukti Gambar Panen (Timbangan/Nota)",
  //   type: "upload", // <--- Tipe kustom untuk pemicu kamera/galeri di frontend
  //   placeholder: "Ambil foto atau unggah dari galeri",
  //   required: false,
  // },
  // {
  //   id: "is_productive",
  //   label: "Tanaman Masih Produktif?",
  //   type: "switch",
  //   placeholder: "Tentukan apakah tanaman masih bisa berbuah/dipanen kembali",
  //   required: false,
  // },
];
