export type TPaginate<T> = {
  currentPage: number;
  totalPage: number;
  items: T[];
  totalCount?: number;
};
