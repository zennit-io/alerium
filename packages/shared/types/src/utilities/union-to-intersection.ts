export type UnionToIntersection<U> = // biome-ignore lint/suspicious/noExplicitAny: this is a type utility
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;
