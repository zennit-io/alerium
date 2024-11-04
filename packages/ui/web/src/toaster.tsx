"use client";

import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

export const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-xl group-[.toaster]:bg-accent/40 group-[.toaster]:text-foreground-dimmed !backdrop-blur-lg group-[.toast]:!backdrop-blur-lg group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-foreground-dimmed",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-foreground-dimmed",
          cancelButton:
            "group-[.toast]:bg-accent group-[.toast]:text-foreground-dimmed",
        },
      }}
      {...props}
    />
  );
};
