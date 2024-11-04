import { useRef } from "react";

export const useDebouncedHandler = <T extends (...args: never[]) => void>(
  handler: T,
  duration = 2000,
): T => {
  const timeout = useRef<NodeJS.Timeout | undefined>();
  const debouncedHandler = (...params: Parameters<T>) => {
    const setupTimeout = () => {
      if (timeout) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        handler(...params);
      }, duration);
    };
    setupTimeout();
  };
  return debouncedHandler as T;
};
