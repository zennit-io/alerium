import { cn } from "@zenncore/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as PopoverPrimitive from "./primitives/popover";
import { TextClassContext } from "./text";

export const Popover = PopoverPrimitive.Root;

export const PopoverTrigger = PopoverPrimitive.Trigger;

export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  {
    portalHost?: string;
  } & PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      side = "top",
      sideOffset = 4,
      portalHost,
      ...props
    },
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal hostName={portalHost}>
        <PopoverPrimitive.Overlay style={StyleSheet.absoluteFill}>
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
            <TextClassContext.Provider value="text-popover-foreground">
              <PopoverPrimitive.Content
                ref={ref}
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  "absolute z-50 w-72 rounded-md border border-border bg-popover p-4", //shadow-foreground/5 shadow-md
                  className,
                )}
                {...props}
              />
            </TextClassContext.Provider>
          </Animated.View>
        </PopoverPrimitive.Overlay>
      </PopoverPrimitive.Portal>
    );
  },
);
