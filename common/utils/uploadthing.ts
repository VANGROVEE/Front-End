import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers, // <-- Tambahkan import ini
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
