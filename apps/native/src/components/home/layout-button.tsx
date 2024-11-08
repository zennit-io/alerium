import { Pressable } from "react-native";
import { View3DIcon } from "@zennui/icons";
import { H3 } from "@zennui/native/typography";
import { Link } from "expo-router";

export const LayoutButton = () => {
  return (
    <Link asChild href={"/new-entry"}>
      <Pressable
        className={
          "rounded-full px-4 py-2 gap-3 flex flex-row items-center justify-center bg-primary absolute bottom-0 left-1/2 -translate-x-1/2"
        }
      >
        <View3DIcon className={"text-white size-10"} strokeWidth={1.5} />
        <H3 className={"text-white text-2xl font-normal"}>New entry</H3>
      </Pressable>
    </Link>
  );
};
