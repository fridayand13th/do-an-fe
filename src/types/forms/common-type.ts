export type TResponseType<T> = {
  code: number;
  message?: string;
  data?: T;
};

export interface BaseGetType {
  id: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type TPaginate<T> = {
  currentPage: number;
  totalPage: number;
  totalCount?: number;
  items: T[];
};
