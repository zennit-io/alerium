import { z } from "zod";
import type { FormConfig, InferredSchema } from "../types";

export const generateSchema = <T extends FormConfig>(config: T) => {
  const schema = Object.fromEntries(
    Object.entries(config).map(([name, { constraint }]) => [name, constraint]),
  );
  return z.object(schema) as InferredSchema<T>;
};
