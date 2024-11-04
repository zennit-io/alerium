"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "@zenncore/utils";
import { format } from "date-fns";
import type {
  CalendarProps,
  DateRangeCalendarProps,
  SingleDateCalendarProps,
} from "./calendar";
import { Calendar } from "./calendar";
import { inputRootVariants } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type DatePickerProps = CalendarProps;
// todo: add disabled prop
export const DatePicker = (props: DatePickerProps) => {
  return (
    <Popover>
      {props.type === "date-range" ? (
        <DateRangePicker {...props} />
      ) : (
        <SingleDatePicker {...props} />
      )}
    </Popover>
  );
};

const SingleDatePicker = (props: SingleDateCalendarProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
  });

  const formattedSelectedDate = value ? format(value, "dd/MM/yyyy") : undefined;

  return (
    <>
      <PopoverTrigger
        className={cn(
          inputRootVariants({ disabled: props.disabled }),
          "w-fit min-w-64",
        )}
        disabled={props.disabled}
      >
        {formattedSelectedDate ?? (
          <span className="text-foreground-dimmed/40">{props.placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <Calendar {...props} type={"date"} onChange={setValue} value={value} />
      </PopoverContent>
    </>
  );
};

const DateRangePicker = (props: DateRangeCalendarProps) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
  });

  const formattedSelectedDateRange = `${value?.start ? format(value.start, "dd/MM/yyyy") : ""} ${value?.end || value?.start ? " - " : ""} ${value?.end ? format(value.end, "dd/MM/yyyy") : ""}`;

  return (
    <>
      <PopoverTrigger
        className={cn(
          inputRootVariants({ disabled: props.disabled }),
          "min-w-64",
        )}
        disabled={props.disabled}
      >
        {formattedSelectedDateRange ?? (
          <span className="text-foreground-dimmed/40">{props.placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          {...props}
          type={"date-range"}
          onChange={setValue}
          value={value}
          defaultValue={value}
        />
      </PopoverContent>
    </>
  );
};
