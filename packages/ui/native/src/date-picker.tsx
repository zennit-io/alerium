import { useControllableState } from "@zenncore/hooks";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { format } from "date-fns";
import { useState } from "react";
import {
  Calendar,
  type DateRange,
  type DateRangeCalendarProps,
  type SingleDateCalendarProps,
} from "./calendar";
import {
  Drawer,
  DrawerContent,
  type DrawerProps,
  DrawerTrigger,
} from "./drawer";
import { inputRootVariants } from "./input";
import { Text } from "./text";

type DatePickerClassListKey = "root" | "trigger" | "triggerContent";

export type DatePickerProps = {
  classList?: ClassList<DatePickerClassListKey>;
} & (
  | ({ type: "date" } & SingleDatePickerProps)
  | ({ type: "date-range" } & DateRangePickerProps)
) &
  Omit<DrawerProps, "children">;

export const DatePicker = (props: DatePickerProps) => {
  return props.type === "date-range" ? (
    <DateRangePicker {...props} />
  ) : (
    <SingleDatePicker {...props} />
  );
};

type SingleDatePickerProps = {
  format?: (date: Date) => string;
  classList?: ClassList<DatePickerClassListKey>;
} & SingleDateCalendarProps &
  Omit<DrawerProps, "children">;

const SingleDatePicker = ({
  defaultOpen,
  format: formatDate,
  className,
  classList,
  ...props
}: SingleDatePickerProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value ? new Date(props.value) : undefined,
    defaultProp: props.defaultValue ? new Date(props.defaultValue) : undefined,
    onChange: props.onChange,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(defaultOpen);

  const formattedSelectedDate = value
    ? (formatDate?.(value) ?? format(value, "dd/MM/yyyy"))
    : undefined;

  return (
    <Drawer
      open={isDrawerOpen}
      defaultOpen={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      snapAt={"40%"}
      {...props}
    >
      <DrawerTrigger
        className={cn(
          inputRootVariants({ disabled: props.disabled }),
          classList?.trigger,
        )}
        disabled={props.disabled}
      >
        <Text
          className={cn(
            !formattedSelectedDate && "text-foreground-dimmed/40",
            classList?.triggerContent,
          )}
        >
          {formattedSelectedDate ?? props.placeholder}
        </Text>
      </DrawerTrigger>
      <DrawerContent>
        <Calendar
          {...props}
          type={"date"}
          value={value}
          onChange={(value) => {
            setValue(value as Date);
            setIsDrawerOpen(false);
          }}
          className={cn("w-full", className, classList?.root)}
        />
      </DrawerContent>
    </Drawer>
  );
};

type DateRangePickerProps = {
  format?: (dateRange: DateRange) => string;
  classList?: ClassList<DatePickerClassListKey>;
} & DateRangeCalendarProps &
  Omit<DrawerProps, "children">;

const DateRangePicker = ({
  open,
  defaultOpen,
  format: formatDateRange,
  className,
  classList,
  ...props
}: DateRangePickerProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    // defaultProp: props.defaultValue,
    onChange: props.onChange,
  });

  const formattedSelectedDateRange = value
    ? (formatDateRange?.(value) ??
      `${value?.start ? format(value.start, "dd/MM/yyyy") : ""} ${value?.end || value?.start ? " - " : ""} ${value?.end ? format(value.end, "dd/MM/yyyy") : ""}`)
    : undefined;

  return (
    <Drawer open={open} defaultOpen={defaultOpen} snapAt={"40%"}>
      <DrawerTrigger
        className={cn(
          inputRootVariants({ disabled: props.disabled }),
          classList?.trigger,
        )}
        disabled={props.disabled}
      >
        <Text
          className={cn(
            !formattedSelectedDateRange && "text-foreground-dimmed/40",
            classList?.triggerContent,
          )}
        >
          {formattedSelectedDateRange ?? props.placeholder}
        </Text>
      </DrawerTrigger>
      <DrawerContent>
        <Calendar
          {...props}
          type={"date-range"}
          onChange={setValue}
          value={value}
          defaultValue={value}
          className={cn("w-full", className, classList?.root)}
        />
      </DrawerContent>
    </Drawer>
  );
};
