import * as SelectPrimitive from "@rn-primitives/slider";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";

type SliderClassListKey = "root" | "track" | "range" | "thumb";
export type SliderProps = {
  classList?: ClassList<SliderClassListKey>;
} & ComponentProps<typeof SelectPrimitive.Root>;

export const Slider = ({ className, classList, ...props }: SliderProps) => (
  <SelectPrimitive.Root
    {...props}
    className={cn("w-full", className, classList?.root)}
  >
    <SelectPrimitive.Track className={cn("h-8 w-full", classList?.track)}>
      <SelectPrimitive.Range
        style={{ width: `${props.value}%` }}
        className={cn("w-full rounded-full bg-yellow-500", classList?.range)}
      />
      <SelectPrimitive.Thumb
        className={cn("h-8 w-8 rounded-full bg-red-500", classList?.thumb)}
        style={{ left: `${props.value}%` }}
      />
    </SelectPrimitive.Track>
  </SelectPrimitive.Root>
);
