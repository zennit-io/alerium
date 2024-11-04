import { useAugmentedRef } from "@zenncore/hooks";
import {
  type LayoutPosition,
  useRelativePosition,
} from "@zenncore/hooks/native";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import {
  BackHandler,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
  Pressable,
  View,
} from "react-native";
import { Portal as RNPPortal } from "../../portal";
import * as Slot from "../../slot";
import type {
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from "../../types";
import type {
  PopoverOverlayProps,
  PopoverPortalProps,
  PopoverTriggerRef,
} from "./types";

type PopoverContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
};

const PopoverContext = createContext<PopoverContextType | null>(null);

export const Root = forwardRef<
  ViewRef,
  { onOpenChange?: (open: boolean) => void } & SlottableViewProps
>(({ asChild, onOpenChange: onOpenChangeProp, ...viewProps }, ref) => {
  const nativeID = useId();
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition | null>(
    null,
  );
  const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    onOpenChangeProp?.(value);
  };

  const Component = asChild ? Slot.View : View;

  return (
    <PopoverContext.Provider
      value={{
        open,
        onOpenChange,
        contentLayout,
        nativeID,
        setContentLayout,
        setTriggerPosition,
        triggerPosition,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </PopoverContext.Provider>
  );
});

export const usePopover = () => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error(
      "Popover compound components cannot be rendered outside the Popover component",
    );
  }
  return context;
};

export const Trigger = forwardRef<PopoverTriggerRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange, open, setTriggerPosition } = usePopover();

    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          onOpenChange(true);
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY: pageY, height });
            },
          );
        },
        close: () => {
          setTriggerPosition(null);
          onOpenChange(false);
        },
      },
    });

    const onPress = (event: GestureResponderEvent) => {
      if (disabled) return;

      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!open);
      onPressProp?.(event);
    };

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={augmentedRef}
        aria-disabled={disabled ?? undefined}
        role="button"
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  },
);

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
export const Portal = ({
  forceMount,
  hostName,
  children,
}: PopoverPortalProps) => {
  const value = usePopover();

  if (!value.triggerPosition || (!forceMount && !value.open)) return null;

  return (
    <RNPPortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <PopoverContext.Provider value={value}>
        {children}
      </PopoverContext.Provider>
    </RNPPortal>
  );
};

export const Overlay = forwardRef<
  PressableRef,
  SlottablePressableProps & PopoverOverlayProps
>(
  (
    {
      asChild,
      forceMount,
      onPress: OnPressProp,
      closeOnPress = true,
      ...props
    },
    ref,
  ) => {
    const { open, onOpenChange, setTriggerPosition, setContentLayout } =
      usePopover();

    const onPress = (event: GestureResponderEvent) => {
      OnPressProp?.(event);

      if (!closeOnPress) return;

      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
    };

    if (!forceMount && !open) return null;

    const Component = asChild ? Slot.Pressable : Pressable;

    return <Component ref={ref} onPress={onPress} {...props} />;
  },
);

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
export const Content = forwardRef<
  ViewRef,
  SlottableViewProps & PositionedContentProps
>(
  (
    {
      asChild = false,
      forceMount,
      align = "start",
      side = "bottom",
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      ...props
    },
    ref,
  ) => {
    const {
      open,
      onOpenChange,
      contentLayout,
      nativeID,
      setContentLayout,
      setTriggerPosition,
      triggerPosition,
    } = usePopover();

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onOpenChange(false);
          return true;
        },
      );

      return () => {
        setContentLayout(null);
        backHandler.remove();
      };
    }, []);

    const positionStyle = useRelativePosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      sideOffset,
      side,
      disablePositioningStyle,
    });

    const onLayout = (event: LayoutChangeEvent) => {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    };

    if (!forceMount && !open) return null;

    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        role="dialog"
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        onStartShouldSetResponder={onStartShouldSetResponder}
        {...props}
      />
    );
  },
);

export const Close = forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange, setContentLayout, setTriggerPosition } = usePopover();

    const onPress = (event: GestureResponderEvent) => {
      if (disabled) return;

      setTriggerPosition(null);
      setContentLayout(null);
      onOpenChange(false);
      onPressProp?.(event);
    };

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role="button"
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  },
);

export type { PopoverTriggerRef };

const onStartShouldSetResponder = () => true;
