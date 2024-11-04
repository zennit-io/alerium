import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { DAYS, MONTHS, type Month } from "@zenncore/utils/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@zennui/icons";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getYear,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import { Text } from "../text";

export type CalendarProps = {
  value?: Date;
  className?: string;
  startYear?: number;
  endYear?: number;
  selectedDates?: Date[];
  headerHidden?: boolean;
  classList?: ClassList<CalendarBodyClassListKey>;
  onDatePick?: (date: Date) => void;
};

export const Calendar = ({
  value,
  onDatePick,
  className,
  startYear = 1960,
  selectedDates,
  headerHidden,
  endYear = getYear(new Date()),
  classList,
}: CalendarProps) => {
  const [page, setPage] = useState(value ?? new Date());

  return (
    <View className={cn("flex min-w-80 flex-col gap-2", className)}>
      {!headerHidden && (
        <CalendarHeader
          date={page}
          startYear={startYear}
          endYear={endYear}
          onPageChange={setPage}
        />
      )}
      <CalendarBody
        classList={classList}
        date={value}
        pageDate={page}
        selectedDates={selectedDates}
        onDateChange={onDatePick}
      />
    </View>
  );
};

type CalendarBodyClassListKey =
  | "content"
  | {
      cell:
        | "startDate"
        | "endDate"
        | "default"
        | "active"
        | "activeMonday"
        | "activeSunday"
        | "edge"
        | "singleDate";
    };

export type CalendarBodyProps = {
  date?: Date;
  selectedDates?: Date[];
  pageDate: Date;
  onDateChange?: (date: Date) => void;
  className?: string;
  classList?: ClassList<CalendarBodyClassListKey>;
};
export const CalendarBody = ({
  pageDate,
  selectedDates = [new Date()],
  onDateChange,
  classList,
  className,
}: CalendarBodyProps) => {
  const firstDayOfMonth = startOfMonth(pageDate);
  const lastDayOfMonth = endOfMonth(pageDate);

  const firstWeeksMondayOfMonth = startOfWeek(firstDayOfMonth, {
    weekStartsOn: 1,
  });
  const lastWeeksSundayOfMonth = endOfWeek(lastDayOfMonth, {
    weekStartsOn: 1,
  });

  const pageDays = eachDayOfInterval({
    start: firstWeeksMondayOfMonth,
    end: lastWeeksSundayOfMonth,
  });

  return (
    <View className={cn(className, "flex flex-col gap-2")}>
      <View className={"flex-row"}>
        {DAYS.map((day) => (
          <Text
            key={day}
            className={
              "w-[calc(100%/7.001)] text-center text-accent-dimmed text-lg"
            }
          >
            {day.slice(0, 2)}
          </Text>
        ))}
      </View>
      <View className={"flex-row flex-wrap"}>
        {pageDays.map((pageDay) => {
          const startDate = selectedDates[0];
          const endDate = selectedDates[selectedDates.length - 1];

          const isSelectedDate = !!selectedDates.find((selectedDate) =>
            isSameDay(selectedDate, pageDay),
          );

          const isEdgeDate = !![startDate, endDate].find(
            (edgeDate) => edgeDate && isSameDay(edgeDate, pageDay),
          );
          const isDifferentMonth = !isSameMonth(pageDate, pageDay);
          const isStartDate = startDate && isSameDay(startDate, pageDay);
          const isEndDate = endDate && isSameDay(endDate, pageDay);

          const onlyStartDateSelected =
            isStartDate && selectedDates.length === 1;
          const areEdgesSameDate =
            startDate && endDate && isSameDay(startDate, endDate);

          const isSingleSelectedDate =
            onlyStartDateSelected || areEdgesSameDate;

          const isMondaySelectedDate = isSelectedDate && pageDay.getDay() === 0;
          const isSundaySelectedDate = isSelectedDate && pageDay.getDay() === 6;

          return (
            <Pressable
              key={pageDay.toString()}
              onPress={() => onDateChange?.(pageDay)}
              className={cn(
                "aspect-square h-8 w-full max-w-[calc(100%/7.001)] items-center justify-center rounded-lg bg-transparent transition-colors duration-300",
                classList?.cell?.default,
                isDifferentMonth && "text-foreground-dimmed/30",
                isSelectedDate &&
                  cn(
                    "bg-primary/10 text-primary-rich active:bg-primary/40 ",
                    classList?.cell?.active,
                  ),
                isSelectedDate && isDifferentMonth && "opacity-50",
                isMondaySelectedDate && classList?.cell?.activeMonday,
                isSundaySelectedDate && classList?.cell?.activeSunday,
                isEdgeDate && cn("bg-primary/40", classList?.cell?.edge),
                isStartDate && classList?.cell?.startDate,
                isEndDate && classList?.cell?.endDate,
                isSingleSelectedDate && classList?.cell?.singleDate,
              )}
            >
              <Text
                className={cn(
                  "text-xl tabular-nums transition-colors duration-300",
                  isDifferentMonth && "text-foreground-dimmed/30",
                  isSelectedDate &&
                    cn(
                      "text-primary-rich active:text-white",
                      // classList?.cell?.active,
                    ),
                  isEdgeDate && cn("text-white", classList?.cell?.edge),
                )}
              >
                {format(pageDay, "dd")}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export type CalendarHeaderProps = {
  date: Date;
  onPageChange: (page: Date) => void;
  showCalendarPageControls?: boolean;
  startMonth?: number;
  endMonth?: number;
  startYear: number;
  endYear: number;
  className?: string;
};
export const CalendarHeader = ({
  date,
  startYear,
  endYear,
  onPageChange,
  showCalendarPageControls = true,
  className,
  startMonth,
  endMonth,
}: CalendarHeaderProps) => {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const months = MONTHS.slice(startMonth, endMonth);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear,
  );
  const isPreviousYearUnavailable =
    subMonths(date, 1).getFullYear() < startYear;
  const isNextYearUnavailable = addMonths(date, 1).getFullYear() > endYear;

  return (
    <View className={cn("mb-2 flex-row items-end gap-2 px-2", className)}>
      <Select
        value={format(date, "MMMM").toUpperCase()}
        onValueChange={(month) => {
          const updatedMonthDate = new Date(date);
          updatedMonthDate.setMonth(MONTHS.indexOf(month as Month));

          onPageChange(updatedMonthDate);
        }}
      >
        <SelectTrigger variant={"underline"}>
          <Text className={"text-2xl"}>{format(date, "MMMM")}</Text>
        </SelectTrigger>
        <SelectContent
          insets={{
            bottom: 100,
          }}
        >
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              <Text className={"capitalize"}>{month.toLowerCase()}</Text>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={format(date, "yyyy")}
        onValueChange={(year) => {
          const updatedYearDate = new Date(date);
          updatedYearDate.setFullYear(Number(year));
          onPageChange(updatedYearDate);
        }}
      >
        <SelectTrigger variant={"underline"}>
          <Text className={"text-2xl"}>{format(date, "yyyy")}</Text>
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              <Text>{year}</Text>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCalendarPageControls && (
        <>
          <Button
            size={"icon"}
            variant={"soft"}
            color="primary"
            className={"ml-auto h-8 w-12 disabled:opacity-40"}
            disabled={isPreviousYearUnavailable}
            onPress={() => onPageChange(subMonths(date, 1))}
          >
            <ChevronLeftIcon className="text-foreground" />
          </Button>
          <Button
            size={"icon"}
            variant={"soft"}
            color="primary"
            className={"w-12 h-8disabled:opacity-40"}
            disabled={isNextYearUnavailable}
            onPress={() => onPageChange(addMonths(date, 1))}
          >
            <ChevronRightIcon className="text-foreground" />
          </Button>
        </>
      )}
    </View>
  );
};
