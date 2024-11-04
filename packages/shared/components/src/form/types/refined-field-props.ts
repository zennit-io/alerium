type OmittableKeys =
  | "name"
  // | "ref"
  | "value"
  | "defaultValue"
  | "children"
  | "onChange"
  | "onBlur"
  | "onValueChange";
export type RefinedFieldProps<T> = Omit<T, OmittableKeys>;
