import { type FieldShape, getCoreZodType } from "@zenncore/components/form";
import type { Override } from "@zenncore/types/utilities";
import { cn } from "@zenncore/utils";
import { type ForwardedRef, forwardRef } from "react";
import { type ControllerRenderProps, useFormContext } from "react-hook-form";
import { type TextInput, View } from "react-native";
import { z } from "zod";
import { Checkbox } from "../checkbox";
import { DatePicker } from "../date-picker";
// import { FileUploader } from "../file-uploader";
import { Input } from "../input";
import { Label } from "../label";
import { OTPInput } from "../otp-input";
import { PhoneInput } from "../phone-input";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Slider } from "../slider";
import { Switch } from "../switch";
import { Text } from "../text";
import { Textarea } from "../textarea";
import type { FieldShapeConfig, InferredFieldConfig } from "./config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

// todo: add missing inputs

const splitCamelCase = (name: string) => name.split(/(?=[A-Z])/).join(" ");
const INLINE_INPUTS = ["switch", "checkbox"];

export type InferredFormControlProps<
  S extends FieldShape,
  T extends z.ZodType,
> = {
  name: string;
  getIsFormFieldHidden?: (fieldName: string, data: unknown) => boolean;
  className?: string;
} & InferredFieldConfig<S, T>;

const InferredFormControlTest = <S extends FieldShape, T extends z.ZodType>(
  {
    getIsFormFieldHidden,
    labelHidden,
    classList,
    ...props
  }: InferredFormControlProps<S, T>,
  ref: ForwardedRef<unknown>,
) => {
  const { watch } = useFormContext();
  const formData = watch();
  const isHiddenField = getIsFormFieldHidden?.(props.name, formData);

  if (isHiddenField) return null;

  return (
    <FormField
      name={props.name}
      disabled={props.disabled}
      render={({ field: { name, ...controlProps } }) => (
        <FormItem className={classList?.root}>
          <View
            className={cn(
              "flex-col gap-2",
              INLINE_INPUTS.includes(props.shape) && "flex-row items-center",
            )}
          >
            {!labelHidden && (
              <FormLabel className={classList?.label}>
                {props.label ?? splitCamelCase(props.name)}
              </FormLabel>
            )}
            <FormControl>
              <InferredFormField
                {...props}
                {...controlProps}
                nativeID={name}
                ref={(el) => {
                  if (typeof ref === "function") ref(el);
                  else if (ref) ref.current = el;

                  controlProps.ref?.(el);
                }}
                className={
                  typeof classList?.input === "string"
                    ? cn(props.className, classList?.input)
                    : props.className
                }
                {...(typeof classList?.input === "object" && {
                  classList: classList?.input,
                })}
              />
            </FormControl>
          </View>
          {props.description && (
            <FormDescription className={classList?.description}>
              {props.description}
            </FormDescription>
          )}
          <FormMessage className={classList?.message} />
        </FormItem>
      )}
    />
  );
};

export const InferredFormControl = forwardRef(InferredFormControlTest);

export type InferredFormFieldsProps = {
  constraint: z.ZodType;
  className?: string;
} & Omit<FieldShapeConfig, "constraint"> &
  ControllerRenderProps;

export const InferredFormField = forwardRef(
  (config: InferredFormFieldsProps, ref: ForwardedRef<TextInput | View>) => {
    const props = config as Override<
      InferredFormFieldsProps,
      FieldShapeConfig
    > &
      ControllerRenderProps;
    const isReadOnly = props.constraint instanceof z.ZodReadonly;
    const isDisabled = isReadOnly || props.disabled;

    switch (props.shape) {
      case "text":
        return (
          <Input
            ref={ref}
            {...props}
            onChange={() => {}}
            onChangeText={props.onChange}
          />
        );
      case "textarea":
        return <Textarea {...props} />;
      case "phone":
        return <PhoneInput ref={ref} {...props} />;
      case "switch":
        return <Switch {...props} />;
      case "checkbox":
        return <Checkbox {...props} />;
      case "slider": {
        const isRangeSlider = props.constraint.safeParse([1, 2]).success;
        const { min, max, value } = props;

        return (
          <>
            <Slider
              {...props}
              value={
                isRangeSlider
                  ? [value?.[0] ?? min, value?.[1] ?? max]
                  : [value ?? min]
              }
              onChange={() => {}}
              onValueChange={(values) => {
                props.onChange(isRangeSlider ? values : values[0]);
              }}
            />

            {isRangeSlider && (
              <View className={"mt-2 flex w-full justify-between text-2xs"}>
                <Text>{value?.[0] ?? min}</Text>
                <Text>{value?.[1] ?? max}</Text>
              </View>
            )}
          </>
        );
      }
      // case "file":
      //   return <FileUploader {...props} />;
      case "select": {
        const options = getCoreZodType(props.constraint).options;

        return (
          <Select {...props} onValueChange={props.onChange}>
            <SelectTrigger>
              <SelectValue
                className={"capitalize"}
                placeholder={props.placeholder}
              />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => {
                const formattedOption = props.optionLabels?.[option] ?? option;

                return (
                  <SelectItem key={option} value={option}>
                    {formattedOption}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );
      }
      case "radio-group": {
        const options = getCoreZodType(props.constraint).options;
        const { optionLabels, ...inputProps } = props;

        return (
          <RadioGroup {...inputProps} onValueChange={props.onChange}>
            {options.map((option) => {
              const formattedOption = props.optionLabels?.[option] ?? option;

              return (
                <View
                  key={option}
                  className={cn(
                    "cursor-pointer flex-row items-center gap-x-2",
                    props.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <RadioGroupItem
                    value={option}
                    id={option}
                    aria-labelledby={`label-for-${formattedOption}`}
                  />
                  <Label nativeID={option} className="cursor-[inherit]">
                    {formattedOption}
                  </Label>
                </View>
              );
            })}
          </RadioGroup>
        );
      }
      case "otp": {
        return <OTPInput {...props} />;
      }
      case "date": {
        const isDateRange = props.constraint.safeParse({
          start: new Date(),
          end: new Date(),
        }).success;

        return (
          <DatePicker {...props} type={isDateRange ? "date-range" : "date"} />
        );
      }
      default:
        return null;
    }
  },
);
