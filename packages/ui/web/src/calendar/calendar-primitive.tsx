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
import { Button } from "../button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";

export type CalendarProps = {
  value?: Date;
  className?: string;
  startYear?: number;
  endYear?: number;
  selectedDates: Date[];
  showHeader?: boolean;
  classList?: ClassList<CalendarBodyClassListKey>;
  onDatePick: (date: Date) => void;
};
export const Calendar = ({
  value,
  onDatePick,
  className,
  startYear = 1960,
  selectedDates,
  showHeader = true,
  endYear = getYear(new Date()),
  classList,
}: CalendarProps) => {
  const [page, setPage] = useState(value ?? new Date());

  return (
    <div className={cn("w-64", className)}>
      {showHeader && (
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
    </div>
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
  selectedDates = [],
  onDateChange,
  classList,
  className,
}: CalendarBodyProps) => {
  const firstDayOfMonth = startOfMonth(pageDate);
  const lastDayOfMonth = endOfMonth(pageDate);

  const firstWeeksMondayOfMonth = startOfWeek(firstDayOfMonth);
  const lastWeeksSundayOfMonth = endOfWeek(lastDayOfMonth);

  const pageDays = eachDayOfInterval({
    start: firstWeeksMondayOfMonth,
    end: lastWeeksSundayOfMonth,
  });

  return (
    <section className={className}>
      <div className={"flex gap-1"}>
        {DAYS.map((day) => (
          <div
            key={day}
            className={
              "flex aspect-square w-[calc((100%/7)-theme(spacing.1))] items-center justify-center text-accent-dimmed text-xs"
            }
          >
            {day.slice(0, 2)}
          </div>
        ))}
      </div>
      <div className={"flex flex-wrap"}>
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
            <button
              key={pageDay.toISOString()}
              type={"button"}
              onClick={() => onDateChange?.(pageDay)}
              className={cn(
                "m-0.5 h-8 w-[calc((100%/7)-theme(spacing.1))] rounded-lg bg-transparent text-xs transition-colors duration-300 hover:bg-foreground/10",
                classList?.cell?.default,
                isDifferentMonth && "text-foreground-dimmed/30",
                isSelectedDate &&
                  cn(
                    "bg-primary/10 text-primary-rich hover:bg-primary/40 hover:text-white",
                    classList?.cell?.active,
                  ),
                isSelectedDate && isDifferentMonth && "opacity-50",
                isMondaySelectedDate && classList?.cell?.activeMonday,
                isSundaySelectedDate && classList?.cell?.activeSunday,
                isEdgeDate &&
                  cn("bg-primary/40 text-white", classList?.cell?.edge),
                isStartDate && classList?.cell?.startDate,
                isEndDate && classList?.cell?.endDate,
                isSingleSelectedDate && classList?.cell?.singleDate,
              )}
            >
              {format(pageDay, "dd")}
            </button>
          );
        })}
      </div>
    </section>
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
  const months = MONTHS.slice(startMonth, endMonth);
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => i + startYear,
  );
  const isPreviousYearUnavailable =
    subMonths(date, 1).getFullYear() < startYear;
  const isNextYearUnavailable = addMonths(date, 1).getFullYear() > endYear;

  return (
    <div className={cn("mb-2 flex items-center gap-2", className)}>
      <Select
        value={format(date, "MMMM").toUpperCase()}
        onValueChange={(month: Month) => {
          const updatedMonthDate = new Date(date);
          updatedMonthDate.setMonth(MONTHS.indexOf(month));

          onPageChange(updatedMonthDate);
        }}
      >
        <SelectTrigger variant={"underline"}>
          {format(date, "MMMM")}
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month} className={"capitalize"}>
              {month.toLowerCase()}
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
        <SelectTrigger
          variant={"underline"}
          className={"flex items-center gap-1 border-border border-b pr-2"}
        >
          {format(date, "yyyy")}
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem
              key={year}
              value={year.toString()}
              className={"capitalize"}
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCalendarPageControls && (
        <>
          <Button
            size={"icon"}
            variant={"soft"}
            className={"ml-auto size-6 disabled:opacity-40"}
            disabled={isPreviousYearUnavailable}
            onClick={() => onPageChange(subMonths(date, 1))}
          >
            <ChevronLeftIcon className={"size-4"} />
          </Button>
          <Button
            size={"icon"}
            variant={"soft"}
            className={"size-6 disabled:opacity-40"}
            disabled={isNextYearUnavailable}
            onClick={() => onPageChange(addMonths(date, 1))}
          >
            <ChevronRightIcon className={"size-4"} />
          </Button>
        </>
      )}
    </div>
  );
};
