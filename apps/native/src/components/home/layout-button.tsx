import {View3DIcon} from "@zennui/icons";
import {Button} from "@zennui/native/button";
import {H3} from "@zennui/native/typography";
import {Link} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const LayoutButton = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Link asChild href={"/(report)/new-entry"}>
      <Button
        className={
          "w-[90%] self-center z-10 mx-auto py-2 gap-3 flex-row items-center justify-center bg-primary absolute shadow-primary/40 mb-6"
        }
        style={{ bottom }}
      >
        <View3DIcon className={"text-white size-10"} strokeWidth={1.5} />
        <H3 className={"text-white text-2xl font-normal"}>Add entry to latest survey</H3>
      </Button>
    </Link>
  );
};
