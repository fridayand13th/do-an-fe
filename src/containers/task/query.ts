import queryKeys from "@constants/query-keys";
import apis from "@apis/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TResponseType } from "@@types/forms/common-type";
import { AxiosResponse } from "axios";
import { ITask, ITaskInfo, IUpdateTask } from "@@types/containers/request";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PER_PAGE } from "@constants/paginate";

export type TPaginate<T> = {
  currentPage: number;
  totalPage: number;
  items: T[];
  totalCount?: number;
};

export const getListTask = ({
  startDate,
  endDate,
  page = DEFAULT_CURRENT_PAGE,
  take = 31,
}: {
  startDate: string;
  endDate: string;
  page?: number;
  take?: number;
}) =>
  useQuery<TPaginate<ITask>>(queryKeys.listTask.list, () =>
    apis.requests.GET_LIST_TASK({
      startDate,
      endDate,
      page,
      take,
    }),
  );

export const getTaskDetail = (taskId?: string) =>
  useQuery<AxiosResponse<TResponseType<ITaskInfo>>>(
    [...queryKeys.listTask.detail, taskId],
    () => apis.requests.GET_TASK_DETAIL(taskId!),
    {
      enabled: !!taskId,
    },
  );

export const useCreateTask = () =>
  useMutation<AxiosResponse, Error, IUpdateTask>((data: IUpdateTask) =>
    apis.requests.CREATE_TASK(data),
  );

export const updateTaskDetail = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse,
    Error,
    { taskId: number; data: IUpdateTask }
  >(({ taskId, data }) => apis.requests.UPDATE_TASK_DETAIL(taskId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.listTask.update]);
    },
  });
};

export const deleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => apis.requests.DELETE_TASK(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.listTask.delete });
    },
  });
};

export const searchTask = ({
  name,
  status,
  startDate,
  endDate,
  page = DEFAULT_CURRENT_PAGE,
  take = 10,
}: {
  name?: string;
  status?: string;
  startDate: string;
  endDate: string;
  page?: number;
  take?: number;
}) =>
  useQuery<TPaginate<ITaskInfo>>(queryKeys.listTask.search, () =>
    apis.requests.SEARCH_TASKS({
      name,
      status,
      startDate,
      endDate,
      page,
      take,
    }),
  );
