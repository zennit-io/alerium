import { cn } from "@zenncore/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { type ElementRef, forwardRef } from "react";
import { Pressable } from "react-native";
import {
  Pressable as SlottablePressable,
  type PressableProps as SlottablePressableProps,
} from "./slot";
import { TextClassContext } from "./text";

export const buttonVariants = cva(
  "group h-16 items-center justify-center gap-2 rounded-2xl px-3 py-2 transition-transform duration-200 active:scale-95",
  {
    variants: {
      variant: {
        default: "border",
        primary: "",
        soft: "",
        outline: "border",
        ghost: "",
      },
      color: {
        primary: "text-primary-foreground",
        secondary: "text-secondary-foreground",
        emphasis: "text-emphasis-foreground",
        accent: "text-accent-foreground",
        neutral: "text-neutral-foreground",
        error: "text-error-foreground",
        success: "text-success-foreground",
        warning: "text-warning-foreground",
        info: "text-info-foreground",
      },
      size: {
        icon: "flex size-8 items-center justify-center rounded-lg p-2",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        className: "border-primary-dimmed bg-primary",
      },
      {
        variant: "default",
        color: "secondary",
        className: "border-secondary-dimmed bg-secondary",
      },
      {
        variant: "default",
        color: "emphasis",
        className: "border-emphasis-dimmed bg-emphasis",
      },
      {
        variant: "default",
        color: "accent",
        className: "border-accent-dimmed bg-accent",
      },
      {
        variant: "default",
        color: "neutral",
        className: "border-neutral-dimmed bg-neutral",
      },
      {
        variant: "default",
        color: "error",
        className: "border-error-dimmed bg-error",
      },
      {
        variant: "default",
        color: "warning",
        className: "border-warning-dimmed bg-warning",
      },
      {
        variant: "default",
        color: "success",
        className: "border-success-rich bg-success",
      },
      {
        variant: "default",
        color: "info",
        className: "border-info-rich bg-info",
      },
      {
        variant: "primary",
        color: "primary",
        className: "bg-primary",
      },
      {
        variant: "primary",
        color: "secondary",
        className: "bg-secondary",
      },
      {
        variant: "primary",
        color: "emphasis",
        className: "bg-emphasis",
      },
      {
        variant: "primary",
        color: "accent",
        className: "bg-accent",
      },
      {
        variant: "primary",
        color: "error",
        className: "bg-error",
      },
      {
        variant: "primary",
        color: "neutral",
        className: "bg-neutral",
      },
      {
        variant: "primary",
        color: "warning",
        className: "bg-warning",
      },
      {
        variant: "primary",
        color: "success",
        className: "bg-success",
      },
      {
        variant: "primary",
        color: "info",
        className: "bg-info",
      },
      {
        variant: "soft",
        color: "primary",
        className: "bg-primary/20",
      },
      {
        variant: "soft",
        color: "secondary",
        className: "bg-secondary/20",
      },
      {
        variant: "soft",
        color: "emphasis",
        className: "bg-emphasis/20",
      },
      {
        variant: "soft",
        color: "accent",
        className: "bg-accent/20",
      },
      {
        variant: "soft",
        color: "error",
        className: "bg-error/20",
      },
      {
        variant: "soft",
        color: "neutral",
        className: "bg-neutral/20",
      },
      {
        variant: "soft",
        color: "warning",
        className: "bg-warning/20",
      },
      {
        variant: "soft",
        color: "success",
        className: "bg-success/20",
      },
      {
        variant: "soft",
        color: "info",
        className: "bg-info/20",
      },
      {
        variant: "outline",
        color: "primary",
        className: "border-primary-dimmed bg-primary/10",
      },
      {
        variant: "outline",
        color: "secondary",
        className: "border-secondary-dimmed bg-secondary/10",
      },
      {
        variant: "outline",
        color: "emphasis",
        className: "border-emphasis-dimmed bg-emphasis/10",
      },
      {
        variant: "outline",
        color: "accent",
        className: "border-accent-dimmed bg-accent/10",
      },
      {
        variant: "outline",
        color: "error",
        className: "border-error-dimmed bg-error/10",
      },
      {
        variant: "outline",
        color: "neutral",
        className: "border-neutral-dimmed bg-neutral/10",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-warning-dimmed bg-warning/10",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-success-dimmed bg-success/10",
      },
      {
        variant: "outline",
        color: "info",
        className: "border-info-dimmed bg-info/10",
      },
    ],
  },
);

export const buttonTextVariants = cva("text-2xl text-foreground", {
  variants: {
    variant: {
      default: "font-bold font-header text-background",
      primary: "font-bold font-header text-background",
      soft: "font-body",
      outline: "font-body",
      ghost: "font-body",
    },
    color: {
      primary: "text-white",
      secondary: "",
      emphasis: "",
      accent: "text-foreground",
      neutral: "",
      error: "",
      success: "",
      warning: "",
      info: "",
    },
  },
  compoundVariants: [
    {
      variant: "ghost",
      className: "underline",
    },
    {
      variant: "ghost",
      color: "primary",
      className: "text-primary",
    },
    {
      variant: "ghost",
      color: "secondary",
      className: "text-secondary",
    },
    {
      variant: "ghost",
      color: "emphasis",
      className: "text-emphasis",
    },
    {
      variant: "ghost",
      color: "accent",
      className: "text-accent",
    },
    {
      variant: "ghost",
      color: "neutral",
      className: "text-neutral",
    },
    {
      variant: "ghost",
      color: "error",
      className: "text-error",
    },
    {
      variant: "ghost",
      color: "success",
      className: "text-success",
    },
    {
      variant: "ghost",
      color: "warning",
      className: "text-warning",
    },
    {
      variant: "ghost",
      color: "info",
      className: "text-info",
    },
    {
      variant: ["outline", "soft"],
      color: "primary",
      className: "text-primary-rich hover:bg-primary-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "secondary",
      className: "text-secondary hover:bg-secondary-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "emphasis",
      className: "text-emphasis hover:bg-emphasis-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "accent",
      className: "text-accent hover:bg-accent-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "neutral",
      className: "text-neutral hover:bg-neutral-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "error",
      className: "text-error hover:bg-error-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "success",
      className: "text-success hover:bg-success-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "warning",
      className: "text-warning hover:bg-warning-rich/20",
    },
    {
      variant: ["outline", "soft"],
      color: "info",
      className: "text-info hover:bg-info-rich/20",
    },
  ],
});

export type ButtonProps = SlottablePressableProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<
  ElementRef<typeof SlottablePressable>,
  ButtonProps
>(
  (
    {
      className,
      variant = "default",
      size,
      color = "accent",
      asChild,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? SlottablePressable : Pressable;

    return (
      <TextClassContext.Provider
        value={cn(buttonTextVariants({ variant, color }))}
      >
        <Component
          className={cn(
            props.disabled && "opacity-50",
            buttonVariants({ variant, size, color }),
            className,
          )}
          ref={ref}
          role="button"
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);

Button.displayName = "Button";

// {typeof children === "string" ? (
//   <Text
//   // className={cn(buttonTextVariants({ variant, color }), className)}
//   >
//     {children}
//   </Text>
// ) : (
//   children
// )}
