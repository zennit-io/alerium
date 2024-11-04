import type { SearchParam } from "@zenncore/types/navigation";

export function parseSearchParams(
  searchParam: SearchParam,
  result: "single",
  fallback?: never,
): string | undefined;

export function parseSearchParams(
  searchParam: SearchParam,
  result: "single",
  fallback: string,
): string;

export function parseSearchParams(
  searchParam: SearchParam,
  result: "list",
  fallback?: never,
): string[] | undefined;

export function parseSearchParams(
  searchParam: SearchParam,
  result: "list",
  fallback: string[],
): string[];

export function parseSearchParams(
  searchParam: SearchParam,
  result: "single" | "list",
  fallback?: string | string[],
) {
  if (!searchParam) return fallback;
  switch (result) {
    case "single":
      return typeof searchParam === "string"
        ? searchParam
        : (searchParam?.[0] ?? fallback);
    case "list": {
      return typeof searchParam === "string" ? [searchParam] : searchParam;
    }
  }
}

const test = parseSearchParams("test", "list");
