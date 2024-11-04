"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root>;
export const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
);
