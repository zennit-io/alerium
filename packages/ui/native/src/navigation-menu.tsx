import * as NavigationMenuPrimitive from "@rn-primitives/navigation-menu";
import { cn } from "@zenncore/utils";
import { ChevronDownIcon } from "@zennui/icons";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { Platform, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

export type NavigationMenuProps = ComponentProps<
  typeof NavigationMenuPrimitive.Root
>;

export const NavigationMenu = ({
  className,
  children,
  ...props
}: NavigationMenuProps) => (
  <NavigationMenuPrimitive.Root
    className={cn(
      "relative z-10 flex max-w-max flex-row items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
);

export type NavigationMenuListProps = ComponentProps<
  typeof NavigationMenuPrimitive.List
>;

export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    className={cn(
      "flex-1 flex-row items-center justify-center gap-1",
      className,
    )}
    {...props}
  />
);

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const navigationMenuTriggerStyle = cva(
  "h-12 w-max flex-row items-center justify-center rounded-md bg-background px-3 py-2 font-medium text-sm active:bg-accent disabled:opacity-50",
);

export type NavigationMenuTriggerProps = ComponentProps<
  typeof NavigationMenuPrimitive.Trigger
>;

export const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    value === itemValue
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 200 }),
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        navigationMenuTriggerStyle(),
        "gap-1.5",
        value === itemValue && "bg-accent",
        className,
      )}
      {...props}
    >
      {children as ReactNode}
      <Animated.View style={chevronStyle}>
        <ChevronDownIcon
          className={cn("relative size-3 text-foreground")}
          aria-hidden={true}
        />
      </Animated.View>
    </NavigationMenuPrimitive.Trigger>
  );
};

export type NavigationMenuContentProps = {
  portalHost?: string;
} & ComponentProps<typeof NavigationMenuPrimitive.Content>;

export const NavigationMenuContent = ({
  className,
  children,
  portalHost,
  ...props
}: NavigationMenuContentProps) => {
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        className={cn(
          "w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg",
          className,
        )}
        {...props}
      >
        <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
};

export const NavigationMenuLink = NavigationMenuPrimitive.Link;

export type NavigationMenuViewportProps = ComponentProps<
  typeof NavigationMenuPrimitive.Viewport
>;

export const NavigationMenuViewport = ({
  className,
  ...props
}: NavigationMenuViewportProps) => {
  return (
    <View className={cn("absolute top-full left-0 flex justify-center")}>
      <View
        className={cn(
          "relative mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
          className,
        )}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
};

export type NavigationMenuIndicatorProps = ComponentProps<
  typeof NavigationMenuPrimitive.Indicator
>;

export const NavigationMenuIndicator = ({
  className,
  ...props
}: NavigationMenuIndicatorProps) => {
  return (
    <NavigationMenuPrimitive.Indicator
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <View className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-foreground/5 shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
};
