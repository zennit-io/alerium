import * as SwitchPrimitives from "@rn-primitives/switch";
import { useColorScheme } from "@zenncore/hooks/native";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

type SwitchClassListKey = "root" | "thumb";

export type SwitchProps = {
  classList?: ClassList<SwitchClassListKey>;
} & ComponentProps<typeof SwitchPrimitives.Root>;

const SWITCH_COLORS = {
  light: {
    primary: "rgb(228, 228, 231)",
    input: "rgb(228, 228, 231)",
  },
  dark: {
    primary: "rgb(39, 39, 42)",
    input: "rgb(39, 39, 42)",
  },
} as const;

export const Switch = ({ className, classList, ...props }: SwitchProps) => {
  const { colorScheme } = useColorScheme();
  const translateX = useDerivedValue(() => (props.checked ? 18 : 0));
  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 18],
        [SWITCH_COLORS[colorScheme].input, SWITCH_COLORS[colorScheme].primary],
      ),
    };
  });
  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(translateX.value, { duration: 200 }) },
    ],
  }));

  return (
    <Animated.View
      style={animatedRootStyle}
      className={cn(
        "h-8 w-[46px] rounded-full",
        props.disabled && "opacity-50",
      )}
    >
      <SwitchPrimitives.Root
        className={cn(
          "h-8 w-[46px] shrink-0 flex-row items-center rounded-full border-2 border-transparent",
          className,
          classList?.root,
        )}
        {...props}
      >
        <Animated.View style={animatedThumbStyle}>
          <SwitchPrimitives.Thumb
            className={cn(
              "size-7 rounded-full bg-background shadow-foreground/25 shadow-md ring-0",
              classList?.thumb,
            )}
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
};
