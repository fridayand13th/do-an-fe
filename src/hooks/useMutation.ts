import { TResponseType } from '@@types/forms/common-type';
import { TUseMutationProps } from '@@types/hooks/use-mutation';
import { useToast } from '@chakra-ui/react';
import {
  MutationFunction,
  Updater,
  useMutation as useReactQueryMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

export default function useMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  {
    mutationOptions,
    toastOptions,
    fetchingTargetName = 'id',
    replaceFetchingData,
    newFetchingData,
    queryKey,
  }: TUseMutationProps<TData, TError, TVariables, TContext>,
) {
  const [fetchingId, setFetchingId] = useState<number | string | undefined>(
    undefined,
  );
  const queryClient =
    (replaceFetchingData || newFetchingData) && useQueryClient();
  const toast = useToast({
    variant: 'solid',
    position: 'top-right',
    isClosable: true,
    duration: 3000,
  });
  const mutation = useReactQueryMutation<TData, TError, TVariables, TContext>(
    mutationFn,
    {
      ...mutationOptions,
      onMutate: (values) => {
        if (
          values &&
          typeof values === 'object' &&
          values.hasOwnProperty(fetchingTargetName)
        ) {
          setFetchingId((values as any)[fetchingTargetName]);
        }
        const _values =
          mutationOptions?.onMutate && mutationOptions?.onMutate(values);
        return _values;
      },
      onSuccess: (response, variables, context) => {
        setFetchingId(undefined);
        const code = (response as any)?.data?.code || undefined;
        toast({
          status: '' + code === '200' ? 'success' : 'warning',
          description:
            typeof toastOptions?.successDescription === 'function'
              ? toastOptions?.successDescription(response, variables, context)
              : toastOptions?.successDescription || '',
          ...toastOptions,
        });

        if (queryClient && (response as TResponseType<any>).data.code === 200) {
          if (!queryKey) throw new Error('required queryKey');
          queryKey.map((_key) => {
            if (newFetchingData) {
              queryClient.invalidateQueries(_key);
            } else if (replaceFetchingData) {
              queryClient.setQueryData(
                _key,
                (prevData: Updater<AxiosResponse<TResponseType<any>>, any>) => {
                  let data;
                  const PageNumber = prevData.pages.length - 1;
                  if ('pages' in prevData) {
                    data =
                      prevData.pages[PageNumber]?.data?.data?.items ||
                      prevData.pages[PageNumber]?.items;
                  } else {
                    data = prevData.data.data;
                  }

                  const replaceData = data.map((_prev: any) => {
                    return _prev[fetchingTargetName] ===
                      (response as TResponseType<any>).data.data?.item[
                        fetchingTargetName
                      ]
                      ? (response as TResponseType<any>).data.data?.item
                      : _prev;
                  });

                  let returnValue = prevData;
                  if ('pages' in prevData) {
                    if (returnValue.pages[PageNumber]?.items)
                      returnValue.pages[PageNumber].items = replaceData;
                    else if (returnValue.pages[PageNumber]?.data?.data?.items)
                      returnValue.pages[PageNumber].data.data.items =
                        replaceData;
                  } else {
                    returnValue = {
                      ...prevData,
                      data: {
                        ...prevData.data,
                        data: replaceData,
                      },
                    };
                  }

                  return returnValue;
                },
              );
            }
          });
        }

        mutationOptions?.onSuccess &&
          mutationOptions.onSuccess(response, variables, context);
      },
      onError: (error, variables, context) => {
        toast({
          description:
            typeof toastOptions?.errorDescription === 'function'
              ? toastOptions?.errorDescription(error, variables, context)
              : toastOptions?.errorDescription || '에러가 발생했습니다',
          status: 'error',
        });
        mutationOptions?.onError &&
          mutationOptions.onError(error, variables, context);
        setFetchingId(undefined);
      },
    },
  );

  return { mutation, fetchingId };
}
