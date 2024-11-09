import { Header } from "@/components/general/header";
import { ScanIcon, View3DIcon } from "@zennui/icons";
import { Drawer, DrawerContent } from "@zennui/native/drawer";
import { FormSubmitButton, InferredForm, field } from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { H1 } from "@zennui/native/typography";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const config = {
  name: field({
    shape: "text",
    constraint: z.string().min(1),
    label: "Name Building",
    placeholder: "e.g Kone Building No.9",
    classList: {
      label: "text-2xl",
      input: {
        root: "border-0 h-6 gap-0",
        input: "placeholder:text-foreground-dimmed/50 text-xl",
      },
    },
  }),
};

export default () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Header title="" />
      <Drawer snapAt={"60%"} open={isOpen} scaleBackground={false}>
        <DrawerContent className="gap-8 px-6">
          <H1 className="text-primary text-center">Survey Location</H1>
          <InferredForm
            config={config}
            onSubmit={() => {
              router.push("/scan-label");
            }}
          >
            <FormSubmitButton className="h-14 mt-12 flex-row">
              <ScanIcon className="text-foreground size-8" />
              <Text>Scan Label</Text>
            </FormSubmitButton>
          </InferredForm>
        </DrawerContent>
      </Drawer>
    </>
  );
};
