import { z } from "zod";

export const weatherDataSchema = z.object({
  condition: z.string().optional(),
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  wind_speed: z.number().optional(),
});

export const createDailyActivityBodySchema = z
  .object({
    cycle_id: z.string().uuid("ID Siklus harus berupa UUID yang valid"),
    activity_date: z
      .string()
      .datetime()
      .transform((val) => new Date(val)),
    activity_type: z.string().min(1, "Tipe aktivitas wajib diisi"),
    amount: z.number().positive("Jumlah/Amount harus bernilai positif").optional(),
    unit: z.string().optional(),
    notes: z.string().optional(),
    weather_data: weatherDataSchema.optional(),
  })
  .strict();

export const createDailyActivitySchema = z.object({
  body: createDailyActivityBodySchema,
});

export const updateDailyActivityBodySchema = z
  .object({
    activity_date: z.coerce.date().optional(),
    activity_type: z.string().min(1).optional(),
    amount: z.number().positive().optional(),
    unit: z.string().optional(),
    notes: z.string().optional(),
    weather_data: weatherDataSchema.optional(),
  })
  .strict();

export const updateDailyActivityParamsSchema = z.object({
  id: z.string().uuid("ID Aktivitas harus berupa UUID"),
});

export const updateDailyActivitySchema = z.object({
  body: updateDailyActivityBodySchema,
  params: updateDailyActivityParamsSchema,
});

export type CreateActivityDto = z.infer<typeof createDailyActivityBodySchema>;
export type UpdateActivityDto = z.infer<typeof updateDailyActivityBodySchema>;
