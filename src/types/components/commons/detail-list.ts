export type TDetailData = {
  [key: string]: any;
};
export type TDetailCustomValue<T> = {
  [k: keyof TDetailData]: {
    render: (data: T) => any;
  };
};
export type TDetailOptions<T> = {
  customValues: TDetailCustomValue<T>;
};

export type TDetailListProps<T extends TDetailData> = {
  data: T;
  showItems: (keyof T | string)[];
  headerKey?: string;
  detailListOptions?: Partial<TDetailOptions<T>>;
};
