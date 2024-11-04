import type { UseInferredFormWithHideField } from "@zenncore/components/form";
import { cn } from "@zenncore/utils";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Form,
  type FormConfig,
  InferredFormControl,
  type InferredFormControlProps,
  type InferredFormFields,
  type UseInferredFormParams,
  useInferredForm,
} from ".";
import { Button, type ButtonProps } from "../button";

export type InferredFormProps<T extends FormConfig> = {
  onSubmit: (
    data: InferredFormFields<T>,
    form: UseFormReturn<InferredFormFields<T>>,
  ) => void | Promise<void>;
  config: UseInferredFormParams<T>[0];
  defaultValues?: NonNullable<UseInferredFormParams<T>[1]>["defaultValues"];
  hideFormFields?: NonNullable<UseInferredFormParams<T>[1]>["hideFormFields"];
  props?: NonNullable<UseInferredFormParams<T>[1]>["props"];
  children?: ReactNode;
  className?: string;
};

export const InferredForm = <T extends FormConfig>({
  config,
  onSubmit,
  props = {},
  defaultValues,
  hideFormFields,
  children,
  className,
}: InferredFormProps<T>) => {
  const form = useInferredForm<T>(config, {
    defaultValues,
    hideFormFields,
    ...props,
  });

  const getIsFormFieldHidden = hideFormFields
    ? (form as UseInferredFormWithHideField<T>).getIsFormFieldHidden
    : undefined;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, form))}
        className={cn("flex flex-col gap-2.5", className)}
      >
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
        <div className={"flex w-full justify-end"}>{children}</div>
      </form>
    </Form>
  );
};

export const FormSubmitButton = ({
  variant = "default",
  color = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button {...props} variant={variant} color={color} type={"submit"}>
      {children}
    </Button>
  );
};
