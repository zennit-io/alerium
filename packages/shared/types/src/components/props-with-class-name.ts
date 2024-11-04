import type { EmptyObject } from "../domain";
import type { Props } from "./props";

export type PropsWithClassName<T extends Props = EmptyObject> = T & {
  className?: string;
};
