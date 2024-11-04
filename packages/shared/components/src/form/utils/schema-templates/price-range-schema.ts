import { z } from "zod";

export const PriceRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
});
