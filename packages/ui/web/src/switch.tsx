"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import type { ClassList } from "@zenncore/types";
import type { Icon } from "@zenncore/types/components";
import { cn } from "@zenncore/utils";
import type { ComponentProps, Ref } from "react";

type SwitchClassListKey = "thumb" | "root" | "icon";
export type SwitchProps = {
  OnIcon?: Icon;
  OffIcon?: Icon;
  classList?: ClassList<SwitchClassListKey>;
  ref?: Ref<typeof SwitchPrimitives.Root>;
  value?: boolean;
  onChange?: (value: boolean) => void;
} & ComponentProps<typeof SwitchPrimitives.Root>;

export const Switch = ({
  className,
  classList,
  OnIcon,
  OffIcon,
  value,
  onChange,
  ...props
}: SwitchProps) => {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className,
        classList?.root,
      )}
      checked={value}
      onCheckedChange={onChange}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          classList?.thumb,
        )}
      >
        {OnIcon && (
          <OnIcon
            className={cn(
              "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-3 transition-opacity [.group[data-state=checked]_&]:opacity-0 [.group[data-state=unchecked]_&]:stroke-foreground [.group[data-state=unchecked]_&]:opacity-100",
              classList?.icon,
            )}
          />
        )}
        {OffIcon && (
          <OffIcon
            className={cn(
              "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-3 transition-opacity [.group[data-state=checked]_&]:stroke-foreground [.group[data-state=checked]_&]:opacity-100 [.group[data-state=unchecked]_&]:opacity-0",
              classList?.icon,
            )}
          />
        )}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  );
};
