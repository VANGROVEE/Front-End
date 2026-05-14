// file: src/app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Ini adalah router utama Anda
export const ourFileRouter = {
  // Definisi rute untuk laporan kesehatan tanaman
  healthReportImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Logika cek auth (opsional)
      // const user = await auth(req);
      // if (!user) throw new Error("Unauthorized");
      return { userId: "user_id_petani" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload selesai untuk user:", metadata.userId);
      console.log("File URL:", file.url);
    }),
} satisfies FileRouter;

// Tipe data ini yang di-import di Frontend
export type OurFileRouter = typeof ourFileRouter;
