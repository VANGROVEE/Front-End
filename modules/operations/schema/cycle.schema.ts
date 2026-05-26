import { z } from "zod";

export const PlantingCycleSchema = z.object({
  land_id: z.string().uuid("ID Lahan harus berupa UUID yang valid"),
  commodity_name: z.string().min(1, "Nama komoditas wajib diisi"),
  variety: z.string().nullable().optional(),
  planting_method: z.string().nullable().optional(),
  start_date: z.coerce.date(),
  estimated_harvest: z.coerce.date().nullable().optional(),
  status: z
    .enum(["PLANTING", "HARVESTED", "COMPLETED", "FAILED"])
    .default("PLANTING"),
});

export const UpdatePlantingCycleSchema = PlantingCycleSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Minimal harus ada satu field yang diubah",
  },
);

export type CreatePlantingCycleDto = z.infer<typeof PlantingCycleSchema>;

export type UpdatePlantingCycleDto = z.infer<typeof UpdatePlantingCycleSchema>;
