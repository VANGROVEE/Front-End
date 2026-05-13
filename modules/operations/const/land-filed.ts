export const getLandFormFields = [
  {
    id: "name",
    label: "Nama Lahan",
    type: "text",
    placeholder: "Contoh: Kebun Sawit Blok A",
    required: true,
  },

  {
    id: "total_area",
    label: "Luas Area (Hektar / m²)",
    type: "number",
    placeholder: "Contoh: 2.5",
    required: true,
  },
  {
    id: "address",
    label: "Alamat Lengkap Lokasi",
    type: "textarea",
    placeholder: "Masukkan alamat lengkap lahan (Desa, Kecamatan, dsb)...",
    required: true,
  },
  {
    id: "latitude",
    label: "Garis Lintang (Latitude)",
    type: "text",
    placeholder: "Contoh: -1.5833",
    required: false,
  },
  {
    id: "longitude",
    label: "Garis Bujur (Longitude)",
    type: "text",
    placeholder: "Contoh: 103.6167",
    required: false,
  },
  // {
  //   id: "land_certificate_url",
  //   label: "URL Dokumen Sertifikat",
  //   type: "text",
  //   placeholder: "https://... (Opsional)",
  //   required: false,
  // },
];
