"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@zenncore/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

const labelVariants = cva(
  "font-body font-medium text-sm capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export type LabelProps = {
  asChild?: boolean;
} & ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

export const Label = ({ className, ref, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
);
