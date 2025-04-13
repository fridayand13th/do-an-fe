import { TResponseType } from '@@types/forms/common-type';
import {
  UseInfiniteQueryOptions,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

export type TUsePaginQueryProps<T> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<
    AxiosResponse<
      TResponseType<{ currentPage: number; totalPage: number; items: T[] }>
    >,
    QueryKey
  >;
  options?:
    | Omit<
        UseInfiniteQueryOptions<
          AxiosResponse<
            TResponseType<{
              currentPage: number;
              totalPage: number;
              items: T[];
            }>
          >,
          AxiosError<unknown, any>
        >,
        'queryKey' | 'queryFn'
      >
    | undefined;
};
