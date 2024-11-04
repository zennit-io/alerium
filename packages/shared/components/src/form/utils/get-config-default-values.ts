import type { FormConfig, InferredFormFields } from "../types";

export const getConfigDefaultValues = <T extends FormConfig>(
  config: T,
): Partial<InferredFormFields<T>> => {
  const configDefaultValuesArray = Object.entries(config)
    .filter(([, { defaultValue }]) => defaultValue !== undefined)
    .map(([key, { defaultValue }]) => [key, defaultValue]);

  return Object.fromEntries(configDefaultValuesArray);
};
