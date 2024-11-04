import type { Props } from "@zenncore/types/components";
import type { Tuple } from "@zenncore/types/utilities";
import { z } from "zod";
import type { RefinedFieldProps } from "./refined-field-props";

type ZodFile = z.ZodType<File, z.ZodTypeDef, File>;

const zodDateRangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});
type ZodDateRange = typeof zodDateRangeSchema;

const zodDateStringRangeSchema = z.object({
  start: z.string().date(),
  end: z.string().date(),
});
type ZodDateStringRange = typeof zodDateStringRangeSchema;

export type BaseFieldShapeConfigMap = {
  text: {
    constraint: z.ZodString | z.ZodNumber;
  };
  textarea: {
    constraint: z.ZodString;
  };
  phone: {
    constraint: z.ZodString;
  };
  select: {
    constraint: z.ZodEnum<Tuple<string>>;
    placeholder?: string;
    optionLabels?: Partial<Record<string, string>>;
  };
  "radio-group": {
    constraint: z.ZodEnum<Tuple<string>>;
    optionLabels?: Partial<Record<string, string>>;
  };
  switch: {
    constraint: z.ZodBoolean;
  };
  checkbox: {
    constraint: z.ZodBoolean;
  };
  slider: {
    constraint: z.ZodNumber | z.ZodTuple<[z.ZodNumber, z.ZodNumber]>;
    min: number;
    max: number;
  };
  file: {
    constraint: z.ZodArray<ZodFile>;
  };
  date:
    | {
        constraint: z.ZodDate;
        type?: "date";
      }
    | {
        constraint: z.ZodString;
        type?: "date";
      }
    | {
        constraint: ZodDateRange;
        type?: "date-range";
      }
    | {
        constraint: ZodDateStringRange;
        type?: "date-range";
      };
  otp: {
    constraint: z.ZodString;
  };
};

export type FieldShape = keyof BaseFieldShapeConfigMap;
export type FieldProps = Props;
export type FieldShapePropsMap = Record<FieldShape, FieldProps>;

export type FieldShapeConfigMap<M extends FieldShapePropsMap> = {
  [key in FieldShape]: {
    shape: key;
  } & RefinedFieldProps<M[key]> &
    BaseFieldShapeConfigMap[key];
};

export type FieldShapeConfig<T extends FieldShapePropsMap> =
  FieldShapeConfigMap<T>[keyof FieldShapeConfigMap<T>];

export type FormShapeConfig<T extends FieldShapePropsMap> = Record<
  string,
  FieldShapeConfig<T>
>;
