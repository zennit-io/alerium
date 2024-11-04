import {
  type FieldShape,
  type FieldShapeConfig as FieldShapeConfigPrimitive,
  type FormShapeConfig as FormShapeConfigPrimitive,
  type InferredFieldConfig as InferredFieldConfigPrimitive,
  field as fieldPrimitive,
  useInferredForm,
} from "@zenncore/components/form";
import type { z } from "zod";
import type { CheckboxProps } from "../checkbox";
import type { DatePickerProps } from "../date-picker";
// import type { FileUploaderProps } from "../file-uploader";
import type { InputProps } from "../input";
import type { OTPInputProps } from "../otp-input";
import type { PhoneInputProps } from "../phone-input";
import type { RadioGroupProps } from "../radio-group";
import type { SelectProps } from "../select";
import type { SliderProps } from "../slider";
import type { SwitchProps } from "../switch";
import type { TextareaProps } from "../textarea";

type FieldPropsMap = {
  text: InputProps;
  textarea: TextareaProps;
  phone: PhoneInputProps;
  select: SelectProps;
  "radio-group": RadioGroupProps;
  switch: SwitchProps;
  checkbox: CheckboxProps;
  slider: SliderProps;
  file: FileUploaderProps;
  date: DatePickerProps;
  otp: OTPInputProps;
};

export type FormShapeConfig = FormShapeConfigPrimitive<FieldPropsMap>;
export type FieldShapeConfig = FieldShapeConfigPrimitive<FieldPropsMap>;

export type InferredFieldConfig<
  S extends FieldShape,
  T extends z.ZodType,
> = InferredFieldConfigPrimitive<FieldPropsMap, S, T>;

type FieldParams<S extends FieldShape, T extends z.ZodType> = Parameters<
  typeof fieldPrimitive<FieldPropsMap, S, T>
>;

export const field = <S extends FieldShape, T extends z.ZodType>(
  ...params: FieldParams<S, T>
) => {
  return fieldPrimitive<FieldPropsMap, S, T>(...params);
};

export type {
  FieldConfig,
  FieldShape,
  FieldValues,
  FormConfig,
  InferredFormFields,
  InferredSchema,
  UseInferredFormParams,
} from "@zenncore/components/form";
export { useInferredForm };
