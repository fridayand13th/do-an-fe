import { useEffect } from "react";
import { TMenu, TMenuItem, TSubMenu } from "@@types/constants/menu"; 
import MENU from "@constants/menu";

const useFetchMenuData = (
  data: TSubMenu[] | undefined,
  setMenuItems: React.Dispatch<React.SetStateAction<TMenu[]>>,
) => {
  useEffect(() => {
    const fetchMenuData = async () => {
      if (!data) return;

      const apiMenuItems = MENU.flatMap((menu) =>
        menu.items.filter((item) => item.dynamic),
      );
      const newMenuItems = [...MENU]; 

      await Promise.all(
        apiMenuItems.map((menuItem) =>
          updateMenuItems(menuItem, newMenuItems, data),
        ),
      );

      setMenuItems(newMenuItems);
    };

    fetchMenuData();
  }, [data, setMenuItems]);
};

const updateMenuItems = async (
  menuItem: TMenuItem,
  newMenuItems: TMenu[],
  data: TSubMenu[],
) => {
  try {
    const convertedData = convertData(data, menuItem);

    newMenuItems.forEach((menu) => {
      menu.items = menu.items.map((item) =>
        updateSubMenu(item, menuItem, convertedData),
      );
    });
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};

const convertData = (data: TSubMenu[], menuItem: TMenuItem): TSubMenu[] => {
  return data.map((item) => ({
    subtitle: item.subtitle,
    link: `${menuItem.dynamic?.path ?? ""}/${item.link}`,
  }));
};

const updateSubMenu = (
  item: TMenuItem,
  menuItem: TMenuItem,
  convertedData: TSubMenu[],
): TMenuItem => {
  if (item.menuName === menuItem.menuName) {
    const existingSubMenuItems = item.subMenu.map((sub) => sub.subtitle);
    const uniqueConvertedData = getUniqueConvertedData(
      convertedData,
      existingSubMenuItems,
    );

    if (uniqueConvertedData.length > 0) {
      return {
        ...item,
        subMenu: [
          ...item.subMenu.slice(0, menuItem.dynamic!.index),
          ...uniqueConvertedData,
          ...item.subMenu.slice(menuItem.dynamic!.index),
        ],
      };
    }
  }
  return item;
};

const getUniqueConvertedData = (
  convertedData: TSubMenu[],
  existingSubMenuItems: string[],
): TSubMenu[] => {
  return convertedData.filter(
    (newSubMenuItem) => !existingSubMenuItems.includes(newSubMenuItem.subtitle),
  );
};

export default useFetchMenuData;
