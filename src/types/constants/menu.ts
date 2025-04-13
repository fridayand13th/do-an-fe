import { IconType } from 'react-icons';

export type TSubMenu = { subtitle: string; link: string };
export type TMenuItem = {
  icon: IconType;
  menuName: string;
  dynamic?: TMenuDynamic;
  auth?: number;
  defaultPath: string;
  subMenu: TSubMenu[];
};
export type TMenuDynamic = {
  apiLink: string;
  index: number;
  path?: string
}

export type TMenu = {
  category: string;
  showCategory?: boolean;
  items: TMenuItem[];
};
