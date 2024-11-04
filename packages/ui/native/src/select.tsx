import { cn } from "@zenncore/utils";
import { CheckIcon, ChevronDownIcon } from "@zennui/icons";
import { type VariantProps, cva } from "class-variance-authority";
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { ScrollView, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as SelectPrimitive from "./primitives/select";

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>;
export const Select = SelectPrimitive.Root;

export type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>;
export const SelectGroup = SelectPrimitive.Group;

export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>;
export const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  "flex-row items-center justify-between gap-2 rounded border-border px-1 text-foreground-dimmed text-lg [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "border bg-background px-3 py-2",
        underline: "border-b",
      },
      disabled: {
        true: "opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  },
);
export type SelectTriggerProps = ComponentProps<
  typeof SelectPrimitive.Trigger
> &
  VariantProps<typeof selectTriggerVariants>;
export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    { className, children, variant = "default", disabled = false, ...props },
    ref,
  ) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant, disabled }), className)}
      {...props}
    >
      {props.asChild ? (
        children
      ) : (
        <>
          {children}
          <ChevronDownIcon
            aria-hidden={true}
            className="text-foreground opacity-50"
          />
        </>
      )}
    </SelectPrimitive.Trigger>
  ),
);

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    portalHost?: string;
  }
>(({ className, children, portalHost, sideOffset = 4, ...props }, ref) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content
            ref={ref}
            className={cn(
              "relative z-50 max-h-96 w-fit overflow-hidden rounded-xl border border-border bg-accent shadow shadow-emphasis-dimmed/10",
              className,
            )}
            sideOffset={sideOffset}
            {...props}
          >
            <ScrollView className="flex-1">
              <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            </ScrollView>
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
});

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pr-2 pb-2 pl-10 font-semibold text-base text-foreground",
      className,
    )}
    {...props}
  />
));

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "flex-row items-center gap-4 border-b border-b-border py-2 pr-10 pl-4 active:bg-background-dimmed",
      props.disabled && "opacity-50",
      className,
    )}
    {...props}
  >
    {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
    <>{children}</>
    <SelectPrimitive.ItemIndicator className="absolute right-2">
      <CheckIcon strokeWidth={3} className="size-4 text-primary" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-background-dimmed", className)}
    {...props}
  />
));
