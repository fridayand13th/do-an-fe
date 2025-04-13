import {
  GridItemProps,
  GridProps,
  TableCellProps,
  TextProps,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

export type TListTypes = 'table' | 'accordion' | 'grid';

export type TListItemHeaderGroup = { key: string[]; title: string };

export type THeadersType = string[];

export type TListOptionEdit<ItemHeaders> = {
  onSubmitValid: (values: any) => any;
  defaultValues: ItemHeaders[];
  editableKeys: {
    key: ItemHeaders;
    Component:
      | React.ReactElement
      | ((value: UseFormReturn['register'], errors: any) => React.ReactNode);
    options?: RegisterOptions<any, any>;
  }[];
  fetchingId?: number | string | undefined;
  fetchingTargetName?: string;
};
// | ((value: UseFormReturn['register'], errors: any) => React.ReactNode)
export type TListTableOptions<ItemHeaders, ItemType> = {
  headerHide?: boolean;
  renderItems?: {
    key: ItemHeaders;
    className?: React.ComponentProps<'div'>['className'];
    style?: React.StyleHTMLAttributes<'div'>;
    render: (item: ItemType) => React.ReactNode | undefined | string;
  }[];
  checkBox?: {
    use: boolean;
    position?: number;
    selectItems: ItemType[];
    setSelectItems: Dispatch<SetStateAction<ItemType[]>>;
  };
  lineHoverColor?: string;
  controls?: (React.ReactNode | ((item: ItemType) => React.ReactNode))[];
  insertRow?: (onClose: () => void) => React.ReactNode;
  edit?: TListOptionEdit<ItemHeaders>;
};

export type TListRenderItem<ItemType, ItemHeaders> = {
  key: ItemHeaders;
  width?: string;
  cellStyle?: TableCellProps;
  render?: (item: ItemType) => React.ReactNode | undefined | string;
};

export type TListOptions<ItemHeaders, ItemType> = {
  renderCondition?: (item: ItemType) => boolean;
  renderChild?: (item: ItemType, isExpanded: boolean) => React.ReactNode;
  customRenderChild?: TCustomRender<ItemType, ItemHeaders>[];
} & TListTableOptions<ItemHeaders, ItemType>;

export type TListProps<ItemType, ItemHeaders> = {
  items: ItemType[];
  headerKey?: string;
  columnWidth?: string[];
  renderItem: TListRenderItem<ItemType, ItemHeaders>[];
  options?: TListOptions<ItemHeaders, ItemType>;
};

export type TGridListProps<ItemType, ItemHeaders extends string> = {
  items: ItemType[];
  headerKey?: string;
  listGridProps?: Partial<GridProps>;
  listGridItemProps?: Partial<GridItemProps>;
  itemGridProps?: Partial<GridProps>;
  itemGridTemplate: ItemHeaders[][];
  tabletGridTemplate?: ItemHeaders[][];
  mobileGridTemplate?: ItemHeaders[][];
  itemGridItemProps?: Partial<GridItemProps>;
  templateColumns?: string;
  tabletTemplateColumns?: string;
  mobileTemplateColumns?: string;
  customRenderItems?: TCustomRender<ItemType, ItemHeaders>[];
  options?: TGridListOptions<ItemType, ItemHeaders>;
  type?: 'table' | 'card';
  itemStyles?: { [key in ItemHeaders]?: GridItemProps } & {
    [key: string]: GridItemProps;
  };
  emptyMessage?: string;
};

type TCustomRender<ItemType, ItemHeaders> = {
  key: ItemHeaders;
  render: (
    item: ItemType,
    index: number,
  ) => React.ReactNode | Element | JSX.Element | undefined | string;
};

export type TGridListOptions<ItemType, ItemHeaders> = {
  edit?: TListOptionEdit<ItemHeaders>;
  controls?: (React.ReactNode | ((item: ItemType) => React.ReactNode))[];
  checkBox?: {
    position?: number;
    selectItems: ItemType[];
    setSelectItems: Dispatch<SetStateAction<ItemType[]>>;
  };
  renderChild?: (item: ItemType, isExpanded: boolean) => React.ReactNode;
};
