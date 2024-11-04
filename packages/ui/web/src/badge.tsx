import { cn } from "@zenncore/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

export const badgeVariants = cva(
  "inline-flex h-6 items-center rounded-full border-0 px-2.5 py-0.5 text-white text-xs transition-colors duration-300 ",
  {
    variants: {
      color: {
        primary:
          "border-primary bg-primary-dimmed/40 hover:bg-primary-dimmed/80",
        secondary:
          "border-secondary bg-secondary-dimmed/40 hover:bg-secondary-dimmed/80",
        accent:
          "border-foreground bg-foreground-dimmed/40 hover:bg-foreground-dimmed/80",
        neutral:
          "border-neutral bg-neutral-dimmed/40 hover:bg-neutral-dimmed/80",
        error: "border-error bg-error-dimmed/40 hover:bg-error-dimmed/80",
        success:
          "border-success bg-success-dimmed/40 hover:bg-success-dimmed/80",
        warning:
          "border-warning bg-warning-dimmed/40 hover:bg-warning-dimmed/80",
        info: "border-info bg-info-dimmed/40 hover:bg-info-dimmed/80",
      },
      variant: {
        outline: "border",
        soft: "shadow-[inset_0px_0px_2px_1px_rgba(255,255,255,0.1)] shadow-white/40 backdrop-blur-lg",
        default: "border shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.4)]",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "default",
        className: "bg-primary-dimmed",
      },
      {
        color: "secondary",
        variant: "default",
        className: "bg-primary-secondary",
      },
      {
        color: "accent",
        variant: "default",
        className: "bg-primary-foreground",
      },
      {
        color: "info",
        variant: "default",
        className: "bg-primary-foreground",
      },
      {
        color: "success",
        variant: "default",
        className: "bg-success-foreground",
      },
      {
        color: "neutral",
        variant: "default",
        className: "bg-neutral-foreground",
      },
      {
        color: "error",
        variant: "default",
        className: "bg-error-foreground",
      },
      {
        color: "warning",
        variant: "default",
        className: "bg-warning-foreground",
      },

      {
        color: "primary",
        variant: "outline",
        className:
          "bg-primary-dimmed/20 text-primary-dimmed hover:bg-primary-dimmed/30",
      },
      {
        color: "secondary",
        variant: "outline",
        className:
          "bg-primary-secondary/20 text-primary-secondary hover:bg-primary-secondary/30",
      },
      {
        color: "accent",
        variant: "outline",
        className:
          "!text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30",
      },
      {
        color: "info",
        variant: "outline",
        className:
          "!text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30",
      },
      {
        color: "success",
        variant: "outline",
        className:
          "!text-success-foreground bg-success-foreground/20 hover:bg-success-foreground/30",
      },
      {
        color: "neutral",
        variant: "outline",
        className:
          "bg-neutral-foreground/20 text-neutral-foreground hover:bg-neutral-foreground/30",
      },
      {
        color: "error",
        variant: "outline",
        className:
          "bg-error-foreground/20 text-error-foreground hover:bg-error-foreground/30",
      },
      {
        color: "warning",
        variant: "outline",
        className:
          "bg-warning-foreground/20 text-warning-foreground hover:bg-warning-foreground/30",
      },
    ],
  },
);

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({
  variant = "default",
  color = "primary",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn(badgeVariants({ variant, color }), className)}
    />
  );
};
