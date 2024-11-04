export type Pagination = {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canGoNextPage: boolean;
  canGoPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPage: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
};
