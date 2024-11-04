type PartialExcept<T, K extends keyof T> = {
  [P in K]?: T[P];
} & Omit<T, K>;

export type ObjectWithPossibleOptionalKeys<T extends object> = {
  [K in keyof T]: PartialExcept<T, K>;
}[keyof T];
