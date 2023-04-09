import { action, computed, makeObservable, observable } from "mobx";
import {
  SearchFormEntity,
  TaskEntity,
  TasksStatsEntity,
} from "domains/Task.entity";
import {
  getInternalInfo,
  mapToExternalParams,
  mapToInternalTasks,
} from "helpers/mappers";
import { TaskAgentInstance } from "http/agent";

type PrivateFields =
  | "_isTaskLoading"
  | "_tasks"
  | "_tasksStats"
  | "_searchForm";

export class TaskStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isTaskLoading: observable,
      _tasks: observable,
      _tasksStats: observable,
      _searchForm: observable,

      isTaskLoading: computed,
      tasks: computed,
      tasksStats: computed,

      loadTask: action,
      changeTaskComplete: action,
      changeTaskImportance: action,
      deleteTask: action,
      getTask: action,
    });
  }

  private _isTaskLoading = false;

  get isTaskLoading() {
    return this._isTaskLoading;
  }

  private _tasks: TaskEntity[] | null = [];

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  private _searchForm?: SearchFormEntity = {
    searchValue: "",
    filterType: "All",
  };

  getTask = async (searchParams?: SearchFormEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);

    return {
      task: mapToInternalTasks(res),
      taskStats: getInternalInfo(res),
    };
  };

  loadTask = async (searchParams?: SearchFormEntity) => {
    this._isTaskLoading = true;

    // request server
    try {
      if (searchParams) this._searchForm = searchParams;

      const { task, taskStats } = await this.getTask(this._searchForm);

      this._tasks = task;
      this._tasksStats = taskStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTaskLoading = false;
    }
  };

  changeTaskImportance = async (
    taskId: TaskEntity["id"],
    currentStatus: boolean
  ) => {
    this._isTaskLoading = true;
    //request server
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isImportant: !currentStatus,
      });
      const { task, taskStats } = await this.getTask(this._searchForm);

      this._tasks = task;
      this._tasksStats = taskStats;
    } catch (error) {
      console.log(error);
    } finally {
      this._isTaskLoading = false;
    }
  };

  changeTaskComplete = async (
    taskId: TaskEntity["id"],
    currentStatus: boolean
  ) => {
    this._isTaskLoading = true;
    //request server
    try {
      await TaskAgentInstance.updateTask(taskId, {
        isCompleted: !currentStatus,
        isImportant: currentStatus ? undefined : false,
      });

      const { task, taskStats } = await this.getTask(this._searchForm);

      this._tasks = task;
      this._tasksStats = taskStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTaskLoading = false;
    }
  };
  deleteTask = async (taskId: TaskEntity["id"]) => {
    this._isTaskLoading = true;
    //request server
    try {
      await TaskAgentInstance.deleteTask(taskId);
      const { task, taskStats } = await this.getTask(this._searchForm);

      this._tasks = task;
      this._tasksStats = taskStats;
    } catch {
      this._tasks = null;
      this._tasksStats = null;
    } finally {
      this._isTaskLoading = false;
    }
  };
}

export const TaskStoreInstance = new TaskStore();
