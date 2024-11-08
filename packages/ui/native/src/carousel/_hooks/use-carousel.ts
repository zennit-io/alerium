import { useControllableState } from "@zenncore/hooks";
import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dimensions, type LayoutChangeEvent } from "react-native";
import type Animated from "react-native-reanimated";
import {
  type ScrollHandlerProcessed,
  type SharedValue,
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export type Direction = "horizontal" | "vertical";
export type UseCarouselReturn = {
  activeItem: number;
  size: number;
  scrollPrevious: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  getCanScrollPrevious: () => boolean;
  getCanScrollNext: () => boolean;
  handleScroll: ScrollHandlerProcessed<Record<string, unknown>>;
  handleLayout: (event: LayoutChangeEvent) => void;
  handleItemLayout: (event: LayoutChangeEvent) => void;
  itemSize: number;
  ref: RefObject<Animated.ScrollView>;
  animation: {
    scrollOffset: SharedValue<number>;
  };
};

export type UseCarouselParams = {
  activeItem?: number;
  onActiveItemChange?: (active: number) => void;
  defaultActiveItem?: number;
  direction?: Direction;
  gap?: number;
};
export const useCarousel = ({
  activeItem: activeItemProp,
  onActiveItemChange,
  defaultActiveItem = 0,
  direction = "horizontal",
  gap = 4,
}: UseCarouselParams): UseCarouselReturn => {
  const [activeItem = 0, setActiveItem] = useControllableState({
    prop: activeItemProp,
    defaultProp: defaultActiveItem,
    onChange: (value) => {
      onActiveItemChange?.(value);
    },
  });
  const [size, setSize] = useState(Dimensions.get("screen").width);
  const [itemSize, setItemSize] = useState(0);
  const scrollOffset = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value =
        event.contentOffset[direction === "horizontal" ? "x" : "y"];
    },
    onMomentumEnd: () => {
      const input = scrollOffset.value / itemSize;

      // todo: fix carousel glitch when overflow
      // runOnJS(setActiveItem)(input > 0 ? Math.round(input) : 0);
    },
  });
  const ref = useRef<Animated.ScrollView>(null);

  const getCanScrollPrevious = () => activeItem > 0;

  const getCanScrollNext = () => {
    // return activeItem < itemsPerPage - 1; // doesn't work because it is not the item count
    return true;
  };

  const scrollPrevious = () => {
    setActiveItem((previousActiveItem = 0) => {
      const updatedActiveItem =
        previousActiveItem > 0 ? previousActiveItem - 1 : previousActiveItem;

      // ref.current?.scrollTo({
      //   [direction === "horizontal" ? "x" : "y"]: itemSize * activeItem,
      //   animated: true,
      // });

      return updatedActiveItem;
    });
  };

  const scrollNext = () => {
    setActiveItem((previousActiveItem = 0) => {
      const updatedActiveItem = previousActiveItem + 1;

      // ref.current?.scrollTo({
      //   [direction === "horizontal" ? "x" : "y"]: itemSize * activeItem,
      //   animated: true,
      // });

      return updatedActiveItem;
    });
  };

  const scrollTo = (index: number) => setActiveItem(index);

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const carouselSize =
      nativeEvent.layout[direction === "horizontal" ? "width" : "height"];
    console.log("carousel layout", carouselSize);

    setSize(carouselSize);
  };

  const handleItemLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const itemSize = nativeEvent.layout.width;
    setItemSize(itemSize);
  };

  useEffect(() => {
    ref.current?.scrollTo({
      [direction === "horizontal" ? "x" : "y"]:
        itemSize * activeItem + gap * activeItem,
      animated: true,
    });
  }, [size, activeItem]);

  return {
    ref,
    size,
    itemSize,
    activeItem,
    scrollPrevious,
    scrollNext,
    scrollTo,
    getCanScrollPrevious,
    getCanScrollNext,
    handleScroll,
    handleLayout,
    handleItemLayout,
    animation: {
      scrollOffset,
    },
  };
};