import { z } from "zod";

export const aiQualityMetricsSchema = z.object({
  defects: z.number().min(0).max(100).optional(),
  uniformity: z.number().min(0).max(100).optional(),
  ripeness: z.number().min(0).max(100).optional(),
});

const commonHarvestFields = {
  total_yield_kg: z
    .number({ error: "Total hasil panen wajib diisi" })
    .nonnegative("Hasil panen tidak boleh bernilai negatif")

    .or(z.literal("").transform(() => 0)),

  quality_grade: z.string().nullable().optional().default("PENDING_AI"),

  image_proof_url: z
    .string()
    .url("Format URL bukti gambar tidak valid")
    .nullable()
    .optional(),

  price_sold_per_kg: z.number().int().nonnegative().nullable().optional(),

  ai_quality_metrics: aiQualityMetricsSchema.nullable().optional(),
};

export const createHarvestReportBodySchema = z
  .object({
    ...commonHarvestFields,
    cycle_id: z
      .string({ error: "ID Siklus wajib dilampirkan" })
      .uuid("Format ID Siklus tidak valid"),

    imageFile: z.any().optional(),
    image_preview: z.string().optional(),
    is_productive: z.boolean().optional(),
  })
  .strict();

export const updateHarvestReportBodySchema = createHarvestReportBodySchema
  .omit({ cycle_id: true })
  .partial()
  .strict();

export type CreateHarvestReportDto = z.infer<
  typeof createHarvestReportBodySchema
>;
export type UpdateHarvestReportDto = z.infer<
  typeof updateHarvestReportBodySchema
>;

export const createHarvestReportSchema = z.object({
  body: createHarvestReportBodySchema,
});

export const updateHarvestReportSchema = z.object({
  body: updateHarvestReportBodySchema,
});
