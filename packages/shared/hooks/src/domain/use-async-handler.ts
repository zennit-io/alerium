import { useState } from "react";

type UseAsyncHandler<T extends unknown[]> = {
  isPending: boolean;
  execute: (...args: T) => Promise<unknown>;
};

export const useAsyncHandler = <T extends unknown[]>(
  fn: (...args: T) => Promise<unknown>,
): UseAsyncHandler<T> => {
  const [isPending, setIsPending] = useState(false);

  const handler = async (...args: T) => {
    setIsPending(true);
    const response = await fn(...args);
    setIsPending(false);

    return response;
  };

  return {
    isPending,
    execute: handler,
  };
};
