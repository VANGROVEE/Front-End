import { z } from "zod";

const emptyToNull = z.preprocess(
  (val) => (val === "" ? null : val),
  z.any().nullable(),
);

export const weatherDataSchema = z.object({
  condition: z.string().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  wind_speed: z.number().optional(),
});

export const aiRawResultSchema = z.object({
  disease_name: z.string(),
  confidence_score: z.number(),
  is_dangerous: z.boolean(),
  insight: z.object({
    disease_description: z.string(),
    causes: z.string(),
    treatment: z.array(z.string()),
    prevention: z.array(z.string()),
    recovery: z.string(),
  }),
});

export const createDailyActivityBodySchema = z
  .object({
    cycle_id: z.string().uuid("ID Siklus tidak valid"),
    activity_date: z.coerce.date(),
    activity_type: z.string().min(1, "Tipe aktivitas wajib diisi"),

    amount: z.coerce
      .number()
      .positive("Jumlah harus bernilai positif")
      .nullable()
      .optional()
      .or(emptyToNull),

    unit: z.string().nullable().optional().or(emptyToNull),
    notes: z.string().nullable().optional(),
    weather_data: weatherDataSchema.nullable().optional(),

    total_yield_kg: z.coerce
      .number()
      .nonnegative("Total hasil panen tidak boleh negatif")
      .nullable()
      .optional()
      .or(emptyToNull),

    quality_grade: z.string().nullable().optional(),
    image_proof_url: z
      .string()
      .url("URL bukti panen tidak valid")
      .nullable()
      .optional()
      .or(emptyToNull),

    image_url: z
      .string()
      .url("URL gambar AI tidak valid")
      .nullable()
      .optional()
      .or(emptyToNull),
    image_key: z.string().nullable().optional(),

    ai_raw_result: aiRawResultSchema.nullable().optional(),

    is_productive: z.boolean().default(true).optional(),

    imageFile: z.any().nullable().optional(),
    image_preview: z.string().nullable().optional(),
  })
  .strict();

export const createDailyActivitySchema = z.object({
  body: createDailyActivityBodySchema,
});

export const updateDailyActivityBodySchema = createDailyActivityBodySchema
  .omit({ cycle_id: true })
  .partial()
  .strict();

export const updateDailyActivitySchema = z.object({
  body: updateDailyActivityBodySchema,
});

export type CreateDailyActivityDto = z.infer<
  typeof createDailyActivityBodySchema
>;
export type UpdateDailyActivityDto = z.infer<
  typeof updateDailyActivityBodySchema
>;
