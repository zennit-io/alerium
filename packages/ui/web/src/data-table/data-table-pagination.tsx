"use client";

import type { Class } from "@babel/types";
import { useDataTableContext } from "@zenncore/components/data-table";
import type { ClassList } from "@zenncore/types";
import { cn } from "@zenncore/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "@zennui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { textBlurAnimationConfig } from "../_animations";
import { Button, type ButtonProps } from "../button";

// type DataTableClassListKey =
//   | "root"
//   | {
//       "start-button": NonNullable<ButtonProps["classList"]>;
//       "end-button": ButtonProps["classList"];
//       "next-button": ButtonProps["classList"];
//       "previous-button": ButtonProps["classList"];
//     };

// let test: ClassList<DataTableClassListKey> = {};

type DataTableClassListKey = "root";
type DataTableClassList = ClassList<DataTableClassListKey> & {
  "start-button"?: NonNullable<ButtonProps["classList"]>;
  "end-button"?: NonNullable<ButtonProps["classList"]>;
  "next-button"?: NonNullable<ButtonProps["classList"]>;
  "previous-button"?: NonNullable<ButtonProps["classList"]>;
};

type DataTablePrimitiveProps = {
  className?: string;
  classList?: DataTableClassList;
};

export const DataTablePagination = ({
  className,
  classList,
}: DataTablePrimitiveProps) => {
  const { pagination } = useDataTableContext();

  return (
    <div className={cn("flex items-center gap-4", className, classList?.root)}>
      <div className="flex items-center gap-1">
        <AnimatePresence mode="wait">
          <motion.h3
            key={pagination.pageIndex}
            {...textBlurAnimationConfig}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
            className="tabular-nums"
          >
            {pagination.pageIndex}
          </motion.h3>
        </AnimatePresence>
        <h3>/</h3>
        <h3 key="page-count" className="tabular-nums">
          {pagination.pageCount}
        </h3>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="soft"
          onClick={pagination.goToFirstPage}
          disabled={!pagination.canGoPreviousPage}
          classList={classList?.["start-button"]}
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="soft"
          onClick={pagination.goToPreviousPage}
          disabled={!pagination.canGoPreviousPage}
          classList={classList?.["previous-button"]}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="soft"
          onClick={pagination.goToNextPage}
          disabled={!pagination.canGoNextPage}
          classList={classList?.["next-button"]}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          size="icon"
          variant="soft"
          onClick={pagination.goToLastPage}
          disabled={!pagination.canGoNextPage}
          classList={classList?.["end-button"]}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
};
