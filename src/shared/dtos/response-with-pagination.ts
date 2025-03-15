export type ResponseWithPagination<T> = {
  data: T[];
  total: number;
  page: number;
  per_page: number;
};
