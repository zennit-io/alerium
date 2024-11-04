import { THEME_COLORS } from "@lookup/native/src/lib/constants";
import { useControllableState } from "@zenncore/hooks";
import { useColorScheme } from "@zenncore/hooks/native";
import { cn } from "@zenncore/utils";
import { Pressable, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import { Button } from "./button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselItemProps,
} from "./carousel";

import {
  DrawerHandle,
  type SnapPoint,
  useDrawer,
  type UseDrawerReturn,
} from "./drawer";
import { Portal } from "./portal";
import { Text } from "./text";
import type { PressableProps } from "./slot";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
} from "react";
import type { PropsWithClassName } from "@zenncore/types/components";
import type { Tuple } from "@zenncore/types/utilities";
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const animate = (scrollOffset: number, index: number, itemSize: number) => {
  "worklet";

  const input = scrollOffset / itemSize;
  const inputRange = [
    index - 3,
    index - 2,
    index - 1,
    index,
    index + 1,
    index + 2,
    index + 3,
  ];

  const rotateX = interpolate(
    input,
    inputRange,
    [-90, -60, -25, 0, 25, 60, 90],
    Extrapolation.CLAMP,
  );

  const opacity = interpolate(
    input,
    inputRange,
    [0.15, 0.45, 0.6, 1, 0.6, 0.45, 0.15],
    Extrapolation.CLAMP,
  );

  const translateY = interpolate(
    input,
    inputRange,
    [
      -itemSize * 4,
      -itemSize * 1.6,
      -itemSize * 0.2,
      0,
      itemSize * 0.2,
      itemSize * 1.6,
      itemSize * 4,
    ],
    Extrapolation.CLAMP,
  );

  return {
    transform: [
      {
        rotateX: `${rotateX}deg`,
      },
      { translateY },
    ],
    opacity,
  };
};
type TimePickerValue = { hour: number; minute: number };

type TimePickerContextValue = {
  minutesDisabled: boolean;
  value: TimePickerValue;
  setValue: Dispatch<SetStateAction<TimePickerValue | undefined>>;
  instance: UseDrawerReturn<Tuple<number, 2>>;
  disabled: boolean;
};
const TimePickerContext = createContext<TimePickerContextValue | null>(null);

const useTimePickerContext = () => {
  const context = useContext(TimePickerContext);

  if (!context) {
    throw new Error("TimePicker context is not available");
  }

  return context;
};

export type TimePickerProps = PropsWithChildren<{
  minutesDisabled?: false;
  value?: TimePickerValue;
  defaultValue?: TimePickerValue;
  onChange?: (value: TimePickerValue) => void;
  disabled?: boolean;
}>;

export const TimePicker = ({
  children,
  minutesDisabled = false,
  onChange,
  value: valueProp,
  defaultValue,
  disabled = false,
}: TimePickerProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const instance = useDrawer({
    snapPoints: [screenHeight, screenHeight - 400],
    startAt: screenHeight - 400,
  });

  const fallback = getDefaultValue(minutesDisabled);

  const [value = fallback, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? fallback,
    onChange,
  });
  return (
    <TimePickerContext.Provider
      value={{
        minutesDisabled,
        value,
        setValue,
        instance,
        disabled,
      }}
    >
      {children}
    </TimePickerContext.Provider>
  );
};

const getDefaultValue = (isMinuteSelectionDisabled = false) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  return isMinuteSelectionDisabled ? { hour, minute: 0 } : { hour, minute };
};

type TimePickerContentProps = PropsWithClassName;

export const TimePickerContent = ({ className }: TimePickerContentProps) => {
  const {
    instance: {
      animation: { translateY },
      pan,
    },
    minutesDisabled,
    value,
    setValue,
    disabled,
  } = useTimePickerContext();

  return (
    <Portal name={"time-picker_portal"}>
      <Animated.View
        style={[{ transform: [{ translateY }] }]}
        className={cn(
          "absolute bottom-0 z-[1000] w-full rounded-3xl p-4",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
      >
        <DrawerHandle pan={pan} />
        <View
          className={cn(
            "flex-row items-center overflow-hidden rounded-3xl border border-accent-dimmed bg-accent px-4",
            className,
          )}
          style={{ height: 180 }}
        >
          <View
            className={
              "-mt-1.5 -translate-y-1/2 absolute top-1/2 left-4 h-[52px] w-full items-center justify-center border-border border-y bg-primary/20"
            }
          >
            <Text className={"text-5xl"}>:</Text>
          </View>
          <Carousel
            gap={0}
            itemsPerPage={5}
            activeItem={value?.hour}
            direction={"vertical"}
            onActiveItemChange={(hour) => {
              setValue((previousValue = value) => ({
                ...previousValue,
                hour,
              }));
            }}
          >
            <CarouselContent
              classList={{
                root: "h-[300px]",
                content: "py-[120px]",
              }}
            >
              {HOURS.map((hour, index) => (
                <TimePickerItem value={hour} index={index} key={hour} />
              ))}
            </CarouselContent>
          </Carousel>
          <Carousel
            gap={0}
            itemsPerPage={5}
            activeItem={value?.minute}
            direction={"vertical"}
            onActiveItemChange={(minute) => {
              setValue((previousValue = value) => ({
                ...previousValue,
                minute,
              }));
            }}
          >
            <CarouselContent
              classList={{
                root: "h-[300px]",
                content: "py-[120px]",
              }}
            >
              {minutesDisabled ? (
                <TimePickerItem value={0} index={0} key={0} />
              ) : (
                MINUTES.map((minute, index) => (
                  <TimePickerItem value={minute} index={index} key={minute} />
                ))
              )}
            </CarouselContent>
          </Carousel>
        </View>
        <Button className={"mt-4"}>
          <Text>Proceed</Text>
        </Button>
      </Animated.View>
    </Portal>
  );
};

type TimePickerItemProps = {
  value: number;
} & CarouselItemProps;

const TimePickerItem = ({ index, value, className }: TimePickerItemProps) => {
  const { colorScheme } = useColorScheme();
  const theme = THEME_COLORS[colorScheme as "light" | "dark"];

  const fontSize = useSharedValue(20);

  const color = useSharedValue(theme.foreground);

  return (
    <CarouselItem
      index={index}
      // animate={(scrollOffset: number, index: number, itemSize: number) => {
      //   "worklet";
      //   const input = scrollOffset / itemSize;
      //   const inputRange = [
      //     index - 3,
      //     index - 2,
      //     index - 1,
      //     index,
      //     index + 1,
      //     index + 2,
      //     index + 3,
      //   ];
      //
      //   fontSize.value = interpolate(
      //     input,
      //     inputRange,
      //     [10, 18, 26, 50, 26, 18, 10],
      //     Extrapolation.CLAMP,
      //   );
      //
      //   return animate(scrollOffset, index, itemSize);
      // }}
      className={"relative mx-auto min-w-36 items-center justify-center"}
    >
      <Animated.Text
        className={cn(
          "items-center tabular-nums justify-center font-bold text-foreground text-xl tabular-nums leading-[50px]",
          className,
        )}
        style={{ color, fontSize }}
      >
        {value.toString().padStart(2, "0")}
      </Animated.Text>
    </CarouselItem>
  );
};

export const TimePickerTrigger = ({ children }: PressableProps) => {
  const {
    instance: { snapTo, normalizedSnapPoints },
  } = useTimePickerContext();
  return (
    <Pressable
      className={"w-full"}
      // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
      onPress={() => snapTo(normalizedSnapPoints.at(-1)!)}
    >
      {children}
    </Pressable>
  );
};
