import type { PropsWithChildren, ReactNode } from "react";

export type LayoutProps<T extends string | never = never> = PropsWithChildren<
  Record<T, ReactNode>
>;
