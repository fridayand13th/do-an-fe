import { IPrompt } from "@@types/containers/request";
import apis from "@apis/index";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useCRUDTaskByGemini = () =>
  useMutation<AxiosResponse, Error, IPrompt>((data: IPrompt) =>
    apis.requests.CRUD_TASK_BY_GEMINI(data),
  );
