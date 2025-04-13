import { TResponseType } from '@@types/forms/common-type';
import { UseToastOptions } from '@chakra-ui/react';
import { MutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type TMutationToastOptions<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
> = Omit<UseToastOptions, 'description'> & {
  successDescription?:
    | UseToastOptions['description']
    | ((
        response: TData,
        values: TVariables,
        context?: TContext,
      ) => string | React.ReactNode | JSX.Element);
  errorDescription?:
    | string
    | ((error: TError, values: TVariables, context?: TContext) => string);
};

export type TUseMutationProps<
  TData = AxiosResponse<TResponseType<any>>,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
> = {
  mutationOptions?: MutationOptions<TData, TError, TVariables, TContext>;
  toastOptions?: TMutationToastOptions<TData, TError, TVariables, TContext>;
  fetchingTargetName?: string;
  replaceFetchingData?: boolean;
  newFetchingData?: boolean;
  queryKey?: any[][];
};
