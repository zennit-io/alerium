import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export type UseAsyncStorageReturn<T> = [
  T,
  (value: T) => Promise<void>,
  () => void,
];

export const useAsyncStorage = <T>(
  key: string,
  defaultValue: T,
): UseAsyncStorageReturn<T> => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) setValue(JSON.parse(value));
    })();
  }, [key]);

  const handleValueSet = useCallback(
    async (value: T) => {
      setValue(value);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  const handleValueDelete = useCallback(async () => {
    await AsyncStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return [value, handleValueSet, handleValueDelete] as const;
};
