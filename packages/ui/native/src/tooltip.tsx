import * as TooltipPrimitive from "@rn-primitives/tooltip";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";
import { Platform, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { TextClassContext } from "./text";

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>;

export const Tooltip = TooltipPrimitive.Root;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export type TooltipContentProps = ComponentProps<
  typeof TooltipPrimitive.Content
> & {
  portalHost?: string;
};
export const TooltipContent = ({
  className,
  sideOffset = 4,
  portalHost,
  ...props
}: TooltipContentProps) => (
  <TooltipPrimitive.Portal hostName={portalHost}>
    <TooltipPrimitive.Overlay>
      <Animated.View
        entering={Platform.select({ default: FadeIn })}
        exiting={Platform.select({ default: FadeOut })}
      >
        <TextClassContext.Provider value="text-base text-foreground">
          <TooltipPrimitive.Content
            sideOffset={sideOffset}
            className={cn(
              "z-50 overflow-hidden rounded border border-border bg-accent px-3 py-1.5 shadow shadow-emphasis/5",
              className,
            )}
            {...props}
          />
        </TextClassContext.Provider>
      </Animated.View>
    </TooltipPrimitive.Overlay>
  </TooltipPrimitive.Portal>
);
