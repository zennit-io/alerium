import { type Ref, useImperativeHandle, useRef } from "react";

type AugmentRefProps<T> = {
  ref: Ref<T>;
  methods?: Record<string, (...args: unknown[]) => unknown>;
  deps?: unknown[];
};

export const useAugmentedRef = <T>({
  ref,
  methods,
  deps = [],
}: AugmentRefProps<T>) => {
  const augmentedRef = useRef<T>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: it's fine
  useImperativeHandle(
    ref,
    () => {
      if (typeof augmentedRef === "function" || !augmentedRef?.current) {
        return {} as T;
      }
      return {
        ...augmentedRef.current,
        ...methods,
      };
    },
    deps,
  );
  return augmentedRef;
};
