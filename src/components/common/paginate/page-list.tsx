import List from "@containers/commons/list";
import ListGrid from "@components/common/lists/grid";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TGridListProps, TListProps } from "@@types/containers/list";
import {
  Box,
  Button,
  Input,
  InputAddon,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Text,
} from "@chakra-ui/react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { getPageNumbers } from "@utils/common";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "@styles/components/page-list.module.scss";
import { useRouter } from "next/router";
import MenuInput from "@components/common/menu-input";
import { AiFillCaretDown } from "react-icons/ai";
import { debounce } from "lodash";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { TItemListProps } from "@@types/components/commons/item-list";
import ItemList from "@components/common/lists/item-list";

type TPageListContext = {
  currentPage: number;
  totalPage: number;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  items: any[];
  take: number;
  pageTakeLocalStorageKey: string;
  setTake: Dispatch<SetStateAction<number>>;
};
type TPageListProviderProps = {
  children: React.ReactNode;
  currentPage: number;
  totalPage: number;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  pageTakeLocalStorageKey?: string;
  items: any[];
};
const PageListContext = createContext<TPageListContext>({
  currentPage: 0,
  totalPage: 0,
  fetchNextPage: () => {
    return new Promise(() => {});
  },
  take: 6,
  pageTakeLocalStorageKey: "pageTakeCount",
  setTake: () => {},
  items: [],
});

export const usePageListContext = () => {
  const context = useContext(PageListContext);
  if (!context)
    throw new Error("usePageListContext must be used within a <Page />");
  return context;
};

function PageListProvider({
  children,
  pageTakeLocalStorageKey = "pageTakeCount",
  ...props
}: TPageListProviderProps) {
  const [take, setTake] = useState<number>(() => {
    if (typeof window !== "undefined") {
      let _take = window.localStorage.getItem(pageTakeLocalStorageKey);

      if (!_take) _take = process.env.NEXT_PUBLIC_PAGE_DEFAULT_TAKE!;

      return +_take || 15;
    } else {
      return 15;
    }
  });
  const value = useMemo(
    () => ({ ...props, pageTakeLocalStorageKey, take, setTake }),
    [props.items, props.totalPage, props.currentPage, take, setTake],
  );
  return (
    <PageListContext.Provider value={value}>
      {children}
    </PageListContext.Provider>
  );
}

function PageList<
  ItemType extends { id: ItemType["id"] } & Record<string, any>,
  ItemHeaders extends string,
>({ ...props }: Omit<TListProps<ItemType, ItemHeaders>, "items">) {
  const { items } = usePageListContext();
  return <List items={items} {...props} />;
}

function PageListGrid<
  T extends { id: T["id"] } & Record<string, any>,
  K extends string,
>({ ...props }: Omit<TGridListProps<T, K>, "items">) {
  const { items } = usePageListContext();
  return <ListGrid items={items} {...props} />;
}

function PageItemList<T extends { id: string | number } & Record<string, any>>({
  renderer,
  ...props
}: Omit<TItemListProps<T>, "items">) {
  const { items } = usePageListContext();
  return <ItemList items={items} renderer={renderer} {...props} />;
}

function Pagination() {
  const { currentPage, totalPage, fetchNextPage, take } = usePageListContext();
  const router = useRouter();
  const pageNumbers =
    totalPage < 5
      ? Array(totalPage)
          .fill(0)
          .map((_, idx) => idx + 1)
      : getPageNumbers(currentPage, totalPage);
  const handlePageChange = async (num: number) => {
    if (num === currentPage) return;
    await Promise.all([
      router.push(
        { pathname: router.pathname, query: { ...router.query, page: num } },
        undefined,
        { shallow: true },
      ),
      fetchNextPage({ pageParam: { page: num, take } }),
    ]);
  };

  const handlePrevPage = (isDouble: boolean) => {
    if (isDouble) {
      handlePageChange(1);
    } else {
      const firstNumber = pageNumbers[0];
      const prevPageIndex = firstNumber > 1 ? firstNumber - 1 : 1;
      handlePageChange(prevPageIndex);
    }
  };

  const handleNextPage = (isDouble: boolean) => {
    if (isDouble) {
      handlePageChange(totalPage);
    } else {
      const lastNumber = pageNumbers[pageNumbers.length - 1];
      const nextPageIndex =
        lastNumber === totalPage ? totalPage : lastNumber + 1;
      handlePageChange(nextPageIndex);
    }
  };
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        {currentPage !== 1 && (
          <div className={`${styles.paginationControlWrapper}`}>
            <>
              <div
                className={styles.paginationIconWrapper}
                onClick={() => handlePrevPage(true)}
              >
                <RxDoubleArrowLeft size="18" />
              </div>
              <div
                className={styles.paginationIconWrapper}
                onClick={() => handlePrevPage(false)}
              >
                <MdKeyboardArrowLeft size="18" />
              </div>
            </>
          </div>
        )}
        <ul className={styles.paginationNumberContainer}>
          {pageNumbers.map((num) => (
            <li
              key={num}
              className={`${styles.paginationNumber}${
                currentPage === num ? " " + styles.select : ""
              }`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </li>
          ))}
        </ul>
        {totalPage > currentPage && (
          <div className={styles.paginationControlWrapper}>
            <div
              className={styles.paginationIconWrapper}
              onClick={() => handleNextPage(false)}
            >
              <MdKeyboardArrowRight size="18" />
            </div>
            <div
              className={styles.paginationIconWrapper}
              onClick={() => handleNextPage(true)}
            >
              <RxDoubleArrowRight size="18" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Take = ({ max = 60 }: { max?: number }) => {
  const {
    fetchNextPage,
    currentPage,
    totalPage,
    take,
    setTake,
    pageTakeLocalStorageKey,
  } = usePageListContext();
  const handleTakeChange = (
    eventOrNumber: React.ChangeEvent<HTMLInputElement> | number,
  ) => {
    const value =
      typeof eventOrNumber === "number"
        ? eventOrNumber
        : eventOrNumber.target.value;
    if (take === value || !take) return;

    const totalMinData = totalPage * take;
    const isMaintain = +value * currentPage < totalMinData;
    const pageParamObject = isMaintain
      ? { page: currentPage, take: value }
      : { take: value };
    setTake(+value);
    localStorage.setItem(pageTakeLocalStorageKey, "" + value);

    fetchNextPage({
      pageParam: pageParamObject,
    });
  };

  const debounceOnchangeTake = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!value || +value < 1) return handleTakeChange(15);
      if (+value > max) return handleTakeChange(max);
      handleTakeChange(+value);
    },
    300,
  );

  return (
    <div>
      <Menu>
        <MenuButton className={styles.paginationTakeButton}>
          {take && <>Hiển thị {take} mục mỗi trang</>}
          <span className={styles.paginationTakeButtonIcon}>
            <AiFillCaretDown />
          </span>
        </MenuButton>
        <MenuList whiteSpace="nowrap" zIndex={2}>
          {max > 15 && (
            <MenuItem
              className={styles.paginationTakeItem}
              onClick={() => handleTakeChange(15)}
            >
              Hiển thị 15 mục mỗi trang
            </MenuItem>
          )}
          {max > 30 && (
            <MenuItem
              className={styles.paginationTakeItem}
              onClick={() => handleTakeChange(30)}
            >
              Hiển thị 30 mục mỗi trang
            </MenuItem>
          )}
          {max > 60 && (
            <MenuItem
              className={styles.paginationTakeItem}
              onClick={() => handleTakeChange(60)}
            >
              Hiển thị 60 mục mỗi trang
            </MenuItem>
          )}
          <MenuDivider />
          <MenuInput inputOnChange={debounceOnchangeTake} max={max} />
        </MenuList>
      </Menu>
    </div>
  );
};

function Search({
  searchField,
}: {
  searchField: { field: string; label: string }[];
}) {
  const { take, fetchNextPage } = usePageListContext();
  const router = useRouter();
  const { register, getValues } = useForm({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });
  const handleSearchSubmit = async () => {
    const { search } = getValues();
    fetchNextPage({
      pageParam: {
        take: take || 15,
        search,
      },
    });
    router.push(
      {
        pathname: router.pathname,
        query:
          !search || search === ""
            ? { ...router.query }
            : { ...router.query, search },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <Box>
      <Box position="relative">
        <InputGroup size="sm" variant="outline">
          <InputAddon background="#fff" boxSizing="border-box" padding="0">
            {searchField.length > 1 ? (
              <Select
                width="6rem"
                border="none"
                {...register("search")}
                _focus={{
                  outline: "none",
                  borderColor: "none",
                  boxShadow: "none",
                }}
              >
                {searchField.map((field) => (
                  <option key={field.field} value={field.field}>
                    {field.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Text p="0 1rem" fontSize="0.875rem">
                {searchField[0].label}
              </Text>
            )}
          </InputAddon>
          <Input
            type="text"
            boxSizing="border-box"
            {...register("search")}
            borderLeftRadius="0"
            maxWidth="13rem"
          />
          <InputRightAddon background="#fff" boxSizing="border-box" px="0">
            <Button
              p="0"
              m="0"
              background="transparent"
              border="none"
              cursor="pointer"
              _hover={{ background: "none" }}
              onClick={() => {
                handleSearchSubmit();
              }}
            >
              <FaSearch />
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </Box>
  );
}

const Page = Object.assign(PageListProvider, {
  List: PageList,
  ListGrid: PageListGrid,
  ItemList: PageItemList,
  Pagination,
  Take,
  Search,
});
export default Page;
