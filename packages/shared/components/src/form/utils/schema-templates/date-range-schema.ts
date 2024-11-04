import { z } from "zod";

export const DateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export type ZodDateRange = typeof DateRangeSchema;
