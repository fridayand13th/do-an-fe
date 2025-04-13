export type TItemListProps<T> = {
  items: T[];
  renderer: (item: T, index: number) => React.ReactNode | JSX.Element | string;
  emptyMessage?: React.ReactNode | JSX.Element | string;
};
