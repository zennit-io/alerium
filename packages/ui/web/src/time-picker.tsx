"use client";

import { cn } from "@zenncore/utils";
import { cva } from "class-variance-authority";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef } from "react";

const CIRCLE_DEGREES = 360;
const WHEEL_ITEM_SIZE = 32;
const WHEEL_ITEM_COUNT = 18;
const WHEEL_ITEMS_IN_VIEW = 4;

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT;
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW;
export const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT),
);

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES;

const setSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
): void => {
  // biome-ignore lint/style/noNonNullAssertion: this element is guaranteed to exist
  const slideNode = emblaApi.slideNodes()[index]!;
  const wheelLocation = emblaApi.scrollProgress() * totalRadius;
  const positionDefault = (emblaApi.scrollSnapList()[index] ?? 1) * totalRadius;
  const positionLoopStart = positionDefault + totalRadius;
  const positionLoopEnd = positionDefault - totalRadius;

  let inView = false;
  let angle = index * -WHEEL_ITEM_RADIUS;

  if (isInView(wheelLocation, positionDefault)) inView = true;

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true;
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS;
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true;
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS;
  }

  if (inView) {
    slideNode.style.opacity = "1";
    slideNode.style.transform = `translateY(-${
      index * 100
    }%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`;
  } else {
    slideNode.style.opacity = "0";
    slideNode.style.transform = "none";
  }
};

export const setContainerStyles = (
  emblaApi: EmblaCarouselType,
  wheelRotation: number,
): void => {
  emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`;
};

export type TimePickerItemProps = {
  loop?: boolean;
  label: string;
  slideCount: number;
  perspective: "left" | "right";
};

export const TimePickerItem = ({
  loop = false,
  label,
  slideCount,
  perspective,
}: TimePickerItemProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    axis: "y",
    dragFree: true,
    containScroll: false,
    watchSlides: false,
  });
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS;
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;
  const slides = Array.from(Array(slideCount).keys());

  const inactivateEmblaTransform = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!emblaApi) return;

      const { translate, slideLooper } = emblaApi.internalEngine();

      translate.clear();
      translate.toggleActive(false);

      for (const { translate } of slideLooper.loopPoints) {
        translate.clear();
        translate.toggleActive(false);
      }
    },
    [],
  );

  const rotateWheel = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset;
      const wheelRotation = rotation * emblaApi.scrollProgress();

      setContainerStyles(emblaApi, wheelRotation);

      emblaApi.slideNodes().forEach((_, index) => {
        setSlideStyles(emblaApi, index, loop, slideCount, totalRadius);
      });
    },
    [slideCount, rotationOffset, totalRadius, loop],
  );

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("pointerUp", (emblaApi) => {
      const { scrollTo, target, location } = emblaApi.internalEngine();
      const diffToTarget = target.get() - location.get();
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1;
      const distance = diffToTarget * factor;

      scrollTo.distance(distance, true);
    });

    emblaApi.on("scroll", rotateWheel);

    emblaApi.on("reInit", (emblaApi) => {
      inactivateEmblaTransform(emblaApi);
      rotateWheel(emblaApi);
    });

    inactivateEmblaTransform(emblaApi);
    rotateWheel(emblaApi);
  }, [emblaApi, inactivateEmblaTransform, rotateWheel]);

  return (
    <div className="flex h-full min-w-1/2 items-center justify-center text-lg leading-none">
      <div
        className="flex h-full min-w-full touch-pan-x items-center overflow-hidden"
        ref={rootNodeRef}
      >
        <div
          className={cn("h-8 w-full select-none [perspective:1000px]", {
            "translate-x-[27px] [perspective-origin:calc(50%+130px)_50%]":
              perspective === "left",
            "translate-x-[-27px] [perspective-origin:calc(50%-130px)_50%]":
              perspective === "right",
          })}
          ref={emblaRef}
        >
          <div className="size-full will-change-transform [transform-style:preserve-3d]">
            {slides.map((key, index) => (
              <div
                className="flex h-full w-full items-center justify-center text-center opacity-0 [backface-visibility:hidden]"
                key={key}
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none font-bold">{label}</div>
    </div>
  );
};

export type TimePickerProps = {
  loop?: boolean;
};

const timePickerPseudoElementVariants = cva(
  "before:pointer-events-none before:absolute before:inset-x-0 before:z-[1] before:block before:h-[calc(50%_-_32px_/_2)] after:pointer-events-none after:absolute after:inset-x-0 after:z-[1] after:block after:h-[calc(50%_-_32px_/_2)]",
  {
    variants: {
      type: {
        before:
          "before:top-[-0.5px] before:border-b-[0.5px] before:border-b-accent-foreground before:border-solid",
        after:
          "after:bottom-[-0.5px] after:border-t-[0.5px] after:border-t-accent-foreground after:border-solid",
      },
    },
  },
);

export const TimePicker = ({ loop = false }: TimePickerProps) => {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-[22.2rem] w-full max-w-[30rem] justify-evenly",
        timePickerPseudoElementVariants({ type: "before" }),
        timePickerPseudoElementVariants({ type: "after" }),
      )}
    >
      <TimePickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label="hours"
      />
      <TimePickerItem
        slideCount={60}
        perspective="right"
        loop={loop}
        label="min"
      />
    </div>
  );
};
