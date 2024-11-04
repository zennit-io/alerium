import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
} from "@zennui/native/carousel";
import { Image, type ImageSource } from "expo-image";
import { cssInterop } from "nativewind";
import { View } from "react-native";

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
    <View className={"w-full h-60 gap-2"}>
      <Carousel itemCount={ROOMS.length}>
        <CarouselContent align={"center"}>
          {ROOMS.map((room, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: no better way to do this
            <RoomCarouselItem key={index} index={index} {...room} />
          ))}
        </CarouselContent>
        <CarouselIndicator growthIndex={5} />
      </Carousel>
    </View>
  );
};

type RoomCarouselItemProps = {
  index: number;
  image: ImageSource;
  name: string;
};
const RoomCarouselItem = ({ index, image, name }: RoomCarouselItemProps) => {
  return (
    <CarouselItem index={index} className="self-strech relative p-2">
      <Image source={image} className={"size-full rounded-2xl"} />
    </CarouselItem>
  );
};
