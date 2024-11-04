import * as RadioGroupPrimitive from "@rn-primitives/radio-group";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";
import { View } from "./slot";

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root className={cn("gap-2", className)} {...props} />
  );
};

type RadioGroupItemClassList = "root" | "indicator";
export type RadioGroupItemProps = {
  classList?: ClassList<RadioGroupItemClassList>;
} & ComponentProps<typeof RadioGroupPrimitive.Item>;

export const RadioGroupItem = ({
  className,
  classList,
  ...props
}: RadioGroupItemProps) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "aspect-square h-5 w-5 items-center justify-center rounded-full border border-primary text-primary",
        props.disabled && "opacity-50",
        className,
        classList?.root,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <View
          className={cn(
            "aspect-square h-[10] w-[10] rounded-full bg-primary",
            classList?.indicator,
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};
