import {useControllableState} from "@zenncore/hooks";
import type {ClassList, UniqueIdentifier} from "@zenncore/types";
import type {Tuple} from "@zenncore/types/utilities";
import {cn} from "@zenncore/utils";
import {useFocusEffect} from "expo-router";
import {
    createContext,
    type Dispatch,
    forwardRef,
    type PropsWithChildren,
    type Ref,
    type SetStateAction,
    useCallback,
    useContext,
    useId,
    useState,
} from "react";
import {type GestureResponderEvent, Pressable, useWindowDimensions, View,} from "react-native";
import {GestureDetector, type PanGesture} from "react-native-gesture-handler";
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
} from "react-native-reanimated";
import {Portal} from "../portal";
import {Pressable as PressableSlot, type ViewProps as SlottableViewProps,} from "../slot";
import type {ForceMountable, PressableRef, SlottablePressableProps,} from "../types";
import {normalizeSnapPoint, type SnapPoint, useDrawer, type UseDrawerReturn,} from "./_hooks/use-drawer";
import {useDrawerRootContext} from "./providers/drawer-root-provider"; // todo: add drawer classList,disabled

// todo: add drawer classList,disabled

const SNAP_POINTS: Tuple<SnapPoint> = ["20%", "100%"] as const;

export type DrawerContentProps = SlottableViewProps;

export const DrawerContent = ({
  children,
  className,
  ...props
}: DrawerContentProps) => {
  const { instance } = useRootContext();

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: instance.animation.translateY.value }],
    };
  });

  return (
    <DrawerPortal>
      <DrawerOverlay>
        <Animated.View
          {...props}
          onStartShouldSetResponder={() => true} // capture the touch event
          onResponderRelease={(event) => event.stopPropagation()}
          style={[props.style, style]}
          className={cn(
            "absolute inset-x-0 bottom-0 z-[1000] h-screen w-screen rounded-t-3xl bg-accent",
            className,
          )}
        >
          <DrawerHandle pan={instance.pan} />
          {children}
        </Animated.View>
      </DrawerOverlay>
    </DrawerPortal>
  );
};

type DrawerHandleClassListKey = "root" | "handle";
export type DrawerHandleProps = {
  className?: string;
  classList?: ClassList<DrawerHandleClassListKey>;
} & (
  | {
      disabled: true;
      pan?: never;
    }
  | {
      disabled?: false;
      pan: PanGesture;
    }
);

export const DrawerHandle = ({
  pan,
  disabled,
  className,
  classList,
}: DrawerHandleProps) => {
  return disabled ? (
    <View className={cn("py-6", className, classList?.root)}>
      <View
        className={cn(
          "mx-auto h-1.5 w-1/4 rounded-full bg-neutral",
          classList?.handle,
        )}
      />
    </View>
  ) : (
    <GestureDetector gesture={pan}>
      <View className={cn("py-6", className, classList?.root)}>
        <View
          className={cn(
            "mx-auto h-1.5 w-1/4 rounded-full bg-neutral",
            classList?.handle,
          )}
        />
      </View>
    </GestureDetector>
  );
};

type DrawerContextValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  nativeId: UniqueIdentifier;
  instance: UseDrawerReturn<typeof SNAP_POINTS>;
};
const DrawerContext = createContext<DrawerContextValue>(null);

const useRootContext = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("Drawer Compound Components should be used withing Drawer");
  }
  return context;
};

export type DrawerProps = PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDrawerMove?: (translateY: number) => void;
  snapAt?: SnapPoint;
  scaleBackground?: boolean;
}>;

export const Drawer = ({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onDrawerMove,
  children,
  snapAt,
  scaleBackground = true,
}: DrawerProps) => {
  const snapPoints = [
    snapAt ?? SNAP_POINTS[0],
    SNAP_POINTS[1],
  ] as Tuple<SnapPoint>;

  const instance = useDrawer({
    // 100% is closed, so 100% from the top of the screen, and 20% is pretty much open
    snapPoints,
    startAt: openProp || defaultOpen ? snapPoints[0] : snapPoints[1],
  });

  const scale = useDrawerRootContext();

  useAnimatedReaction(
    () => instance.animation.translateY.value,
    (currentValue) => {
      if (onDrawerMove) runOnJS(onDrawerMove)(currentValue);

      if (!scaleBackground) return;

      scale.value = interpolate(
        currentValue,
        instance.normalizedSnapPoints,
        [0.9, 1],
        Extrapolation.CLAMP,
      );
    },
  );

  const handleOpenChange = (open: boolean) => {
    const snapPoint = open
      ? instance.normalizedSnapPoints[0]
      : instance.normalizedSnapPoints[1];

    instance.snapTo(snapPoint);
    onOpenChange?.(open);
  };

  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: handleOpenChange,
  });

  const nativeId = useId();

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: should only run when navigating
    useCallback(() => {
      return () => {
        // navigate out
        instance.snapTo("100%", () => setOpen(false));
      };
    }, []),
  );

  return (
    <DrawerContext.Provider
      value={{
        nativeId,
        open,
        setOpen,
        instance,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export type DrawerTriggerProps = {
  ref?: Ref<PressableRef>;
} & SlottablePressableProps;

export const DrawerTrigger = forwardRef<PressableRef, DrawerTriggerProps>(
  ({ children, asChild, onPress, ...props }: DrawerTriggerProps, ref) => {
    const { setOpen } = useRootContext();

    const handleOpen = (event: GestureResponderEvent) => {
      setOpen(true);
      onPress?.(event);
    };

    const Component = asChild ? PressableSlot : Pressable;

    return (
      <Component onPress={handleOpen} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

type DialogPortalProps = PropsWithChildren<
  {
    hostName?: string;
  } & ForceMountable
>;

const DrawerPortal = ({
  forceMount,
  hostName,
  children,
}: DialogPortalProps) => {
  const context = useRootContext();

  const { height: screenHeight } = useWindowDimensions();
  const [isDrawerClosed, setIsDrawerClosed] = useState(!context.open);

  const handleDrawerMove = (value: number) => {
    const normalizedValue = normalizeSnapPoint(value, screenHeight);

    setIsDrawerClosed(normalizedValue === screenHeight);
    if (!isDrawerClosed && normalizedValue === screenHeight) {
      //fix: when open is set to true by default this condition is triggered and closes the drawer
      // context.setOpen(false);
    }
  };

  useAnimatedReaction(
    () => context.instance.animation.translateY.value,
    (value) => runOnJS(handleDrawerMove)(value),
  );

  if (!forceMount && !context.open && isDrawerClosed) return null;
  return (
    <Portal hostName={hostName} name={`${context.nativeId}_portal`}>
      <DrawerContext.Provider value={context}>
        {children}
      </DrawerContext.Provider>
    </Portal>
  );
};

type DrawerOverlayProps = SlottablePressableProps &
  ForceMountable & {
    closeOnPress?: boolean;
  };
const DrawerOverlay = ({
  asChild,
  forceMount,
  closeOnPress = true,
  onPress,
  className,
  ...props
}: DrawerOverlayProps) => {
  const { nativeId, instance, setOpen } = useRootContext();

  const handleDismiss = (event: GestureResponderEvent) => {
    instance.snapTo("100%", () => setOpen(false));
    onPress?.(event);
  };
  const style = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        instance.animation.translateY.value,
        instance.normalizedSnapPoints,
        [1, 0],
        Extrapolation.CLAMP,
      ),
    }),
    [instance.animation.translateY],
  );

  const Component = asChild ? PressableSlot : Pressable;

  return (
    <View
      className="absolute inset-0 h-screen w-screen"
      key={`${nativeId}_overlay`}
      nativeID={`${nativeId}_overlay`}
    >
      <Animated.View
        style={style}
        className={cn("absolute inset-0 size-full bg-black/60", className)}
      />
      <Component
        onPress={handleDismiss}
        {...props}
        className="absolute inset-0 size-full"
      />
    </View>
  );
};
