import { Pressable } from "react-native";
import { View3DIcon } from "@zennui/icons";
import { H3 } from "@zennui/native/typography";
export const LayoutButton = () => {
  return (
    <Pressable
      className={
        "rounded-full size-24 flex items-center justify-center bg-primary"
      }
    >
      <View3DIcon className={"text-white size-12"} strokeWidth={1.5} />
      <H3 className={"text-white text-xl font-normal"}>Scan</H3>
    </Pressable>
  );
};
