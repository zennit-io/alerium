"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@zennui/icons";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import { popoverContentVariants, popoverItemVariants } from "./_styles/popover";

export type SelectProps = ComponentProps<typeof Select>;
export const Select = SelectPrimitive.Root;

export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

// todo: make ClassList recursive

export type SelectClassList =
  | {
      trigger?: SelectTriggerClassListKey;
      content?: SelectContentClassListKey;
    }
  | "selectedValue";

type SelectTriggerClassListKey = "content" | "decorator";
export type SelectTriggerProps = {
  classList?: ClassList<SelectTriggerClassListKey>;
} & ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>;

const selectTriggerVariants = cva("flex items-center border-border", {
  variants: {
    variant: {
      default:
        "!bg-transparent h-9 w-full justify-between whitespace-nowrap rounded-md border border-border px-3 py-2 text-sm ring-offset-background placeholder:text-foreground-dimmed focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      underline: "relative gap-1 border-b pr-2",
    },
  },
});
export const SelectTrigger = ({
  children,
  className,
  classList,
  asChild,
  variant = "default",
  ...props
}: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={cn(!asChild && selectTriggerVariants({ variant }), className)}
    asChild={asChild}
    {...props}
  >
    {asChild ? (
      children
    ) : (
      <>
        <p
          className={cn(
            "max-w-[calc(100%-theme(spacing.4))] truncate",
            classList?.content,
          )}
        >
          {children}
        </p>
        <SelectPrimitive.Icon asChild>
          <div className={cn("size-4", classList?.decorator)}>
            <ChevronDownIcon className="size-full opacity-50" />
          </div>
        </SelectPrimitive.Icon>
      </>
    )}
  </SelectPrimitive.Trigger>
);

type SelectButtonClassListKey = "button" | "icon";

export type SelectScrollUpButtonProps = {
  classList?: ClassList<SelectButtonClassListKey>;
} & ComponentProps<typeof SelectPrimitive.ScrollUpButton>;

export const SelectScrollUpButton = ({
  className,
  classList,
  ...props
}: SelectScrollUpButtonProps) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(
      "flex cursor-default items-center justify-center border-accent-foreground/50 border-b py-1",
      className,
      classList?.button,
    )}
    {...props}
  >
    <ChevronUpIcon className={classList?.icon} />
  </SelectPrimitive.ScrollUpButton>
);

export type SelectScrollDownButtonProps = {
  classList?: ClassList<SelectButtonClassListKey>;
} & ComponentProps<typeof SelectPrimitive.ScrollDownButton>;

export const SelectScrollDownButton = ({
  className,
  classList,
  ...props
}: SelectScrollDownButtonProps) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      "!border-t flex cursor-default items-center justify-center border-accent-foreground/50 py-1",
      className,
      classList?.button,
    )}
    {...props}
  >
    <ChevronDownIcon className={classList?.icon} />
  </SelectPrimitive.ScrollDownButton>
);

type SelectContentClassListKey =
  | "content"
  | {
      upButton: SelectButtonClassListKey;
      downButton: SelectButtonClassListKey;
    };
export type SelectContentProps = {
  classList?: ClassList<SelectContentClassListKey>;
} & ComponentProps<typeof SelectPrimitive.Content>;

export const SelectContent = ({
  children,
  className,
  classList,
  position = "popper",
  ...props
}: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        popoverContentVariants(),
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-[100000] max-h-96 min-w-32 divide-y-0 overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
        position === "popper" &&
          "data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1",
        className,
        classList?.content,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton classList={classList?.upButton} />
      <SelectPrimitive.Viewport
        className={cn(
          "divide-y divide-accent-foreground/50",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton classList={classList?.downButton} />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>;

export const SelectLabel = ({ className, ...props }: SelectLabelProps) => (
  <SelectPrimitive.Label
    className={cn("px-2 py-1.5 font-semibold text-sm", className)}
    {...props}
  />
);

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item>;

export const SelectItem = ({
  className,
  children,
  ...props
}: SelectItemProps) => (
  <SelectPrimitive.Item
    {...props}
    className={cn(
      popoverItemVariants(),
      "w-full pr-8 text-sm outline-none focus:bg-background-dimmed focus:text-foreground-rich data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    onClick={(event) => {
      event.stopPropagation();
      props.onClick?.(event);
    }}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText
      className={"flex items-center gap-2 text-foreground"}
    >
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export type SelectSeparatorProps = ComponentProps<
  typeof SelectPrimitive.Separator
>;

export const SelectSeparator = ({
  className,
  ...props
}: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-accent", className)}
    {...props}
  />
);
