import { TItemListProps } from '@@types/components/commons/item-list';

export default function ItemList<
  T extends { id: string | number } & Record<string, any>,
>({ items, renderer, emptyMessage }: TItemListProps<T>) {
  return (
    <>
      {items?.length > 0
        ? items?.map((item, index) => (
            <div key={item.id}>{renderer(item, index)}</div>
          ))
        : emptyMessage ?? <></>}
    </>
  );
}
