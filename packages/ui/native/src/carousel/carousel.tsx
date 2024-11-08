import { useIsFocused } from "@react-navigation/native";
import type { ClassList, UniqueIdentifier } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Pressable,
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
  useWindowDimensions,
} from "react-native";
import Animated, {
  type AnimatedStyle,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import type { ViewProps as SlottableViewProps } from "../slot";
import {
  type Direction,
  type UseCarouselReturn,
  useCarousel,
} from "./_hooks/use-carousel";

export type CarouselContextValue = {
  nativeId: UniqueIdentifier;
  instance: UseCarouselReturn;
  itemCount?: number;
  direction: Direction;
  gap: number;
  loop?: boolean;
};
const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarouselContext = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error(
      "Carousel Compound Components should be used withing Carousel",
    );
  }

  return context;
};

export type CarouselStyle = Partial<
  | { paddingHorizontal: number; paddingLeft: number; paddingRight: number }
  | {
      paddingTop: number;
      paddingBottom: number;
      paddingVertical: number;
    }
>;

export type CarouselProps = PropsWithChildren<
  {
    activeItem?: number;
    onActiveItemChange?: (activeItem: number) => void;
    defaultActiveItem?: number;
    itemsPerPage?: number;
    gap?: number;
    direction?: Direction;
  } & (
    | {
        loop: true;
        itemCount: number;
      }
    | {
        loop?: false;
        itemCount?: number;
      }
  )
>;
export const Carousel = ({
  direction = "horizontal",
  itemCount,
  gap = 4,
  activeItem,
  defaultActiveItem = 0,
  onActiveItemChange,
  loop,
  children,
}: CarouselProps) => {
  const nativeId = useId();
  const instance = useCarousel({
    direction,
    gap,
    activeItem,
    defaultActiveItem,
    onActiveItemChange,
  });

  return (
    <CarouselContext.Provider
      value={{
        instance,
        nativeId,
        itemCount,
        direction,
        gap,
        loop,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

type Alignment = "start" | "center" | "end";

type CarouselContentClassListKey = "root" | "content";

export type CarouselContentProps = SlottableViewProps & {
  align?: Alignment;
  classList?: ClassList<CarouselContentClassListKey>;
  style?: CarouselStyle;
};
export const CarouselContent = ({
  align,
  children,
  style,
  className,
  classList,
  ...props
}: CarouselContentProps) => {
  const { width, height } = useWindowDimensions();
  const {
    instance,
    direction,
    itemCount,
    gap,
    loop: loopProp,
  } = useCarouselContext();
  const [loop, setLoop] = useState(loopProp);
  const isFocused = useIsFocused();

  // biome-ignore lint/correctness/useExhaustiveDependencies: shouldn't run on activeItem because is the initial scrollAmount
  const scrollOffset = useMemo(() => {
    return instance.itemSize * instance.activeItem + gap * instance.activeItem;
  }, [instance.itemSize, gap]);

  const paddingAxis = direction === "horizontal" ? "Horizontal" : "Vertical";
  const padding =
    (Math.max(instance.size, direction === "horizontal" ? width : height) -
      instance.itemSize) /
    2;

  useEffect(() => {
    if (!loop || !isFocused) return;

    const interval = setInterval(() => {
      if (itemCount && instance.activeItem === itemCount - 1) {
        //  console.log("reset");
        instance.scrollTo(0);
        return;
      }
      instance.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [loop, instance.activeItem, itemCount, isFocused]);

  return (
    <Animated.ScrollView
      {...props}
      ref={instance.ref}
      horizontal={direction === "horizontal"}
      decelerationRate={"fast"}
      scrollEventThrottle={1}
      // snapToAlignment={align}
      contentOffset={{
        x: direction === "horizontal" ? scrollOffset : 0,
        y: direction === "vertical" ? scrollOffset : 0,
      }}
      snapToInterval={instance.itemSize + gap}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollToOverflowEnabled={true} // enables programmatic scroll on IOS
      onScroll={instance.handleScroll}
      onTouchMove={(event) => {
        props.onTouchMove?.(event);
        if (loop) setLoop(false);
      }}
      className={classList?.root}
      contentContainerClassName={cn(
        "items-center justify-center",
        className,
        classList?.content,
      )}
      contentContainerStyle={[
        {
          ...(align === "center"
            ? {
                [`padding${paddingAxis}`]: padding,
              }
            : {}),
          gap,
        },
        style,
      ]}
      onLayout={instance.handleLayout}
    >
      {children}
    </Animated.ScrollView>
  );
};

type CarouselIndicatorClassListKey = "root" | "item";
type CarouselIndicatorProps = {
  growthIndex?: number;
  classList?: ClassList<CarouselIndicatorClassListKey>;
} & ViewProps;

export const CarouselIndicator = ({
  growthIndex,
  className,
  classList,
  ...props
}: CarouselIndicatorProps) => {
  const { itemCount } = useCarouselContext();

  if (!itemCount) {
    throw new Error("Carousel item count is required");
  }

  return (
    <View
      className={cn(
        "w-full flex-row justify-center gap-2",
        className,
        classList?.root,
      )}
      {...props}
    >
      {Array.from({ length: itemCount ?? 0 }, (_, i) => i).map((index) => (
        <CarouselIndicatorItem
          key={index}
          index={index}
          growthIndex={growthIndex}
          className={classList?.item}
        />
      ))}
    </View>
  );
};

type CarouselIndicatorItemProps = {
  index: number;
  growthIndex?: number;
  className?: string;
};
export const CarouselIndicatorItem = ({
  index,
  growthIndex = 3,
  className,
}: CarouselIndicatorItemProps) => {
  const { instance } = useCarouselContext();
  const itemWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const input = instance.animation.scrollOffset.value / instance.itemSize;
    const inputRange = [index - 1, index, index + 1];

    return {
      width: interpolate(
        input,
        inputRange,
        [itemWidth.value, itemWidth.value * growthIndex, itemWidth.value],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(
        input,
        inputRange,
        [0.15, 1, 0.15],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Pressable onPress={() => instance.scrollTo(index)}>
      <Animated.View
        key={index}
        className={cn("rounded-full bg-emphasis", className)}
        style={animatedStyles}
      >
        <View
          className={cn("size-3", className, "opacity-0")}
          onLayout={({ nativeEvent }) => {
            if (itemWidth.value > 0) return;

            itemWidth.value = nativeEvent.layout.width;
          }}
        />
      </Animated.View>
    </Pressable>
  );
};
export type CarouselItemAnimateFn = (
  scrollOffset: number,
  index: number,
  itemSize: number,
) => StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
export type CarouselItemProps = SlottableViewProps & {
  index: number;
  animate?: CarouselItemAnimateFn;
};
export const CarouselItem = ({
  index,
  style,
  animate,
  ...props
}: CarouselItemProps) => {
  const { instance } = useCarouselContext();

  const animatedStyles = useAnimatedStyle(() => {
    return (animate?.(
      instance.animation.scrollOffset.value,
      index,
      instance.itemSize,
    ) ?? {}) as ViewStyle;
  });

  return (
    <Animated.View
      key={index}
      style={[style, animatedStyles]}
      onLayout={instance.handleItemLayout}
      {...props}
    />
  );
};

// export const animateScale = (
//   scrollOffset: SharedValue<number>,
//   index: number,
//   itemWidth: number,
// ) => {
//   return useAnimatedStyle(() => {
//     const input = scrollOffset.value / itemWidth;
//     const inputRange = [index - 1, index, index + 1];
//     const scaleX = interpolate(
//       input,
//       inputRange,
//       [0.95, 1, 0.95],
//       Extrapolation.CLAMP,
//     );
//     const scaleY = interpolate(
//       input,
//       inputRange,
//       [0.95, 1, 0.95],
//       Extrapolation.CLAMP,
//     );
//     return {
//       transform: [{ scaleX }, { scaleY }],
//     } as DefaultStyle;
//   });
// };
