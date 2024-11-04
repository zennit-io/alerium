"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { CheckIcon } from "@zennui/icons";
import type { ComponentProps } from "react";

export type CheckboxClassListKey = "root" | "indicator";
export type CheckboxProps = {
  classList?: ClassList<CheckboxClassListKey>;
} & ComponentProps<typeof CheckboxPrimitive.Root>;

export const Checkbox = ({ className, classList, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    className={cn(
      "peer size-4 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
      classList?.root,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current",
        classList?.indicator,
      )}
    >
      <CheckIcon className={"size-4"} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
