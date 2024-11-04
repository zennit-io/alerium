"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";

type ScrollAreaClassListKey =
  | "root"
  | "corner"
  | {
      scrollbar: "thumb" | "root";
    };

type ScrollAreaProps = {
  classList?: ClassList<ScrollAreaClassListKey>;
} & ComponentProps<typeof ScrollAreaPrimitive.Root>;

export const ScrollArea = ({
  className,
  classList,
  children,
  ...props
}: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    className={cn("relative overflow-hidden", className, classList?.root)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar classList={classList?.scrollbar} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

export type ScrollAreaScrollbarClassListKey = "root" | "thumb";
export type ScrollAreaScrollbarProps = {
  classList?: ClassList<ScrollAreaScrollbarClassListKey>;
} & ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

export const ScrollBar = ({
  className,
  classList,
  orientation = "vertical",
  ...props
}: ScrollAreaScrollbarProps) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
      classList?.root,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn("relative flex-1 rounded-full bg-border", classList?.thumb)}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);
