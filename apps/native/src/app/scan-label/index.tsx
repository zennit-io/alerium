import { Header } from "@/components/general/header";
import { ScanIcon, View3DIcon } from "@zennui/icons";
import { Button } from "@zennui/native/button";
import { Drawer, DrawerContent } from "@zennui/native/drawer";
import { FormSubmitButton, InferredForm, field } from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { H1 } from "@zennui/native/typography";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
        <Button
          color={"primary"}
          className="absolute self-center bottom-6 w-full"
        >
          <Text>Continue</Text>
        </Button>
      </View>
    </>
  );
};
