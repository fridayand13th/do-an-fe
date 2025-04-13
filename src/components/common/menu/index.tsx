import { Heading } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '@styles/components/menu.module.scss';

export type TMenu = {
  key: string | number;
  label: string;
  component?: React.ReactNode | string;
};
export type TMenuProps = {
  items: TMenu[];
  defaultSelect?: string;
  children?:
    | React.ReactNode
    | ((value: {
        selectedMenu: TMenu;
        setMenu: (key: TMenu['key']) => void;
      }) => JSX.Element);
  footer?: React.ReactNode;
  dynamic?: boolean;
  handleChange?: Function;
};
export default function Menu({
  items,
  defaultSelect = undefined,
  children,
  footer,
  dynamic = true,
  handleChange,
}: TMenuProps) {
  const [selectedMenu, setSelectedMenu] = useState<TMenu>(
    defaultSelect
      ? items.filter((item) => item.key === defaultSelect)[0]
      : items[0],
  );
  const setInit = () => {
    setSelectedMenu(
      defaultSelect
        ? items.filter((item) => item.key === defaultSelect)[0]
        : items[0],
    );
  };
  useEffect(() => {
    if (dynamic) {
      setInit();
    }
  }, [items]);

  const isInternalAccess = children instanceof Function;

  const setMenu = useCallback((key: TMenu['key']) => {
    const findMenu = items.filter((item) => item.key === key)[0];
    setSelectedMenu(findMenu);
  }, []);

  const handleMenuClick = (_menu: TMenu) => {
    !!handleChange && handleChange(_menu);
    setSelectedMenu(_menu);
  };
  return (
    <>
      {selectedMenu && (
        <>
          <ul className={styles.maxiMenu}>
            {items.map((_menu) => (
              <li
                key={_menu.key}
                className={
                  selectedMenu.key === _menu.key
                    ? `${styles.maxiMenuItem} ${styles.selected}`
                    : styles.maxiMenuItem
                }
                onClick={() => handleMenuClick(_menu)}
              >
                {_menu.label}
              </li>
            ))}
          </ul>

          <section className={styles.maxiMenuContent}>
            {isInternalAccess
              ? React.createElement(children, { selectedMenu, setMenu })
              : selectedMenu.component}
          </section>
        </>
      )}
      {footer && <div className={styles.maxiMenuFooter}>{footer}</div>}
    </>
  );
}
