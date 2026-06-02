# 🌱 VANGROVE Frontend

Frontend aplikasi **VANGROVE (Visual Analytics & Navigation for Geographic Regional Output & Variety Evaluation)**.

VANGROVE merupakan platform pertanian cerdas yang dirancang untuk membantu pengguna dalam memantau kondisi tanaman, menganalisis data pertanian, mendeteksi penyakit tanaman menggunakan Artificial Intelligence (AI), serta memvisualisasikan data geografis melalui antarmuka web yang interaktif.

## ✨ Fitur Utama

* 🔐 Autentikasi dan Otorisasi Pengguna
* 👤 Manajemen Profil Pengguna
* 📊 Dashboard Interaktif
* 🌾 Monitoring Tanaman
* 📈 Laporan dan Analisis Data
* 🗺️ Visualisasi Web-GIS
* 🤖 Integrasi AI Disease Detection
* 📱 Tampilan Responsif untuk Berbagai Perangkat

## 🛠️ Teknologi yang Digunakan

* React
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* React Hook Form
* Zustand / Context API
* Leaflet (Integrasi GIS)

## 📂 Struktur Proyek

```text
src/
├── assets/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── modules/
├── routes/
├── hooks/
├── services/
├── utils/
├── layouts/
├── pages/
└── types/
```

## 🚀 Menjalankan Proyek

### Clone Repository

```bash
git clone https://github.com/your-username/vangrove-frontend.git
```

### Masuk ke Direktori Proyek

```bash
cd vangrove-frontend
```

### Instalasi Dependensi

```bash
npm install
```

### Konfigurasi Environment

Buat file `.env` pada root project:

```env
VITE_API_URL=http://localhost:8000/api
```

### Menjalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan pada alamat:

```text
http://localhost:5173
```

## 📦 Build untuk Produksi

Membuat build aplikasi untuk kebutuhan deployment:

```bash
npm run build
```

Melihat hasil build secara lokal:

```bash
npm run preview
```

## 🧹 Linting

Menjalankan pemeriksaan kualitas kode:

```bash
npm run lint
```

## 🔗 Integrasi Backend

Frontend terhubung dengan backend melalui konfigurasi API yang terdapat pada file environment:

```env
VITE_API_URL=<url-backend-anda>
```

Pastikan backend sudah berjalan sebelum menggunakan seluruh fitur aplikasi.

## 📱 Dukungan Perangkat

Antarmuka aplikasi telah dioptimalkan untuk berbagai ukuran layar:

* Desktop
* Tablet
* Mobile

## 👨‍💻 Tim Pengembang

Proyek ini dikembangkan oleh Tim Pengembang VANGROVE sebagai solusi digital untuk mendukung monitoring tanaman, deteksi penyakit berbasis AI, analisis data pertanian, dan visualisasi geografis secara terintegrasi.

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Silakan gunakan, modifikasi, dan distribusikan sesuai ketentuan lisensi yang berlaku.
