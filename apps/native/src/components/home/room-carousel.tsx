import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  type CarouselItemAnimateFn,
} from "@zennui/native/carousel";
import { cssInterop } from "nativewind";
import {
  useWindowDimensions,
  View,
  Image,
  type ImageSourcePropType,
} from "react-native";
import { Extrapolation, interpolate } from "react-native-reanimated";

cssInterop(Image, { className: "style" });

const ROOMS = [
  {
    image: require("@assets/images/home/room1.jpeg"),
    name: "Room 1",
  },
  {
    image: require("@assets/images/home/room2.jpeg"),
    name: "Room 2",
  },
  {
    image: require("@assets/images/home/room3.jpeg"),
    name: "Room 3",
  },
];

export const RoomCarousel = () => {
  return (
    <View className={"w-full h-96 gap-2 items-center"}>
      <Carousel itemCount={ROOMS.length}>
        <CarouselContent align={"center"}>
          {ROOMS.map((room, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: no better way to do this
            <RoomCarouselItem key={index} index={index} {...room} />
          ))}
        </CarouselContent>
        <CarouselIndicator growthIndex={3} className={"-translate-y-12"} />
      </Carousel>
    </View>
  );
};

type RoomCarouselItemProps = {
  index: number;
  image: ImageSourcePropType;
  name: string;
};
const RoomCarouselItem = ({ index, image, name }: RoomCarouselItemProps) => {
  const { width } = useWindowDimensions();
  return (
    <CarouselItem
      index={index}
      className="p-2"
      style={{
        width: (4 / 5) * width,
      }}
      animate={animate}
    >
      <Image source={image} className={"w-full h-64 rounded-2xl"} />
    </CarouselItem>
  );
};
const animate: CarouselItemAnimateFn = (scrollOffset, index, itemSize) => {
  "worklet";
  const input = scrollOffset / itemSize;
  const range = [index - 1, index, index + 1];

  const scale = interpolate(
    input,
    range,
    [0.95, 1.1, 0.95],
    Extrapolation.CLAMP,
  );
  const translateY = interpolate(
    input,
    range,
    [0, -30, 0],
    Extrapolation.CLAMP,
  );

  return {
    transform: [{ scale }, { translateY }],
  };
};
