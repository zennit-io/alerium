import { type FieldShape, getCoreZodType } from "@zenncore/components/form";
import type { Override } from "@zenncore/types/utilities";
import { cn } from "@zenncore/utils";
import { type ControllerRenderProps, useFormContext } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../checkbox";
import { DatePicker } from "../date-picker";
import { FileUploader } from "../file-uploader";
import { Label } from "../label";
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
import { Textarea } from "../textarea";
import type { FieldShapeConfig, InferredFieldConfig } from "./config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextInput,
} from "./form";

const splitCamelCase = (name: string) => name.split(/(?=[A-Z])/).join(" ");
const INLINE_INPUTS = ["switch", "checkbox"];

export type InferredFormControlProps<
  S extends FieldShape,
  T extends z.ZodType,
> = {
  name: string;
  getIsFormFieldHidden?: (fieldName: string, data: unknown) => boolean;
  className?: string;
  disabled?: boolean;
} & InferredFieldConfig<S, T>;

export const InferredFormControl = <S extends FieldShape, T extends z.ZodType>({
  getIsFormFieldHidden,
  labelHidden,
  classList,
  ...props
}: InferredFormControlProps<S, T>) => {
  const { watch } = useFormContext();
  const formData = watch();
  const isHiddenField = getIsFormFieldHidden?.(props.name, formData);

  if (isHiddenField) return null;

  return (
    <FormField
      name={props.name}
      disabled={props.disabled}
      shouldUnregister={true}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              "flex flex-col gap-2",
              INLINE_INPUTS.includes(props.shape) && "flex-row items-center",
            )}
          >
            {!labelHidden && (
              <FormLabel className="capitalize">
                {props.label ?? splitCamelCase(props.name)}
              </FormLabel>
            )}
            <FormControl>
              <InferredFormField
                {...props}
                {...field}
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
          </div>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type InferredFormFieldsProps = {
  constraint: z.ZodType;
  className?: string;
} & Omit<FieldShapeConfig, "constraint"> &
  ControllerRenderProps;

export const InferredFormField = (config: InferredFormFieldsProps) => {
  const props = config as Override<InferredFormFieldsProps, FieldShapeConfig> &
    ControllerRenderProps;
  const isReadOnly = props.constraint instanceof z.ZodReadonly;
  const isDisabled = isReadOnly || props.disabled;

  switch (props.shape) {
    case "text":
      return <FormTextInput {...props} disabled={isDisabled} />;
    case "textarea":
      return <Textarea {...props} disabled={isDisabled} />;
    case "phone":
      return <PhoneInput {...props} disabled={isDisabled} />;
    case "switch":
      return <Switch {...props} disabled={isDisabled} />;
    case "checkbox":
      return <Checkbox {...props} disabled={isDisabled} />;
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
            disabled={isDisabled}
            onChange={() => {}}
            onValueChange={(values) => {
              props.onChange(isRangeSlider ? values : values[0]);
            }}
          />

          {isRangeSlider && (
            <div className={"mt-2 flex w-full justify-between text-2xs"}>
              <span>{value?.[0] ?? min}</span>
              <span>{value?.[1] ?? max}</span>
            </div>
          )}
        </>
      );
    }
    case "file":
      return <FileUploader {...props} disabled={isDisabled} />;
    case "select": {
      const options = getCoreZodType(props.constraint).options;

      return (
        <Select {...props} disabled={isDisabled} onValueChange={props.onChange}>
          <SelectTrigger>
            <SelectValue
              className={"capitalize"}
              placeholder={props.placeholder}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {props.optionLabels?.[option] ?? option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    case "radio-group": {
      const options = getCoreZodType(props.constraint).options;
      const { optionLabels, ...inputProps } = props;

      return (
        <RadioGroup
          {...inputProps}
          disabled={isDisabled}
          onValueChange={props.onChange}
        >
          {options.map((option) => (
            <div
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-x-2",
                props.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="cursor-[inherit]">
                {optionLabels?.[option] ?? option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }
    case "date": {
      const isDateDateRange = props.constraint.safeParse({
        start: new Date(),
        end: new Date(),
      }).success;
      const isDateStringRange = props.constraint.safeParse({
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      }).success;
      const isDateRange = isDateDateRange || isDateStringRange;

      return (
        <DatePicker
          {...props}
          type={isDateRange ? "date-range" : "date"}
          disabled={isDisabled}
        />
      );
    }
    default:
      return null;
  }
};
