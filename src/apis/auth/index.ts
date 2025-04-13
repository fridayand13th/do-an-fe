import { TSignIn } from "@@types/forms/sign-in";
import { TSignUp } from "@@types/forms/sign-up";
import axiosInstance from "@apis/instance";

const LOGIN = (body: TSignIn) => axiosInstance.post(`/auth/login`, body);

const REGISTER = (body: TSignUp) => axiosInstance.post(`/auth/register`, body);

export { LOGIN, REGISTER };
