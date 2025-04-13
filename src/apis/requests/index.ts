import { IAccount } from "@@types/containers/account";
import { ITask, IUpdateTask } from "@@types/containers/request";
import { TPaginate, TResponseType } from "@@types/forms/common-type";
import axiosInstance from "@apis/instance";
import { invalidateGetResponse } from "@utils/common";
import { AxiosResponse } from "axios";

const GET_LIST_TASK = (query: Record<string, any>) =>
  invalidateGetResponse<TPaginate<ITask>>({
    url: `/tasks`,
    params: query,
  });

const GET_TASK_DETAIL = (id: string): Promise<any> => {
  return axiosInstance.get(`/tasks/${id}/detail`);
};

const DELETE_TASK = (id: string): Promise<any> => {
  return axiosInstance.delete(`/tasks/${id}`);
};

const CREATE_TASK = (
  data: IUpdateTask,
): Promise<AxiosResponse<TResponseType<any>>> => {
  return axiosInstance.post("/tasks", data);
};

const VERIFY_SIGN_UP_TOKEN = (
  token: string,
): Promise<AxiosResponse<TResponseType<string>>> => {
  return axiosInstance.get(`/auth/register/confirm?token=${token}`);
};

const REQUEST_FORGOT_PASSWORD = (
  email: string,
): Promise<AxiosResponse<TResponseType<string>>> => {
  return axiosInstance.post(`/auth/forgot-password`, {
    email: email,
  });
};

const VERIFY_FORGOT_PASSWORD_TOKEN = (
  token: string,
): Promise<AxiosResponse<TResponseType<string>>> => {
  return axiosInstance.get(`/auth/forgot-password/verify-token?token=${token}`);
};

const EDIT_PROFILE = (
  data: IAccount,
): Promise<AxiosResponse<TResponseType<IAccount>>> => {
  return axiosInstance.put(`/users/profile`, data);
};

const RESET_PASSWORD = (
  token: string,
  password: string,
): Promise<AxiosResponse<TResponseType<string>>> => {
  return axiosInstance.post(`/auth/reset-password?token=${token}`, {
    password: password,
  });
};

const CHANGE_PASSWORD = (
  currentPassword: string,
  password: string,
): Promise<AxiosResponse<TResponseType<string>>> => {
  return axiosInstance.post(`/users/change-password`, {
    oldPassword: currentPassword,
    newPassword: password,
  });
};

const UPDATE_TASK_DETAIL = (
  taskId: number,
  data: IUpdateTask,
): Promise<AxiosResponse<TResponseType<any>>> => {
  return axiosInstance.put(`/tasks/${taskId}`, data);
};

export default {
  GET_LIST_TASK,
  GET_TASK_DETAIL,
  CREATE_TASK,
  VERIFY_SIGN_UP_TOKEN,
  REQUEST_FORGOT_PASSWORD,
  VERIFY_FORGOT_PASSWORD_TOKEN,
  EDIT_PROFILE,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  UPDATE_TASK_DETAIL,
  DELETE_TASK,
};
