import * as LabelPrimitive from "@rn-primitives/label";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export const Label = ({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: LabelProps) => (
  <LabelPrimitive.Root
    onPress={onPress}
    onLongPress={onLongPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
  >
    <LabelPrimitive.Text
      nativeID="label"
      maxFontSizeMultiplier={1.2}
      className={cn(
        "font-medium text-foreground text-sm leading-none",
        className,
      )}
      {...props}
    />
  </LabelPrimitive.Root>
);
