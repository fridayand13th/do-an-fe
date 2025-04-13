import { TResponseType } from "@@types/forms/common-type";
import axiosInstance from "@apis/instance";
import { AxiosRequestConfig } from "axios";
import moment from "moment";

export const setComma = (value: string | number): string => {
  if (!value || value === "0") return "0";
  if (typeof value === "string" && value.length <= 3) return value;
  if (typeof value === "number" && value < 1000) return "" + value;
  const parts = value?.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const debounce = (callback: (...props: any[]) => any, limit = 300) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, limit);
  };
};

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    endPage += Math.abs(startPage) + 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    startPage -= endPage - totalPages;
    endPage = totalPages;
  }

  endPage = endPage ? endPage : 1;
  startPage = startPage ? startPage : 1;

  const pageNumbers = Array(endPage - startPage + 1)
    .fill(0)
    .map((_, idx) => startPage + idx);

  return pageNumbers;
};

export const invalidateGetResponse = async <T>({
  url,
  params,
  options = {},
  errorMessage,
}: {
  url: string;
  params?: Record<string, any>;
  options?: AxiosRequestConfig;
  errorMessage?: string;
}) => {
  const { data, status } = await axiosInstance.get<TResponseType<T>>(url, {
    ...options,
    params,
  });
  if (status !== 200 || !data) throw errorMessage || data.message;

  return data.data!;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return moment(dateObj).format("YYYY-MM-DD");
};

export const formatHour = (date: string) => {
  const dateObj = new Date(date);
  return moment(dateObj).format("HH:mm");
};

export const formatDateWithHour = (date: string) => {
  const dateObj = new Date(date);
  return moment(dateObj).format("YYYY-MM-DD HH:mm");
};

export const getPointsColor = (points: number) => {
  if (points < 0) return "red.500";
  return "green.500";
};

export const truncateText = (
  text: string | null = "",
  maxLength: number = 20,
) => {
  if (!text) {
    return "";
  }

  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }

  return text;
};

export const replaceKeywordWithKey = (
  str: string,
  key: string | undefined,
  keyword: string,
): string => {
  if (!key) return str;
  const regex = new RegExp(keyword, "g");
  return str.replace(regex, key);
};

export const getErrorMessage = (error: any): string => {
  let defaultMessage = "Đã xảy ra lỗi. Vui lòng thử lại sau.";

  if (error?.response) {
    if (error.response.status === 400) {
      return error.response.data?.message || "Yêu cầu không hợp lệ.";
    }
  }

  return defaultMessage;
};

export const getColorSchemeFromType = (type: string) => {
  const colorSchemes = [
    "red",
    "green",
    "blue",
    "purple",
    "yellow",
    "orange",
    "teal",
    "cyan",
    "pink",
  ];

  let hash = 0;
  for (let i = 0; i < type.length; i++) {
    hash = type.toLocaleLowerCase().charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colorSchemes.length;
  return colorSchemes[colorIndex];
};

export function decodeJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
  return JSON.parse(jsonPayload);
}
