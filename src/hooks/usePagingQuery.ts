import { TResponseType } from "@@types/forms/common-type";
import { TPaginate } from "@@types/forms/paginate";
import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type TUsePagingQueryResponseType<T> = {
  currentPage: number;
  totalPage: number;
  items: T[];
};

type TQuery<T> = TPaginate<T>;

export type TUsePagingQueryProps<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TPaginate<T>, QueryKey>;
  options?:
    | Omit<
        UseInfiniteQueryOptions<TPaginate<T>, AxiosError<unknown>>,
        "queryKey" | "queryFn"
      >
    | undefined;
  filters?: Record<string, any>;
};

export default function usePagingQuery<T extends Record<string, any>>({
  queryKey,
  queryFn,
  options,
  pageTakeLocalStorageKey = "pageTakeCount",
  filters = {},
}: TUsePagingQueryProps<T> & { pageTakeLocalStorageKey?: string }) {
  const router = useRouter();
  const [init, setInit] = useState<boolean>(true);
  const _queryKey = queryKey;
  const query = useInfiniteQuery<TPaginate<T>, AxiosError<unknown>>(
    _queryKey,
    async (context) => {
      if (init) {
        if (router.query.page) {
          context.pageParam = { page: router.query.page };
        } else {
          context.pageParam = { page: 1 };
        }

        const take =
          localStorage.getItem(pageTakeLocalStorageKey) ||
          process.env.NEXT_PUBLIC_PAGE_DEFAULT_TAKE;

        if (take && isNaN(+take)) {
          localStorage.removeItem(pageTakeLocalStorageKey);
        }

        context.pageParam = {
          ...context.pageParam,
          take,
        };
      } else {
        if (!context.pageParam?.take) {
          context.pageParam = {
            ...context.pageParam,
            take:
              localStorage.getItem(pageTakeLocalStorageKey) ||
              process.env.NEXT_PUBLIC_PAGE_DEFAULT_TAKE,
            page: router.query.page || 1,
          };
        }
      }
      const response = await queryFn(context);
      return response;
    },
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (!lastPage) return false;
        return lastPage.currentPage < lastPage.totalPage;
      },
    },
  );

  useEffect(() => {
    setInit(false);

    return () => {
      query.remove();
    };
  }, []);

  const currentData =
    query.data?.pages && query.data?.pages[query.data.pages.length - 1];
  return { ...query, currentData, queryKey: _queryKey, error: query.error };
}
