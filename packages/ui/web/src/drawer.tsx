"use client";

import type { ComponentProps } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";

export type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root>;

export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: DrawerProps) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

export type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitive.Trigger>;

export const DrawerTrigger = DrawerPrimitive.Trigger;

export type DrawerPortalProps = ComponentProps<typeof DrawerPrimitive.Portal>;

const DrawerPortal = DrawerPrimitive.Portal;

export type DrawerCloseProps = ComponentProps<typeof DrawerPrimitive.Close>;

export const DrawerClose = DrawerPrimitive.Close;

export type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Overlay>;

export const DrawerOverlay = ({ className, ...props }: DrawerOverlayProps) => (
  <DrawerPrimitive.Overlay
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
);

type DrawerContentClassListKey = "overlay" | "content";

export type DrawerContentProps = {
  classList?: ClassList<DrawerContentClassListKey>;
} & ComponentProps<typeof DrawerPrimitive.Content>;

export const DrawerContent = ({
  className,
  children,
  classList,
  ...props
}: DrawerContentProps) => (
  <DrawerPortal>
    <DrawerOverlay className={cn(classList?.overlay)} />
    <DrawerPrimitive.Content
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
        classList?.content,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-accent" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

export type DrawerHeaderProps = ComponentProps<"div">;

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);

export type DrawerFooterProps = ComponentProps<"div">;

export const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

export type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>;

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
  <DrawerPrimitive.Title
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);

export type DrawerDescriptionProps = ComponentProps<
  typeof DrawerPrimitive.Description
>;

export const DrawerDescription = ({
  className,
  ...props
}: DrawerDescriptionProps) => (
  <DrawerPrimitive.Description
    className={cn("text-foreground-dimmed text-sm", className)}
    {...props}
  />
);
