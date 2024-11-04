export type DynamicRouteProps<T extends string = "id"> = {
  params: Record<T, string>;
};
