import { TListTableOptions } from '@@types/containers/list';
import React, { useState } from 'react';

export function useListCheck<
  ItemType extends { id: ItemType['id'] } & Record<string, any>,
  ItemHeaders extends string,
>(
  items: ItemType[],
  checkBoxOptions: Partial<
    TListTableOptions<ItemHeaders, ItemType>['checkBox']
  >,
) {
  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ItemType,
  ) => {
    const setSelectItems = checkBoxOptions?.setSelectItems;
    const selectItems = checkBoxOptions?.selectItems;
    if (!setSelectItems || !selectItems) return;
    const { checked } = e.target;

    if (checked) {
      const isExist = selectItems.find((_item) => _item.id === item.id);
      if (isExist) return;

      setSelectItems((prev) => {
        return [...prev, item];
      });
    } else {
      setSelectItems((prev) => prev.filter((_item) => _item.id !== item.id));
    }
  };

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const setSelectItem = checkBoxOptions?.setSelectItems;
    if (!setSelectItem) return;
    const { checked } = e.target;
    if (checked) setSelectItem(items);
    else setSelectItem([]);
  };

  return {
    handleCheckChange,
    handleAllCheck,
  };
}

export function useListInsert() {
  const [insert, setInsert] = useState<React.ReactNode>(undefined);

  const handleInsertClick = (node: React.ReactNode) => {
    if (insert) return;
    setInsert(node);
  };

  const closeInsert = () => {
    setInsert(undefined);
  };

  return {
    insert,
    handleInsertClick,
    closeInsert,
  };
}
