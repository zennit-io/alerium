import { signUpAtom } from "@/components/auth/providers/sign-up";
import { NUMBER_OF_SIGN_UP_STEPS } from "@/components/auth/providers/sign-up";
import { SignUpForm } from "@/components/auth/sign-up-form";
import {
  type FormConfig,
  type InferredFormFields,
  field,
} from "@zennui/native/form";
import { useRouter } from "expo-router";
import { useAtomValue } from "jotai";
import { z } from "zod";

const config = {
  password: field({
    shape: "text",
    constraint: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
    type: "password",
    placeholder: "Your password",
    label: "Write your password",
    className: "border-0 px-0",
    classList: {
      message: "text-md",
      label: "text-4xl",
      input: {
        input: "text-3xl placeholder:text-foreground-dimmed/40",
        passwordDecorator: "size-6",
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  const signUp = useAtomValue(signUpAtom);
  const router = useRouter();

  const handleFormSubmit = async (
    data: InferredFormFields<typeof config>,
  ): Promise<undefined> => {
  };

  return (
    <SignUpForm
      config={config}
      field="password"
      numberOfSteps={NUMBER_OF_SIGN_UP_STEPS}
      step={5}
      keyboardDefaultOpen={true}
    />
  );
};
