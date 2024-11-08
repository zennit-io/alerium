import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import { Progress } from "@zennui/native/progress";
import { H4 } from "@zennui/native/typography";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  type ViewProps,
} from "react-native";

type FormProgressBarClassListKey = "root";

export type FormProgressBarProps = {
  progress: number;
  numberOfSteps: number;
  className?: string;
  classList?: ClassList<FormProgressBarClassListKey>;
  style?: ViewProps["style"];
};

export const FormProgressBar = ({
  progress,
  numberOfSteps,
  className,
  classList,
  style,
}: FormProgressBarProps) => {
  const stepPercentage = 100 / numberOfSteps;
  const stepsCompleted = Math.floor(progress / stepPercentage);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View
        className={cn(
          "z-50 flex w-full items-end gap-1 px-8 pb-6",
          className,
          classList?.root,
        )}
        style={style}
      >
        <H4 className="text-primary tracking-wide">
          {stepsCompleted} of {numberOfSteps}
        </H4>
        <Progress
          value={progress}
          className="bg-background-dimmed"
          classList={{
            indicator: "rounded-full bg-primary",
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
