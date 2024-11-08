import { NUMBER_OF_SIGN_UP_STEPS } from "@/components/auth/providers/sign-up";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { type FormConfig, field } from "@zennui/native/form";
import { z } from "zod";

const config = {
  fullName: field({
    shape: "text",
    constraint: z
      .string({
        required_error: "Your full (company) name is required",
      })
      .min(1, "Your full (company) name is required")
      .refine(
        (value) => Number.isNaN(Number(value)),
        "Entered full name shouldn't be a number",
      ),
    placeholder: "Your full (company) name",
    label: "Write your full name",
    textContentType: "name",
    autoCapitalize: "words",
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
      field="fullName"
      numberOfSteps={NUMBER_OF_SIGN_UP_STEPS}
      step={1}
      nextStep={"/sign-up/provider/email"}
      keyboardPersisted={true}
    />
  );
};
