import z from "zod";

export const landSchema = z.object({
  name: z.string().min(3, "Nama Minimal 3 Karakter!"),
  total_area: z.coerce.number().positive("Luas area harus lebih dari 0"),
  location: z
    .object({
      latitude: z.coerce.number().min(-90).max(90),
      longitude: z.coerce.number().min(-180).max(180),
      address: z.string().optional(),
    })
    .strict(),
});

export const updateLandDtoSchema = landSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal harus ada satu field yang diubah",
  });

export type CreateLandDto = z.infer<typeof landSchema>;
export type UpdateLandDto = z.infer<typeof updateLandDtoSchema>;
export type LandFormData = z.infer<typeof landSchema>;
