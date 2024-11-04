import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { CheckIcon } from "@zennui/icons";
import type { ComponentProps } from "react";

export type CheckboxClassListKey = "root" | "indicator";
export type CheckboxProps = {
  classList?: ClassList<CheckboxClassListKey>;
} & ComponentProps<typeof CheckboxPrimitive.Root>;

export const Checkbox = ({ className, classList, ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "h-[20] w-[20] shrink-0 rounded border border-primary disabled:cursor-not-allowed disabled:opacity-50",
        props.checked && "bg-primary",
        className,
        classList?.root,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("h-full w-full items-center justify-center")}
      >
        <CheckIcon
          strokeWidth={3.5}
          className={cn("size-3 text-primary-foreground", classList?.indicator)}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
