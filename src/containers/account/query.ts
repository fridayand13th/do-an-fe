import { IAccount } from "@@types/containers/account";
import apis from "@apis/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const editProfileRequest = () =>
  useMutation<AxiosResponse, Error, IAccount>((data: IAccount) =>
    apis.requests.EDIT_PROFILE(data),
  );

export const changePassword = () =>
  useMutation<
    AxiosResponse,
    Error,
    { currentPassword: string; password: string }
  >(({ currentPassword, password }) => {
    return apis.requests.CHANGE_PASSWORD(currentPassword, password);
  });
