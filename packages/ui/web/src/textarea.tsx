import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";

export type TextareaProps = ComponentProps<"textarea">;

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-sm ring-offset-background placeholder:text-foreground-dimmed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
