import React, { useEffect, useState, useCallback, useRef } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type CarouselApi = UseEmblaCarouselType[1];

type DefinedCarouselApi = Exclude<CarouselApi, undefined>;

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
  emblaApi: DefinedCarouselApi,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
): void => {
  const slideNode = emblaApi.slideNodes()[index];
  const wheelLocation = emblaApi.scrollProgress() * totalRadius;
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius;
  const positionLoopStart = positionDefault + totalRadius;
  const positionLoopEnd = positionDefault - totalRadius;

  let inView = false;
  let angle = index * -WHEEL_ITEM_RADIUS;

  if (isInView(wheelLocation, positionDefault)) {
    inView = true;
  }

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

const setContainerStyles = (
  emblaApi: DefinedCarouselApi,
  wheelRotation: number,
): void => {
  emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`;
};

type PropType = {
  loop?: boolean;
  slideCount: number;
  perspective: "left" | "right";
  setApi?: (api: CarouselApi) => void;
  initialValue?: number;
};

const PickerItem: React.FC<PropType> = ({
  slideCount,
  perspective,
  loop = false,
  setApi,
  initialValue,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      axis: "y",
      dragFree: true,
      containScroll: false,
      watchSlides: false,
    },
    [WheelGesturesPlugin()],
  );
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS;
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;
  const slides = Array.from(Array(slideCount).keys());

  const inactivateEmblaTransform = useCallback(
    (emblaApi: DefinedCarouselApi) => {
      if (!emblaApi) return;
      const { translate, slideLooper } = emblaApi.internalEngine();
      translate.clear();
      translate.toggleActive(false);
      slideLooper.loopPoints.forEach(({ translate }) => {
        translate.clear();
        translate.toggleActive(false);
      });
    },
    [],
  );

  const rotateWheel = useCallback(
    (emblaApi: DefinedCarouselApi) => {
      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset;
      const wheelRotation = rotation * emblaApi.scrollProgress();
      setContainerStyles(emblaApi, wheelRotation);
      emblaApi.slideNodes().forEach((_, index) => {
        setSlideStyles(emblaApi, index, loop, slideCount, totalRadius);
      });
    },
    [slideCount, rotationOffset, loop, totalRadius],
  );

  useEffect(() => {
    if (!emblaApi || !setApi) {
      return;
    }

    setApi(emblaApi);
    if (initialValue) {
      emblaApi.scrollTo(initialValue, true);
    }
  }, [emblaApi, initialValue, setApi]);

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
    <div
      className={cn(
        "datepicker-content tg-title3 flex h-full min-w-[50%] items-center justify-center text-tg-text",
      )}
    >
      <div
        className="flex h-full min-w-full touch-pan-x items-center overflow-hidden"
        ref={rootNodeRef}
      >
        <div
          className={cn(
            "h-8 w-full select-none",
            perspective === "left"
              ? "translate-x-[48px]"
              : "-translate-x-[48px]",
          )}
          ref={emblaRef}
        >
          <div className="h-full w-full will-change-transform transform-style-3d transform-gpu">
            {slides.map((_, index) => (
              <div
                className="tg-title3 flex h-full w-full items-center justify-center text-center font-medium opacity-0 backface-hidden"
                key={index}
              >
                {`${index}`.padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Picker = ({
  value,
  setValue,
  type,
}: {
  value: number;
  setValue: (value: number) => void;
  type: "hours" | "minutes";
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setValue(api.selectedScrollSnap());

    const handleSelect = () => {
      setValue(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
  }, [api, setValue]);

  return (
    <PickerItem
      slideCount={type === "hours" ? 24 : 60}
      perspective={type === "hours" ? "left" : "right"}
      loop
      setApi={setApi}
      initialValue={value}
    />
  );
};

const PickerHighlight = () => {
  return (
    <div className="absolute left-0 top-[50%] h-8 w-full rounded-lg bg-tg-bg-tertiary opacity-40 -translate-y-[50%] pointer-events-none" />
  );
};

export { PickerItem, Picker, PickerHighlight };
