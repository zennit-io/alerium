import type { FieldValues } from "@zennui/web/form";
import isEqual from "lodash.isequal";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormState, UseFormReturn } from "react-hook-form";
import { useDebounce } from "./use-debounced";

type UseAutoSaveReturn<F extends FieldValues> = {
  isSaving: boolean;
  handleSubmit: () => Promise<void>;
  latestRequest: Partial<F>;
  latestData: F;
};

// todo: update useAutoSave documentation

/**
 * A custom hook for automatically saving form data.
 *
 * @template S - A Zod schema type extending z.ZodObject<z.ZodRawShape>
 * @template F - A type extending UseFormReturn<z.infer<S>>
 *
 * @param {F} form - The form object returned by react-hook-form's useForm hook
 * @param {(data: z.infer<S>) => Promise<void>} onSubmit - Function to call with valid form data
 * @param {(error: unknown) => void} [onError] - Optional function to handle errors during submission
 * @param {() => void} [onSuccess] - Optional function to handle success of the form
 *
 * @returns {UseAutoSaveReturn<S>} An object
 * containing the current saving state and a function to manually trigger a save as well as the
 * latest request and data.
 *
 * @description
 * This hook automatically saves form data when values change, using a debounced mechanism to prevent
 * excessive save operations. It filters out invalid form fields before submission.
 *
 * @example
 * const form = useForm({
 *   resolver: zodResolver(schema),
 *   mode: "onChange",
 * });
 *
 * const handleSubmit = useCallback(async (data) => {
 *   await updateUser(data);
 * }, []);
 *
 * const handleError = useCallback((error) => {
 *   toast.error(error.message);
 * }, []);
 *
 * const { isSaving } = useAutoSave(form, handleSubmit, handleError);
 *
 * @pitfalls
 * 1. Ensure that onSubmit and onError functions are wrapped in useCallback to prevent unnecessary
 *    re-renders and effect triggers.
 */

export const useAutoSave = <
  F extends FieldValues,
  // S extends SubmitHandler<F> = SubmitHandler<F>,
  // S extends (data: F) => void | Promise<void>,
>(
  form: UseFormReturn<F>,
  onSubmit: (data: F) => void | Promise<void>,
  onError?: (error: unknown) => void,
  onSuccess?: () => void,
): UseAutoSaveReturn<F> => {
  // for test return U
  const [isSaving, setIsSaving] = useState(false);
  const values = useDebounce(form.watch(), 1000);

  // latestRequest reflects the shape of the data that the user has entered on his last change, used to compare to incoming changes
  const latestRequest = useRef<Partial<F>>(form.getValues());
  // latestData reflects fully the shape of the data that the provider (backend) has at a given time
  const latestData = useRef<F>(form.getValues());

  const handleSubmit = useCallback(async () => {
    const request = filterValidFormData(values, form.formState);

    setIsSaving(true);

    // todo: refactor if statement to be more readable (create a variable for the condition)
    if (
      !Object.keys(request).length ||
      isEqual(request, latestRequest.current)
    ) {
      setIsSaving(false);
      return;
    }

    try {
      latestRequest.current = { ...request };
      latestData.current = { ...latestData.current, ...request };

      await onSubmit(values);
    } catch (error) {
      onError?.(error);
      console.error(error);
    } finally {
      setIsSaving(false);
      onSuccess?.();
    }
  }, [values, form, onSubmit, onError, onSuccess]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return {
    isSaving,
    handleSubmit,
    latestRequest: latestRequest.current,
    latestData: latestData.current,
  };
};

const filterValidFormData = <T extends FieldValues>(
  data: T,
  formState: FormState<T>,
) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !formState.errors[key]),
  ) as Partial<T>;
};
