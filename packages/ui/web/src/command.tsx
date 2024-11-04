"use client";

import { cn } from "@zenncore/utils";
import { SearchIcon } from "@zennui/icons";
import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { popoverContentVariants } from "./_styles/popover";
import { Dialog, DialogContent, type DialogProps } from "./dialog";

export type CommandProps = ComponentProps<typeof CommandPrimitive>;
export const Command = ({ className, ...props }: CommandProps) => (
  <CommandPrimitive
    className={cn(
      popoverContentVariants(),
      "flex h-full w-full flex-col overflow-hidden text-foreground",
      className,
    )}
    {...props}
  />
);

export type CommandDialogProps = DialogProps;
export const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-lg">
        <Command className="bg-accent/80 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-foreground-dimmed [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>;
export const CommandInput = ({ className, ...props }: CommandInputProps) => (
  <div
    className="!border-t-0 flex items-center border-accent-foreground/50 border-b px-3"
    cmdk-input-wrapper=""
  >
    <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-11 w-full rounded bg-transparent py-3 text-sm outline-none placeholder:text-foreground-dimmed/40 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
);
// first:[&_:first-child]:[&_[cmdk-group-heading]]:bg-red-500
export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>;
export const CommandList = ({ className, ...props }: CommandListProps) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
);
export type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>;
export const CommandEmpty = (props: CommandEmptyProps) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
);

export type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>;
export const CommandGroup = ({ className, ...props }: CommandGroupProps) => (
  <CommandPrimitive.Group
    className={cn(
      "!p-0 overflow-hidden text-foreground [&_[cmdk-group-heading]]:border-accent-foreground/50 [&_[cmdk-group-heading]]:border-y [&_[cmdk-group-heading]]:bg-accent/20 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-foreground-rich/40 [&_[cmdk-group-items]]:divide-y [&_[cmdk-group-items]]:divide-foreground-dimmed/20",
      className,
    )}
    {...props}
  />
);

export type CommandSeparatorProps = ComponentProps<
  typeof CommandPrimitive.Separator
>;
export const CommandSeparator = ({
  className,
  ...props
}: CommandSeparatorProps) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-accent-foreground", className)}
    {...props}
  />
);

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>;
export const CommandItem = ({ className, ...props }: CommandItemProps) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none transition-colors duration-300 aria-selected:bg-primary/50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
);

export type CommandShortcutProps = ComponentProps<"span">;
export const CommandShortcut = ({
  className,
  ...props
}: CommandShortcutProps) => {
  return (
    <kbd
      className={cn(
        "ml-auto rounded bg-accent/50 px-1.5 font-mono text-foreground-dimmed text-sm tracking-widest",
        className,
      )}
      {...props}
    />
  );
};
