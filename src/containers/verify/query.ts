import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import apis from "@apis/index";

export const verifySignUpToken = () =>
  useMutation<AxiosResponse, Error, string>(
    (token: string) => {
      return apis.requests.VERIFY_SIGN_UP_TOKEN(token);
    },
    {
      retry: false,
    },
  );
export const requestForgotPassword = () =>
  useMutation<AxiosResponse, Error, string>(
    ( email) => {
      return apis.requests.REQUEST_FORGOT_PASSWORD(email);
    },
    {
      retry: false,
    },
  );

export const verifyForgotPasswordToken = () =>
  useMutation<AxiosResponse, Error, string>(
    (token: string) => {
      return apis.requests.VERIFY_FORGOT_PASSWORD_TOKEN(token);
    },
    {
      retry: false,
    },
  );

export const resetPassword = () =>
  useMutation<AxiosResponse, Error, { token: string; password: string }>(
    ({ token, password }) => {
      return apis.requests.RESET_PASSWORD(token,password);
    },
    {
      retry: false,
    },
  );
