import * as ProgressPrimitive from "@rn-primitives/progress";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

type ProgressClassListKey = "root" | "indicator";
export type ProgressProps = {
  classList?: ClassList<ProgressClassListKey>;
} & ComponentProps<typeof ProgressPrimitive.Root>;

export const Progress = ({
  className,
  value,
  classList,
  ...props
}: ProgressProps) => {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-accent",
        className,
        classList?.root,
      )}
      {...props}
    >
      <Indicator value={value} className={classList?.indicator} />
    </ProgressPrimitive.Root>
  );
};

export type IndicatorProps = {
  value: number | undefined | null;
  className?: string;
};

export const Indicator = ({ value, className }: IndicatorProps) => {
  const progress = useDerivedValue(() => value ?? 0);

  const indicator = useAnimatedStyle(() => {
    return {
      width: withSpring(
        `${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
        { overshootClamping: true },
      ),
    };
  });

  return (
    <ProgressPrimitive.Indicator asChild>
      <Animated.View
        style={indicator}
        className={cn("h-full bg-primary", className)}
      />
    </ProgressPrimitive.Indicator>
  );
};
