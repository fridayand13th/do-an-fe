import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type TMutationOptions<T> =
  | Omit<
      UseMutationOptions<AxiosResponse<any>, unknown, T, unknown>,
      'mutationFn'
    >
  | undefined;
