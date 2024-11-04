import type { ForceMountable, PressableRef } from "../../types";

export type PopoverPortalProps = {
  children: React.ReactNode;
  hostName?: string;
} & ForceMountable;

export type PopoverOverlayProps = {
  closeOnPress?: boolean;
} & ForceMountable;

export type PopoverTriggerRef = {
  open: () => void;
  close: () => void;
} & PressableRef;
