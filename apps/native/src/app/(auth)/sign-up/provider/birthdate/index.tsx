import { NUMBER_OF_SIGN_UP_STEPS } from "@/components/auth/providers/sign-up";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { type FormConfig, field } from "@zennui/native/form";
import { differenceInYears } from "date-fns";
import { z } from "zod";

const config = {
  birthdate: field({
    shape: "date",
    constraint: z
      .string({ invalid_type_error: "Please add your birthdate" })
      .datetime()
      .refine(
        (value) => differenceInYears(new Date(), new Date(value)) >= 18,
        "You must be at least 18 years old",
      ),
    type: "date",
    // defaultOpen: true,
    returnType: "string",
    placeholder: "Your birthdate",
    label: "What's your birthdate?",
    snapAt: "80%",
    className: "px-4",
    classList: {
      message: "text-md",
      label: "text-4xl",
      input: {
        triggerContent: "text-3xl placeholder:text-foreground-dimmed/40",
      },
    },
  }),
} satisfies FormConfig;

export default () => {
  return (
    <SignUpForm
      config={config}
      field="birthdate"
      step={4}
      numberOfSteps={NUMBER_OF_SIGN_UP_STEPS}
      nextStep={"/sign-up/provider/password"}
      keyboardPersisted={true}
    />
  );
};
