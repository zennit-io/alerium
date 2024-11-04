"use client";

import type { UseInferredFormWithHideField } from "@zenncore/components/form";
import { cn } from "@zenncore/utils";
import { type ReactNode, createContext, useContext, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { Button, type ButtonProps } from "../button";
import {
  type FormConfig,
  type InferredFormFields,
  type UseInferredFormParams,
  useInferredForm,
} from "./config";
import { Form } from "./form";
import {
  InferredFormControl,
  type InferredFormControlProps,
} from "./inferred-form-field";

const InferredFormContext =
  createContext<UseInferredFormWithHideField<FormConfig>>(null);

const useInferredFormContext = () => useContext(InferredFormContext);

export type InferredFormProps<T extends FormConfig> = {
  onSubmit?: (
    data: InferredFormFields<T>,
    form: UseFormReturn<InferredFormFields<T>>,
  ) => unknown | Promise<unknown>;
  config: UseInferredFormParams<T>[0];
  defaultValues?: NonNullable<UseInferredFormParams<T>[1]>["defaultValues"];
  hideFormFields?: NonNullable<UseInferredFormParams<T>[1]>["hideFormFields"];
  props?: NonNullable<UseInferredFormParams<T>[1]>["props"];
  children?: ReactNode;
  className?: string;
};

export const InferredForm = <T extends FormConfig>({
  config,
  // onSubmit,
  props = {},
  defaultValues,
  hideFormFields,
  children,
  onSubmit,
  className,
}: InferredFormProps<T>) => {
  const form = useInferredForm<T>(config, {
    defaultValues,
    hideFormFields,
    ...props,
  });

  const getIsFormFieldHidden = hideFormFields
    ? form.getIsFormFieldHidden
    : undefined;

  // biome-ignore lint/correctness/useExhaustiveDependencies: form doesn't trigger useEffect
  useEffect(() => {
    if (!form.formState.isSubmitting) return;

    form.handleSubmit((data) => onSubmit?.(data, form))();
  }, [form.formState.isSubmitting, form.handleSubmit]);

  return (
    <Form {...form}>
      <View className={cn("gap-2.5", className)}>
        {Object.entries(config).map(([key, field]) => {
          type InferredFieldProps = InferredFormControlProps<
            typeof field.shape,
            typeof field.constraint
          >;

          return (
            <InferredFormControl
              {...(field as InferredFieldProps)}
              getIsFormFieldHidden={
                getIsFormFieldHidden as InferredFieldProps["getIsFormFieldHidden"]
              }
              key={key}
              name={key}
            />
          );
        })}
        <InferredFormContext.Provider
          value={form as UseInferredFormWithHideField<FormConfig>}
        >
          {children}
        </InferredFormContext.Provider>
      </View>
    </Form>
  );
};

type FormSubmitButtonProps = ButtonProps;
//   onSubmit?: (data: InferredFormFields<T>) => void;
// };

export const FormSubmitButton = ({
  variant = "default",
  color = "primary",
  children,
  onPress,
  ...props
}: FormSubmitButtonProps) => {
  const form = useInferredFormContext();

  return (
    <Button
      {...props}
      variant={variant}
      color={color}
      onPress={(event) => {
        onPress?.(event);
        form.handleSubmit(() => {})();
      }}
    >
      {children}
    </Button>
  );
};
