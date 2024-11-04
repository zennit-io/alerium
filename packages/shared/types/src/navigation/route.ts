import type { Icon } from "../components";

export type Route = {
  path: string;
  label: string;
  Icon: Icon;
  description?: string;
  subRoutes?: Route[];
};
