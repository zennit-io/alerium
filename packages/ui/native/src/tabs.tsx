import * as TabsPrimitive from "@rn-primitives/tabs";
import { cn } from "@zenncore/utils";
import type { ComponentProps } from "react";
import { TextClassContext } from "./text";

export const Tabs = TabsPrimitive.Root;

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List>;

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <TabsPrimitive.List
    className={cn(
      "h-12 items-center justify-center rounded-md bg-background-dimmed px-1.5",
      className,
    )}
    {...props}
  />
);

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger>;
export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  const { value } = TabsPrimitive.useRootContext();
  return (
    <TextClassContext.Provider
      value={cn(
        "font-medium text-base text-foreground-dimmedH",
        value === props.value && "text-foreground",
      )}
    >
      <TabsPrimitive.Trigger
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-border px-3 py-1.5 font-medium text-sm shadow-none transition-all",
          props.disabled && "opacity-50",
          props.value === value &&
            "border-primary-dimmed bg-primary shadow-background-rich shadow-sm",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
};

type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <TabsPrimitive.Content className={cn(className)} {...props} />
);
