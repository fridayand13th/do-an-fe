import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { NextjsIcon } from "@components/icons";
import MENU from "@constants/menu";
import useMobile from "@hooks/useMobile";
import useNavigator from "@hooks/useNavigator";
import useSidebar from "@hooks/useSidebar";
import { TMenu } from "@@types/constants/menu";
import { meSelector } from "@stores/me";
import { navigatorSelector } from "@stores/navigator";
import styles from "@styles/components/nav.module.scss";

function getItem(
  label: React.ReactNode,
  key?: React.Key | null | string,
  icon?: React.ReactNode,
  children?: {
    label: React.ReactNode;
    key?: React.Key | null | string;
    icon?: React.ReactNode;
    children?: undefined | any;
  }[],
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function Nav() {
  const { avtUrl, email } = useSelector(meSelector);
  const [navShow, setNavShow] = useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined | null>(null);
  const [selectMenu, setSelectMenu] = useState<string[]>([]);
  const { pathname, events } = useRouter();
  const { storeNavigator } = useNavigator();
  const { category, path } = useSelector(navigatorSelector);
  const [menuItems, setMenuItems] = useState<TMenu[]>(MENU);
  const isMobile = useMobile();
  const { isSidebarOpen, close, open } = useSidebar();

  const memoizedMenuItems = useMemo(() => {
    return menuItems.map((menu) => ({
      ...menu,
      items: menu.items.map((_menu) =>
        getItem(
          _menu.subMenu.length > 0 ? (
            <span className={styles.navLabel}>{_menu.menuName}</span>
          ) : (
            <Link
              href={_menu.defaultPath}
              className={styles.link}
              legacyBehavior
            >
              <button
                className={styles.navLabel}
                onClick={() =>
                  handleNavClick({
                    category: menu.category,
                    path: _menu.menuName,
                  })
                }
              >
                {_menu.menuName}
              </button>
            </Link>
          ),
          _menu.defaultPath,
          <_menu.icon className={styles.navIcon} />,
          _menu.subMenu.length > 0
            ? _menu.subMenu.map((_subMenu) =>
                getItem(
                  <Link
                    href={_subMenu.link}
                    legacyBehavior
                    className={styles.link}
                  >
                    <button
                      onClick={() =>
                        handleNavClick({
                          category: menu.category,
                          path: _subMenu.subtitle,
                        })
                      }
                      className={styles.navButton}
                    >
                      {_subMenu.subtitle}
                    </button>
                  </Link>,
                  _subMenu.link,
                ),
              )
            : undefined,
        ),
      ),
    }));
  }, [menuItems]);

  const handleNavClick = (navProps: { category?: string; path?: string }) => {
    storeNavigator(navProps);
  };

  const defaultIndex = useMemo(() => {
    const _menuItems = memoizedMenuItems.map((item) => item.items).flat();
    const pathnames = pathname.split("/").filter((path) => path !== "");
    const targetMenu = _menuItems.findIndex(
      (menu) => menu.key === "/" + pathnames[0],
    );
    return targetMenu > -1 ? [targetMenu] : undefined;
  }, [memoizedMenuItems, pathname]);

  useEffect(() => {
    const pathnames = pathname.split("/").filter((path) => path !== "");
    if (!category && !path) {
      const navMenu = MENU.reduce((acc, item) => {
        const findedMenu = item.items.find(
          (_item) => _item.defaultPath === "/" + pathnames[0],
        );
        if (findedMenu) {
          acc["category"] = item.category;
          const findedPath = findedMenu.subMenu.find(
            (sub) => sub.link === "/" + pathnames.join("/"),
          );
          acc["path"] = findedPath?.subtitle;
          return acc;
        }
        return acc;
      }, {} as any);

      storeNavigator({
        category: navMenu.category,
        path: navMenu.path,
      });
    }

    setSelectMenu(pathnames);
  }, [pathname]);
  useEffect(() => {
    if (!isMobile) {
      open();
    } else {
      close();
    }
  }, [isMobile]);
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) {
        close();
      }
    };
    events.on("routeChangeStart", handleRouteChange);

    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [isMobile, events]);
  useEffect(() => {
    if (avtUrl !== null) {
      setAvatarSrc(avtUrl);
    }
  }, [avtUrl]);

  return (
    isSidebarOpen && (
      <nav
        className={`${styles.navContainer}${navShow ? " " + styles.open : ""}`}
      >
        <div className={styles.navWrapper}>
          <div className={styles.navHeaderLogo}>
            <Link href="/dashboard">
              <img
                src="/images/Untitled-222.png"
                className="h-[90px] w-[120px] cursor-pointer"
                alt="Friday"
              />
            </Link>
          </div>
          <div className={styles.navHeader}>
            <div className={styles.navHeaderWrapper}>
              {avatarSrc !== null ? (
                <Avatar
                  size="xl"
                  src={avatarSrc}
                  bg={"blue.500"}
                  color={"white"}
                  mt={10}
                />
              ) : (
                <Spinner size="xl" color="blue.500" my={10} />
              )}
              <a href={`mailto:${email}`} className={styles.navEmail}>
                {email}
              </a>
            </div>
          </div>
          <div
            className={`${styles.navContent}${
              navShow ? " " + styles.show : ""
            }`}
          >
            <Accordion as="ul" defaultIndex={defaultIndex} allowToggle={true}>
              {memoizedMenuItems.map((menu) => (
                <div key={menu.category}>
                  {menu.showCategory && (
                    <p className={styles.navMenuCategory}>{menu.category}</p>
                  )}
                  {menu.items.map((item) => (
                    <li key={item.key} className={styles.parentMenuItem}>
                      {item.children ? (
                        <AccordionItem
                          border="none"
                          w="100%"
                          className={styles.parentMenu}
                        >
                          <AccordionButton
                            className={`${styles.parentMenuButton} ${
                              "/" + selectMenu[0] === item.key
                                ? "bg-red-500"
                                : ""
                            }`}
                          >
                            <div className={styles.parentMenuButtonWrapper}>
                              {item.icon}
                              {item.label}
                              <AccordionIcon
                                className={styles.parentMenuIcon}
                              />
                            </div>
                          </AccordionButton>
                          <AccordionPanel
                            padding="0"
                            className={styles.menuPanel}
                          >
                            <ul className={styles.childrenMenuList}>
                              {item.children.map((child) => (
                                <li
                                  key={child.key}
                                  className={`${styles.childrenMenu} ${
                                    "/" + selectMenu[0] === item.key &&
                                    "/" + selectMenu[1] === child.key
                                      ? "bg-blue-300"
                                      : ""
                                  }`}
                                >
                                  <span className={styles.childrenMenuLabel}>
                                    {child.label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </AccordionPanel>
                        </AccordionItem>
                      ) : (
                        <div
                          className={`${styles.parentMenu} ${
                            styles.noChildren
                          } ${
                            "/" + selectMenu[0] === item.key ? "bg-red-500" : ""
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </div>
                      )}
                    </li>
                  ))}
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </nav>
    )
  );
}
