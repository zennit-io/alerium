"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { XIcon } from "@zennui/icons";
import type { ComponentProps } from "react";
import { popoverContentVariants } from "./_styles/popover";

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

export const Dialog = DialogPrimitive.Root;

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogPortal = DialogPrimitive.Portal;

export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[100] bg-accent-dimmed/40 backdrop-blur [transform:translateZ(-10rem)] data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...props}
  />
);

type DialogContentClassListKey = "content" | "overlay" | "close";
export type DialogContentProps = {
  classList?: ClassList<DialogContentClassListKey>;
} & ComponentProps<typeof DialogPrimitive.Content>;

export const DialogContent = ({
  className,
  children,
  classList,
  ...props
}: DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay className={classList?.overlay} />
    <DialogPrimitive.Content
      className={cn(
        popoverContentVariants(),
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-[500] grid w-full max-w-lg gap-4 divide-none bg-accent p-6 shadow-2xl duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
        classList?.content,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          "absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground-dimmed",
          classList?.close,
        )}
      >
        <XIcon className={"size-4"} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

export type DialogHeaderProps = ComponentProps<"div">;

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

export type DialogFooterProps = ComponentProps<"div">;

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);

export type DialogDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
