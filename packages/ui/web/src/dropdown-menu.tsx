"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@zennui/icons";
import type { ComponentProps } from "react";
import { popoverContentVariants, popoverItemVariants } from "./_styles/popover";

export type DropdownMenuProps = ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;

export const DropdownMenu = DropdownMenuPrimitive.Root;

export type DropdownMenuTriggerProps = ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export type DropdownMenuGroupProps = ComponentProps<
  typeof DropdownMenuPrimitive.Group
>;

export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export type DropdownMenuPortalProps = ComponentProps<
  typeof DropdownMenuPrimitive.Portal
>;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export type DropdownMenuSubProps = ComponentProps<
  typeof DropdownMenuPrimitive.Sub
>;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export type DropdownMenuRadioGroupProps = ComponentProps<
  typeof DropdownMenuPrimitive.RadioGroup
>;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export type DropdownMenuSubTriggerProps = ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

// todo: add dropdown menu sub trigger classList

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
);

export type DropdownMenuSubContentProps = ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
>;

export const DropdownMenuSubContent = ({
  className,
  ...props
}: DropdownMenuSubContentProps) => (
  <DropdownMenuPrimitive.SubContent
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-accent p-1 text-accent-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...props}
  />
);
// TODO: add dropdown menu item classList

// todo: add dropdown menu content classLi
export type DropdownMenuContentProps = {
  sideOffset?: number;
} & ComponentProps<typeof DropdownMenuPrimitive.Content>;

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        popoverContentVariants(),
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export type DropdownMenuItem = {
  inset?: boolean;
} & ComponentProps<typeof DropdownMenuPrimitive.Item>;

export const DropdownMenuItem = ({
  className,
  inset,
  ...props
}: DropdownMenuItem) => (
  <DropdownMenuPrimitive.Item
    className={cn(popoverItemVariants(), inset && "pl-8", className)}
    {...props}
  />
);

type DropdownMenuCheckboxItemClassList = "content" | "icon";
export type DropdownMenuCheckboxItem = {
  classList?: ClassList<DropdownMenuCheckboxItemClassList>;
} & ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>;

const DropdownMenuCheckboxItem = ({
  children,
  checked,
  className,
  classList,
  ...props
}: DropdownMenuCheckboxItem) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(popoverItemVariants(), className, classList?.content)}
    checked={checked}
    {...props}
  >
    <span
      className={cn(
        "absolute left-2 flex size-3.5 items-center justify-center",
        classList?.icon,
      )}
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="size-full" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

type DropdownMenuRadioItemClassList = "content" | "icon";
export type DropdownMenuRadioItemProps = {
  classList?: ClassList<DropdownMenuRadioItemClassList>;
} & ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;

export const DropdownMenuRadioItem = ({
  children,
  className,
  classList,
  ...props
}: DropdownMenuRadioItemProps) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(popoverItemVariants(), className, classList?.content)}
    {...props}
  >
    <span
      className={cn(
        "absolute left-2 flex size-3.5 items-center justify-center",
        classList?.icon,
      )}
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon className="size-4 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

export type DropdownMenuLabel = {
  inset?: boolean;
} & ComponentProps<typeof DropdownMenuPrimitive.Label>;

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: DropdownMenuLabel) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-2 py-1.5 font-semibold text-sm",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

export type DropdownMenuSeparator = ComponentProps<
  typeof DropdownMenuPrimitive.Separator
>;

export const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparator) => (
  <DropdownMenuPrimitive.Separator
    className={cn("-mx-1 my-1 h-px bg-background-dimmed", className)}
    {...props}
  />
);

export type DropdownMenuShortcutProps = ComponentProps<"span">;

export const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
