"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps, Ref } from "react";

type SliderClassListKey = "root" | "track" | "range" | "thumb";
export type SliderProps = {
  classList?: ClassList<SliderClassListKey>;
  ref?: Ref<typeof SliderPrimitive.Root>;
} & ComponentProps<typeof SliderPrimitive.Root>;

export const Slider = ({ className, classList, ...props }: SliderProps) => (
  <SliderPrimitive.Root
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      props.disabled && "cursor-not-allowed opacity-50",
      className,
      classList?.root,
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-full bg-input",
        classList?.track,
      )}
    >
      <SliderPrimitive.Range
        className={cn("absolute h-full bg-primary", classList?.range)}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-5 rounded-full border-2 border-primary/80 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />

    {Array.isArray(props.value) && (
      <SliderPrimitive.Thumb className="block size-5 rounded-full border-2 border-primary/80 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    )}
  </SliderPrimitive.Root>
);
