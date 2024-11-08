import { Header } from "@/components/general/header";
import { Button } from "@zennui/native/button";
import { field } from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { Link } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const config = {
  name: field({
    shape: "text",
    constraint: z.string().min(1),
    label: "Name Building",
    placeholder: "e.g Kone Building No.9",
    classList: {
      root: "gap-0",
      label: "text-2xl",
      input: {
        root: "border-0 gap-0",
        input: "placeholder:text-foreground-dimmed/50 text-xl h-auto",
      },
    },
  }),
};

export default () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      <Header title="Scan Label" />
      <View
        className="flex-1 px-6"
        style={{
          paddingTop: top + 60,
        }}
      >
        <Link href={"/scanned-info"} asChild>
          <Button
            color={"primary"}
            className="absolute self-center bottom-6 w-full"
          >
            <Text>Continue</Text>
          </Button>
        </Link>
      </View>
    </>
  );
};
