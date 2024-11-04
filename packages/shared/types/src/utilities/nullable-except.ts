export type NullableExcept<
  T extends Record<string, unknown>,
  K extends keyof T,
> = {
  [key in K]: NonNullable<T[K]>;
} & Partial<T>;
