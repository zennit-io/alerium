import type { Tuple } from "@zenncore/types/utilities";
import { useCallback, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Gesture, type PanGesture } from "react-native-gesture-handler";
import {
  type AnimationCallback,
  Easing,
  ReduceMotion,
  type SharedValue,
  type WithTimingConfig,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const drawerAnimationConfig = {
  duration: 300,
  easing: Easing.inOut(Easing.quad),
  reduceMotion: ReduceMotion.System,
};

export type SnapPoint = number | `${number}%`;

export type UseDrawerParams<T extends Tuple<SnapPoint>> = {
  snapPoints: T;
  onPointSnap?: (snapPoint: T[number], translateY: number) => void;
  onDragUpdate?: (translateY: number) => void;
  onDragEnd?: (translateY: number) => void;
  animationConfig?: WithTimingConfig;
  startAt?: T[number];
};
export type UseDrawerReturn<T extends Tuple<SnapPoint>> = {
  pan: PanGesture;
  snapTo: (snapPoint: T[number], callback?: AnimationCallback) => void;
  normalizedSnapPoints: number[];
  animation: {
    translateY: SharedValue<number>;
  };
  // activeSnapPoint: T[number];
};
export const buildVelocityDependantAnimationConfig = (
  velocityY: number,
): WithTimingConfig => {
  "worklet";
  // Base duration for the animation
  const baseDuration = 500;
  // Calculate a velocity factor (adjust these values as needed)
  const velocityFactor = Math.min(Math.abs(velocityY) / 500, 1);
  // Adjust duration based on velocity (faster gesture = shorter animation)
  const duration = baseDuration * (1 - velocityFactor * 0.5);
  // Choose easing based on velocity
  const easing =
    velocityFactor > 0.5
      ? Easing.out(Easing.cubic)
      : Easing.inOut(Easing.cubic);

  return {
    duration,
    easing,
    reduceMotion: ReduceMotion.System,
  };
};
export const normalizeSnapPoint = (snapPoint: SnapPoint, height: number) => {
  "worklet";
  if (typeof snapPoint === "number") return snapPoint;

  const percentage = Number(snapPoint.replace("%", ""));
  return (height * percentage) / 100;
};
export const useDrawer = <T extends Tuple<SnapPoint>>({
  snapPoints,
  onPointSnap,
  onDragUpdate,
  onDragEnd,
  // buildAnimationConfig = buildDefaultAnimationConfig,
  animationConfig = drawerAnimationConfig,
  startAt = 0,
}: UseDrawerParams<T>): UseDrawerReturn<T> => {
  const { height } = useWindowDimensions();
  const maxTranslateY = 0;
  const memoizedNormalizeSnapPoint = useCallback(
    (snapPoint: SnapPoint) => normalizeSnapPoint(snapPoint, height),
    [height],
  );
  const normalizedSnapPoints = snapPoints
    .map(memoizedNormalizeSnapPoint)
    .sort((a, b) => a - b);

  const maxIndex = -1;
  const minIndex = 0;
  // this causes it to be open at the start, without animations
  // const max = startAt
  //   ? memoizedNormalizeSnapPoint(startAt)
  //   : normalizedSnapPoints.at(maxIndex);
  // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
  const max = normalizedSnapPoints.at(maxIndex)!;

  // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
  const min = normalizedSnapPoints.at(minIndex)!;

  const translateY = useSharedValue(max);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this is fine
  useEffect(() => {
    if (startAt) {
      translateY.value = withTiming(
        memoizedNormalizeSnapPoint(startAt),
        drawerAnimationConfig,
      );
    }
  }, [startAt, memoizedNormalizeSnapPoint]);

  const context = useSharedValue({
    y: 0,
  });

  const handleAnimationFinalization = (translateY: number) => {
    "worklet";
    const index = normalizedSnapPoints.findIndex(
      (snapPoint) => Math.abs(snapPoint - translateY) < 0.1,
    );
    // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
    const snapPoint = snapPoints.at(index)! ?? snapPoints.at(minIndex)!;
    onPointSnap && runOnJS(onPointSnap)(snapPoint, translateY);
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      context.value = {
        y: translateY.value,
      };
    })
    .onUpdate(({ translationY, velocityY }) => {
      // const animationConfig = buildAnimationConfig(velocityY);
      translateY.value = translationY + context.value.y;
      translateY.value = Math.max(translateY.value, maxTranslateY);
      onDragUpdate && runOnJS(onDragUpdate)(translateY.value);
    })
    .onEnd(({ velocityY }) => {
      "worklet";
      // const animationConfig = buildAnimationConfig(velocityY);
      const direction = velocityY > 0 ? "down" : "up";
      let haveTarget = false;
      // normalizedSnapPoints are from lowest to highest
      for (let index = 0; index < normalizedSnapPoints.length; index++) {
        // the lower on in value
        // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
        const snapPoint = normalizedSnapPoints[index]!;
        // the higher one in value, makes the drawer go down
        // const nextIndex = Math.min(index + 1, normalizedSnapPoints.length - 1);
        const nextIndex =
          index + 1 > normalizedSnapPoints.length - 1
            ? normalizedSnapPoints.length - 1
            : index + 1;
        // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
        const nextSnapPoint = normalizedSnapPoints[nextIndex]!;
        // the lowest one in value, makes the drawer go up
        // const previousIndex = Math.min(index - 1, 0);
        const previousIndex = index - 1 < 0 ? 0 : index - 1;
        // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
        const previousSnapPoint = normalizedSnapPoints[previousIndex]!;

        // absoluteY is how far from the screen tops the drag ended, the closer to the screen ends, the higher the value
        // the snap points are a list of values in pixels inside the range 0 <= value <= screen_height, they're sorted from heights to lowest
        // velocityY shows us the direction of the drag, negative for upwards, positive for downwards
        // the bigger the translateY the more down the modal

        // we need to calculate these only in the case when it actually relates to the snapPoint in the loop
        // to find that we will need to see if it is going down, the loop index we care to process is the one where the absoluteY is between [previousSnapPoint, snapPoint]
        //
        const isTarget =
          direction === "down"
            ? snapPoint <= translateY.value && translateY.value <= nextSnapPoint
            : previousSnapPoint <= translateY.value &&
              translateY.value <= snapPoint;
        if (!isTarget) continue;
        if (direction === "down") {
          translateY.value = withTiming(
            nextSnapPoint,
            drawerAnimationConfig,
            (finished) => {
              if (finished) handleAnimationFinalization(translateY.value);
            },
          );
        } else {
          translateY.value = withTiming(
            previousSnapPoint,
            drawerAnimationConfig,
            (finished) => {
              if (finished) handleAnimationFinalization(translateY.value);
            },
          );
        }
        haveTarget = true;
      }
      if (!haveTarget) {
        const index = direction === "up" ? minIndex : maxIndex;
        // biome-ignore lint/style/noNonNullAssertion: index is guaranteed to be valid
        const value = normalizedSnapPoints.at(index)!;
        translateY.value = withTiming(
          value,
          drawerAnimationConfig,
          (finished) => {
            if (finished) {
              handleAnimationFinalization(translateY.value);
            }
          },
        );
      }
      onDragEnd && runOnJS(onDragEnd)(translateY.value);
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: it's fine
  const snapTo = useCallback(
    (snapPoint: T[number], onAnimationComplete?: AnimationCallback) => {
      const normalizedSnapPoint = memoizedNormalizeSnapPoint(snapPoint);
      translateY.value = withTiming(
        normalizedSnapPoint,
        animationConfig,
        () => {
          onAnimationComplete && runOnJS(onAnimationComplete)();
          handleAnimationFinalization(translateY.value);
        },
      );
    },
    [memoizedNormalizeSnapPoint, translateY, animationConfig],
  );

  return {
    pan,
    snapTo,
    normalizedSnapPoints,
    animation: {
      translateY,
    },
    // activeSnapPoint: memoizedNormalizeSnapPoint()
  };
};
