import { TMeInitialState } from "@@types/stores/me";
import queryKeys from "@constants/query-keys";
import { meSelector, storeMeInfo } from "@stores/me";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import axiosInstance from "@apis/instance";

export default function useMe() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleStoreMeInfo = (me: Partial<TMeInitialState>) => {
    dispatch(storeMeInfo(me));
  };
  const { data, isLoading, isFetching, refetch } = useQuery(
    [...queryKeys.me],
    () => axiosInstance.get("/users/profile"),
    {
      onSuccess: (response) => {
        handleStoreMeInfo(response.data.data);
      },
      onError: () => {
        signOut();
        router.replace("/sign-in");
      },
    },
  );

  const me = useSelector(meSelector);

  return { ...me };
}
