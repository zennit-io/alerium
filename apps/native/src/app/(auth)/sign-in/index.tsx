import {field, type FormConfig, FormSubmitButton, InferredForm, type InferredFormFields,} from "@zennui/native/form";
import {Text} from "@zennui/native/text";
import {useRouter} from "expo-router";
import type {SubmitHandler} from "react-hook-form";
import {View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {SafeAreaView, useSafeAreaInsets,} from "react-native-safe-area-context";
import {z} from "zod";
import {Header} from "@/components/general/header";
import {useAuthActions} from "@convex-dev/auth/react";

const config = {
  email: field({
    shape: "text",
    constraint: z
      .string({ required_error: "Email is required" })
      .email("Enter a valid email"),
    type: "email",
    label: "Write your email",
    placeholder: "Email",
    className: "rounded-none border-0 px-0 text-2xl text-foreground",
    classList: {
      label: "text-3xl",
      message: "text-lg",
      input: {
        input: "text-2xl placeholder:text-foreground-dimmed/40",
      },
    },
  }),
  password: field({
    shape: "text",
    constraint: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    placeholder: "Password",
    label: "Write your password",
    type: "password",
    className: "rounded-none border-0 px-0 text-2xl text-foreground",
    classList: {
      label: "text-3xl",
      message: "text-lg",
      input: {
        input: "text-2xl placeholder:text-foreground-dimmed/40",
        passwordDecorator: "size-6",
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { signIn } = useAuthActions();

  const handleFormSubmit: SubmitHandler<
    InferredFormFields<typeof config>
  > = async (data) => {
    try {
      signIn("password", { ...data, flow: "signIn" });
      router.push("/home");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header title={"Sign In"} />
      <SafeAreaView style={{ flex: 1, paddingTop: top }}>
        <ScrollView
          contentContainerClassName={"android:pb-28"}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View className="gap-6 px-6">
            <InferredForm
              config={config}
              className="gap-4"
              onSubmit={(data) => handleFormSubmit(data)}
            >
              <FormSubmitButton className="w-full">
                <Text className="text-2xl">Log in</Text>
              </FormSubmitButton>
            </InferredForm>
            <View className="my-4 flex-row items-center gap-4">
              <View className="h-px flex-1 bg-foreground-dimmed" />
              <Text className="text-foreground text-lg">Or</Text>
              <View className="h-px flex-1 bg-foreground-dimmed" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
