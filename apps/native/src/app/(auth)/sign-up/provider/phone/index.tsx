import { signUpAtom } from "@/components/auth/providers/sign-up";
import { useSignUpInputFocus } from "@/components/auth/providers/sign-up-input-focus";
import { Button } from "@zennui/native/button";
import { useIsFocused } from "@react-navigation/native";
import { isValidPhoneNumber } from "@zenncore/utils/components";
import { LoadingIcon } from "@zennui/icons";
import {
  Form,
  type FormConfig,
  InferredFormControl,
  type InferredFormFields,
  field,
  useInferredForm,
} from "@zennui/native/form";
import { Text } from "@zennui/native/text";
import { useAction } from "convex/react";
import { useFocusEffect, useRouter } from "expo-router";
import { useAtom } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { type TextInput, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { z } from "zod";

const config = {
  phone: field({
    shape: "phone",
    constraint: z
      .string({
        required_error: "Your phone number is required",
      })
      .refine(isValidPhoneNumber, "Please add a valid phone number"),
    placeholder: "phone number",
    label: "Write your phone number",
    defaultCountry: "AL",
    className: "border-0 px-0",
    classList: {
      message: "text-md",
      label: "text-4xl",
      input: {
        root: "gap-2",
        input: "text-3xl placeholder:text-foreground-dimmed/40",
        countrySelect: {
          countryCode: "text-3xl",
          iso: "text-3xl",
        },
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [signUp, setSignUp] = useAtom(signUpAtom);
  const focusSignUpInput = useSignUpInputFocus();
  const form = useInferredForm(config, {
    defaultValues: {
      phone: signUp.phone,
    },
  });
  const ref = useRef<TextInput>(null);
  const translateX = useSharedValue(10);

  const opacity = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-10, 0, 10],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );
  });

  const handleFormSubmit: SubmitHandler<
    InferredFormFields<typeof config>
  > = async (data) => {
    const isPhoneUnchanged = data.phone === signUp.phone;
    const isPhoneNumberVerified = !!signUp.token;

    if (isPhoneUnchanged && isPhoneNumberVerified) {
      translateX.value = withTiming(-10, { duration: 200 });
      return router.push("/sign-up/provider/birthdate");
    }

    setIsSendingOTP(true);
    setIsSendingOTP(false);

    focusSignUpInput();

    setSignUp((previousSignUp) => ({
      ...previousSignUp,
      phone: data.phone,
      token: null,
    }));

    translateX.value = withTiming(-10, { duration: 200 });
    router.push("/sign-up/provider/verify");
  };

  useEffect(() => {
    if (isFocused) {
      translateX.value = withDelay(300, withTiming(0, { duration: 200 }));
    }
  }, [isFocused, translateX]);

  // // biome-ignore lint/correctness/useExhaustiveDependencies: this should only run on unmount
  // useEffect(() => {
  //   return () => {
  //     focusSignUpInput();
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => ref.current?.focus(), 30);
    }, []),
  );

  return (
    <Form {...form}>
      <View className="h-64 justify-between gap-6 px-6">
        <Animated.View style={{ opacity, transform: [{ translateX }] }}>
          <InferredFormControl name={"phone"} {...config.phone} ref={ref} />
        </Animated.View>
        <Button
          color={"primary"}
          disabled={isSendingOTP}
          onPress={form.handleSubmit(handleFormSubmit)}
        >
          {isSendingOTP ? (
            <View className="flex-row gap-2">
              <View className="animate-spin">
                <LoadingIcon className="text-foreground" />
              </View>
              <Text className="text-2xl text-foreground">Sending Code</Text>
            </View>
          ) : (
            <Text className="text-2xl text-foreground">Continue</Text>
          )}
        </Button>
      </View>
    </Form>
  );
};
