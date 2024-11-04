import type { ComponentPropsWithoutRef, ElementRef, ElementType } from "react";
import type { Pressable, Text, View, ViewStyle } from "react-native";

export type ComponentPropsWithAsChild<T extends ElementType<unknown>> =
  ComponentPropsWithoutRef<T> & { asChild?: boolean };

export type ViewRef = ElementRef<typeof View>;
export type PressableRef = ElementRef<typeof Pressable>;
export type TextRef = ElementRef<typeof Text>;

export type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;
export type SlottablePressableProps = ComponentPropsWithAsChild<
  typeof Pressable
>;
export type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;

export type Insets = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

/**
 * Certain props are only available on the native version of the component.
 * @docs For the mobile version, see the Radix documentation https://www.radix-ui.com/primitives
 */
export type PositionedContentProps = {
  forceMount?: true | undefined;
  style?: ViewStyle;
  alignOffset?: number;
  insets?: Insets;
  avoidCollisions?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
  sideOffset?: number;
  disablePositioningStyle?: boolean;
};

export type ForceMountable = {
  forceMount?: true | undefined;
};
