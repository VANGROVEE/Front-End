// ── Navigation ────────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
  { key: "tanaman", label: "Tanaman", icon: "ti-plant-2", badge: 24 },
  { key: "lokasi", label: "Lokasi", icon: "ti-map-pin" },
  { key: "laporan", label: "Laporan", icon: "ti-chart-bar" },
];

// ── Plant Form ────────────────────────────────────────────────────────────────

export const PLANT_TYPES = [
  { key: "tomat", label: "tomat", icon: "ti-apple" },
  { key: "kentang", label: "Kentang", icon: "ti-salad" },
  { key: "jagung", label: "Jagung", icon: "ti-herb" },
];

export const LAHAN_OPTIONS = [
  "Tanah Subur",
  "Tanah Kering",
  "Tanah Basah / Rawa",
  "Tanah Berbukit",
  "Pekarangan Rumah",
];

export const INITIAL_FORM = {
  nama: "",
  jenis: "buah",
  alamat: "",
  latitude: "",
  longitude: "",
  kondisi: "",
  foto: null,
  fotoPreview: null,
};

// ── Map ───────────────────────────────────────────────────────────────────────

export const PINS = [
  { cx: 145, cy: 90, color: "#1D9E75", delay: "0s" },
  { cx: 230, cy: 88, color: "#1D9E75", delay: "0.6s" },
  { cx: 190, cy: 100, color: "#EF9F27", delay: "1s" },
  { cx: 270, cy: 97, color: "#378ADD", delay: "1.4s" },
  { cx: 108, cy: 95, color: "#1D9E75", delay: "1.8s" },
];

// ── Recent Entries ────────────────────────────────────────────────────────────

export const DEFAULT_ENTRIES = [
  { nama: "Mangga Gedong Gincu", lokasi: "Indramayu, Jabar", jenis: "buah" },
  { nama: "Kunyit Putih", lokasi: "Malang, Jatim", jenis: "herbal" },
  { nama: "Kangkung Darat", lokasi: "Bogor, Jabar", jenis: "sayuran" },
  { nama: "Durian Musang King", lokasi: "Pontianak, Kalbar", jenis: "buah" },
];

export const TAG_STYLE = {
  buah: "bg-[#e1f5ee] text-[#0f6e56]",
  herbal: "bg-[#faeeda] text-[#854f0b]",
  sayuran: "bg-[#e6f1fb] text-[#185fa5]",
};

export const DOT_STYLE = {
  buah: "bg-[#1d9e75]",
  herbal: "bg-[#ef9f27]",
  sayuran: "bg-[#378add]",
};

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const INITIAL_STATS = {
  totalTanaman: 24,
  lokasiTerdaftar: 8,
  jenisTanaman: 3,
  fotoTerupload: 12,
};
