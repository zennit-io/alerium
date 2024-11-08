import { NUMBER_OF_SIGN_UP_STEPS } from "@/components/auth/providers/sign-up";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { type FormConfig, field } from "@zennui/native/form";
import { z } from "zod";

const config = {
  email: field({
    shape: "text",
    constraint: z
      .string({
        required_error: "Your email is required",
      })
      .email("Please add a valid email"),
    type: "email",
    // autoFocus: true,
    placeholder: "Your email",
    label: "What's your email?",
    className: "border-0 px-0",
    classList: {
      message: "text-md",
      label: "text-4xl",
      input: {
        input: "text-3xl placeholder:text-foreground-dimmed/40",
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  return (
    <SignUpForm
      config={config}
      field="email"
      numberOfSteps={NUMBER_OF_SIGN_UP_STEPS}
      step={2}
      nextStep={"/sign-up/provider/phone"}
      keyboardDefaultOpen={true}
      keyboardPersisted={true}
    />
  );
};
