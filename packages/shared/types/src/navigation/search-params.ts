import type { SearchParam } from "./search-param";

export type SearchParams<T extends string> = {
  [P in T]: SearchParam;
};
