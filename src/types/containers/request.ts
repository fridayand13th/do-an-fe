export interface ITaskInfo {
  id: number;
  startDate: string;
  endDate: string;
  status: string; // "pending" | "completed" | etc.
  name: string;
  to_do_day: number;
}

export interface ITask {
  toDoDay: number;
  tasks: ITaskInfo[];
}

export interface IUpdateTask {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string | null; // "pending" | "completed" | etc.
}

export interface IPrompt {
  prompt: string;
}

export interface IPromptResponse {
  data: string;
}
