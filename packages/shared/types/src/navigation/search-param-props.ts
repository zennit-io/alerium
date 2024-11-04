import type { SearchParams } from "./search-params";

export type SearchParamProps<T extends string> = {
  searchParam: SearchParams<T>;
};
