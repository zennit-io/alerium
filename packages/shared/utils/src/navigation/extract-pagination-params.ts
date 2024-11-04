import type { SearchParams } from "@zenncore/types/navigation";
import { parseSearchParams } from "./parse-search-params";

type PaginationParams = SearchParams<"pageSize" | "page">;

export const extractPaginationParams = ({
  pageSize,
  page,
}: PaginationParams) => {
  return {
    page: Number(parseSearchParams(page, "single", "1")),
    pageSize: Number(parseSearchParams(pageSize, "single", "20")),
  };
};
