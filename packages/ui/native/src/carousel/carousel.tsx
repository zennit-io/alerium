import { useIsFocused } from "@react-navigation/native";
import type { ClassList, UniqueIdentifier } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useId,
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
                           itemsPerPage = 1,
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
    itemsPerPage,
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

const getAlignmentPadding = (
    alignment: Alignment,
    size: number,
    itemSize: number,
    screenSize: number,
) => {
  switch (alignment) {
    case "start":
      return 0;
    case "center":
      return (Math.max(size, screenSize) - itemSize) / 2;
    case "end":
      return size - itemSize;
    default:
      return 0;
  }
};

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
  const directionStyleKey =
      direction === "horizontal" ? "Horizontal" : "Vertical";
  const isFocused = useIsFocused();
  // const animatedRef = useAnimatedRef<Animated.ScrollView>();
  // const scrollX = useSharedValue(300);

  useEffect(() => {
    if (!loop || !isFocused) return;

    const interval = setInterval(() => {
      if (itemCount && instance.activeItem === itemCount - 1) {
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
                    [`padding${directionStyleKey}`]:
                    (Math.max(instance.size, width) - instance.itemSize) / 2,
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
  const isFirstRender = useRef(true);
  const itemWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    const input = instance.animation.scrollOffset.value / instance.itemSize;
    // console.log("input", instance.itemSize);
    const inputRange = [index - 1, index, index + 1];

    // console.log("width", itemWidth.value);
    // console.log(input, "index", index);

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
      <Pressable onPress={() => instance.scrollTo(2)}>
        <Animated.View
            key={index}
            className={cn("rounded-full bg-emphasis", className)}
            style={animatedStyles}
        >
          <View
              className={cn("size-3", className, "opacity-0")}
              onLayout={({ nativeEvent }) => {
                if (!isFirstRender.current) return;

                itemWidth.value = nativeEvent.layout.width;
                isFirstRender.current = false;
              }}
          />
        </Animated.View>
      </Pressable>
  );
};

export type CarouselItemProps = SlottableViewProps & {
  index: number;
  animate?: (
      scrollOffset: number,
      index: number,
      itemSize: number,
  ) => StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
};
export const CarouselItem = ({
                               index,
                               style,
                               animate,
                               ...props
                             }: CarouselItemProps) => {
  const { instance, direction } = useCarouselContext();

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
          style={[
            // {
            //   [direction === "horizontal" ? "width" : "height"]: instance.itemSize,
            // },
            style,
            animatedStyles,
          ]}
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