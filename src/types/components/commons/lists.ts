import {
  TListOptions,
  TListRenderItem,
  TListTableOptions,
} from '@@types/containers/list';
import React from 'react';

interface BaseListProps {
  headers: string[];
}

export interface ListTableProps<ItemType, ItemHeaders> {
  items: ItemType[];
  renderItem: TListRenderItem<ItemType, ItemHeaders>[];
  headerKey?: string;
  columnWidth?: string[];
  options?: TListTableOptions<ItemHeaders, ItemType>;
}

export interface ListAccordionProps<ItemType, ItemHeaders> {
  items: ItemType[];
  headerKey?: string;
  renderItem: TListRenderItem<ItemType, ItemHeaders>[];
  columnWidth?: string[];
  options?: TListOptions<ItemHeaders, ItemType>;
}
