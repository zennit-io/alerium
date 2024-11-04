"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { XIcon } from "@zennui/icons";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

export type SheetProps = ComponentProps<typeof SheetPrimitive.Root>;

export const Sheet = SheetPrimitive.Root;

export type SheetTriggerProps = ComponentProps<typeof SheetPrimitive.Trigger>;

export const SheetTrigger = SheetPrimitive.Trigger;

export type SheetCloseProps = ComponentProps<typeof SheetPrimitive.Close>;

export const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

export type SheetOverlayProps = ComponentProps<typeof SheetPrimitive.Overlay>;

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => (
  <SheetPrimitive.Overlay
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...props}
  />
);

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
        bottom:
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right:
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

type SheetContentClassListKey = "content" | "overlay";
export type SheetContentProps = {
  classList?: ClassList<SheetContentClassListKey>;
} & ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants>;

export const SheetContent = ({
  side = "right",
  className,
  children,
  classList,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <XIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
);

export type SheetHeaderProps = ComponentProps<"div">;

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

export type SheetFooterProps = ComponentProps<"div">;

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

type SheetTitleProps = ComponentProps<typeof SheetPrimitive.Title>;
export const SheetTitle = ({ className, ...props }: SheetTitleProps) => (
  <SheetPrimitive.Title
    className={cn("font-semibold text-foreground text-lg", className)}
    {...props}
  />
);

export type SheetDescriptionProps = ComponentProps<
  typeof SheetPrimitive.Description
>;
export const SheetDescription = ({
  className,
  ...props
}: SheetDescriptionProps) => (
  <SheetPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
