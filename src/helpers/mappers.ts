import { FILTER_TYPES } from "constants/statusFilterTypes";
import {
  AddEditTaskEntity,
  SearchFormEntity,
  TaskEntity,
  TasksStatsEntity,
} from "domains/Task.entity";
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  GetTaskResponse,
  PostTaskRequest,
  UpdateTaskRequest,
} from "http/model";

export const mapToExternalParams = (
  params?: SearchFormEntity
): GetAllTasksQuery | undefined => {
  if (!params) return undefined;

  const { searchValue, filterType } = params;
  let isCompleted = undefined;

  if (filterType === FILTER_TYPES.DONE) isCompleted = true;
  else if (filterType === FILTER_TYPES.ACTIVE) isCompleted = false;

  return {
    isImportant: filterType === FILTER_TYPES.IMPORTANT ? true : undefined,
    name_like: searchValue ?? undefined,
    isCompleted,
  };
};

export const mapToInternalTasks = (
  tasks: GetAllTasksResponse
): TaskEntity[] => {
  const internalTasks: TaskEntity[] = [];

  tasks.forEach((task) => {
    if (task.id) {
      internalTasks.push({
        name: task.name || "Неизвестно",
        id: String(task.id),
        info: task.info || "Неизвестно",
        isImportant: task.isImportant || false,
        isDone: task.isCompleted || false,
      });
    }
  });

  return internalTasks;
};

export const getInternalInfo = (
  tasks: GetAllTasksResponse
): TasksStatsEntity => {
  const total = tasks.length;
  const anotherStats = tasks.reduce(
    (acc, task) => {
      return {
        important: task.isImportant ? acc.important + 1 : acc.important,
        done: task.isCompleted ? acc.done + 1 : acc.done,
      };
    },
    {
      important: 0,
      done: 0,
    }
  );

  return {
    total,
    ...anotherStats,
  };
};
export const getExternalTask = (task: GetTaskResponse): TaskEntity => {
  const internalTask: TaskEntity = {
    name: "",
    id: "",
    info: "",
    isImportant: false,
    isDone: false,
  };
  if (task.id) {
    internalTask.name = task.name || "Неизвестно";
    internalTask.id = String(task.id);
    internalTask.info = task.info || "Неизвестно";
    internalTask.isImportant = task.isImportant || false;
    internalTask.isDone = task.isCompleted || false;
  }

  return internalTask;
};
export const mapToInternalPost = (task: AddEditTaskEntity) => {
  const newTask: PostTaskRequest = {
    isImportant: false,
    name: "",
    info: "",
  };

  if (task) {
    newTask.name = task.name;
    newTask.info = task.info;
    newTask.isImportant = task.isImportant;
  }

  return newTask;
};

export const mapToInternalPatch = (task: AddEditTaskEntity) => {
  const newTask: UpdateTaskRequest = {
    isImportant: false,
    name: "",
    info: "",
    isCompleted: false,
  };

  if (task) {
    newTask.isImportant = task.isImportant;
    newTask.name = task.name;
    newTask.info = task.info;
    newTask.isCompleted = task.isDone;
  }

  return newTask;
};
