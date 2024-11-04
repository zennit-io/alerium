import { useAugmentedRef, useControllableState } from "@zenncore/hooks";
import {
  type LayoutPosition,
  useRelativePosition,
} from "@zenncore/hooks/native";
import {
  type ReactNode,
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
  Text,
  View,
} from "react-native";
import { Portal as RNPPortal } from "../portal";
import * as Slot from "../slot";
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from "../types";

export type Option = string | undefined;

export type SelectRootContext = {
  value: Option;
  onValueChange: (option: Option) => void;
  disabled?: boolean;
};

export type SelectRootProps = {
  value?: Option;
  defaultValue?: Option;
  onValueChange?: (option: Option) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
};

export type SelectValueProps = {
  placeholder: string;
};

export type SelectPortalProps = {
  children: ReactNode;
} & ForceMountable;

export type SelectOverlayProps = {
  closeOnPress?: boolean;
} & ForceMountable;

export type SelectContentProps = {};

export type SelectItemProps = {
  value: string;
  closeOnPress?: boolean;
};

export type SelectSeparatorProps = {
  decorative?: boolean;
};

export type SelectTriggerRef = {
  open: () => void;
  close: () => void;
} & PressableRef;

type RootContextType = {
  open: boolean;
  onIsOpenChange: (open: boolean) => void;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
} & SelectRootContext;

const RootContext = createContext<RootContextType | null>(null);

export const Root = forwardRef<ViewRef, SlottableViewProps & SelectRootProps>(
  (
    {
      asChild,
      value: valueProp,
      defaultValue,
      onValueChange: onValueChangeProp,
      onOpenChange,
      disabled,
      ...viewProps
    },
    ref,
  ) => {
    const nativeID = useId();
    const [value, onValueChange] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProp,
    });
    const [triggerPosition, setTriggerPosition] =
      useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
      null,
    );
    const [open, setOpen] = useState(false);

    const onIsOpenChange = (value: boolean) => {
      setOpen(value);
      onOpenChange?.(value);
    };

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          value,
          onValueChange,
          open,
          onIsOpenChange,
          disabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  },
);

export const useRootContext = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error(
      "Select compound components cannot be rendered outside the Select component",
    );
  }

  return context;
};

export const Trigger = forwardRef<SelectTriggerRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const {
      open,
      onIsOpenChange,
      disabled: disabledRoot,
      setTriggerPosition,
    } = useRootContext();

    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          onIsOpenChange(true);
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY: pageY, height });
            },
          );
        },
        close: () => {
          setTriggerPosition(null);
          onIsOpenChange(false);
        },
      },
    });

    const onPress = (event: GestureResponderEvent) => {
      if (disabled) return;

      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });

      onIsOpenChange(!open);
      onPressProp?.(event);
    };

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={augmentedRef}
        aria-disabled={disabled ?? undefined}
        role="combobox"
        onPress={onPress}
        disabled={disabled ?? disabledRoot}
        aria-expanded={open}
        {...props}
      />
    );
  },
);

export const Value = forwardRef<TextRef, SlottableTextProps & SelectValueProps>(
  ({ asChild, placeholder, ...props }, ref) => {
    const { value } = useRootContext();
    const Component = asChild ? Slot.Text : Text;

    return (
      <Component ref={ref} {...props}>
        {placeholder}
      </Component>
    );
  },
);

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset.
 */
export const Portal = ({ forceMount, children }: SelectPortalProps) => {
  const value = useRootContext();

  if (!value.triggerPosition) return null;
  if (!forceMount && !value.open) return null;

  return (
    <RNPPortal name={`${value.nativeID}_portal`}>
      <RootContext.Provider value={value}>{children}</RootContext.Provider>
    </RNPPortal>
  );
};

export const Overlay = forwardRef<
  PressableRef,
  SlottablePressableProps & SelectOverlayProps
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
    const { open, onIsOpenChange, setTriggerPosition, setContentLayout } =
      useRootContext();

    const onPress = (event: GestureResponderEvent) => {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onIsOpenChange(false);
      }

      OnPressProp?.(event);
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
  SlottableViewProps & PositionedContentProps & SelectContentProps
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
      position: _position,
      ...props
    },
    ref,
  ) => {
    const {
      open,
      onIsOpenChange,
      contentLayout,
      nativeID,
      triggerPosition,
      setContentLayout,
      setTriggerPosition,
    } = useRootContext();

    // biome-ignore lint/correctness/useExhaustiveDependencies: if including onOpenChange in dependency array, it will result in unexpected re-renders
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onIsOpenChange(false);
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
        role="list"
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

const ItemContext = createContext<string | null>(null);

export const Item = forwardRef<
  PressableRef,
  SlottablePressableProps & SelectItemProps
>(
  (
    {
      asChild,
      value: itemValue,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref,
  ) => {
    const {
      onIsOpenChange,
      value,
      onValueChange,
      setTriggerPosition,
      setContentLayout,
    } = useRootContext();

    const onPress = (event: GestureResponderEvent) => {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onIsOpenChange(false);
      }

      onValueChange(itemValue);
      onPressProp?.(event);
    };

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <ItemContext.Provider value={itemValue}>
        <Component
          ref={ref}
          role="option"
          onPress={onPress}
          disabled={disabled}
          aria-checked={value === itemValue}
          aria-valuetext={itemValue}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  },
);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error(
      "Item compound components cannot be rendered outside of an Item component",
    );
  }

  return context;
};

export const ItemIndicator = forwardRef<
  ViewRef,
  SlottableViewProps & ForceMountable
>(({ asChild, forceMount, ...props }, ref) => {
  const itemValue = useItemContext();
  const { value } = useRootContext();

  if (!forceMount && value !== itemValue) return null;

  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role="presentation" {...props} />;
});

export const Group = forwardRef<ViewRef, SlottableViewProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;
    return <Component ref={ref} role="group" {...props} />;
  },
);

export const Label = forwardRef<TextRef, SlottableTextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;
    return <Component ref={ref} {...props} />;
  },
);

export const Separator = forwardRef<
  ViewRef,
  SlottableViewProps & SelectSeparatorProps
>(({ asChild, decorative, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return (
    <Component
      role={decorative ? "presentation" : "separator"}
      ref={ref}
      {...props}
    />
  );
});

export const ScrollUpButton = ({
  children,
}: { children?: ReactNode; className?: string }) => {
  return children;
};

export const ScrollDownButton = ({
  children,
}: { children?: ReactNode; className?: string }) => {
  return children;
};

export const Viewport = ({
  children,
}: { children?: ReactNode; className?: string }) => {
  return children;
};

const onStartShouldSetResponder = () => true;
