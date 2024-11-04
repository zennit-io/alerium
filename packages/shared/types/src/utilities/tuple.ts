// export type Tuple<T> = [T, ...T[]];

export type FixedTuple<
  T,
  N extends number,
  R extends unknown[] = [],
> = R["length"] extends N ? R : FixedTuple<T, N, [T, ...R]>;

export type Tuple<
  T,
  N extends number | undefined = undefined,
  R extends T[] = [],
> = N extends undefined
  ? [T, ...T[]]
  : R["length"] extends N
    ? R
    : Tuple<T, N, [T, ...R]>;
