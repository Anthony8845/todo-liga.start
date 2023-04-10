import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
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
      _isTaskLoading: observable.deep,
      _tasks: observable.deep,
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
  private _tasks: TaskEntity[] | null = [];
  private _tasksStats: TasksStatsEntity | null = {
    total: 0,
    important: 0,
    done: 0,
  };
  private _searchForm?: SearchFormEntity = {
    searchValue: "",
    filterType: "All",
  };

  get isTaskLoading() {
    return this._isTaskLoading;
  }

  get tasks(): TaskEntity[] | null {
    return this._tasks;
  }

  get tasksStats(): TasksStatsEntity | null {
    return this._tasksStats;
  }

  getTask = async (searchParams?: SearchFormEntity) => {
    const externalSearchParams = mapToExternalParams(searchParams);
    const res = await TaskAgentInstance.getAllTasks(externalSearchParams);

    return {
      task: mapToInternalTasks(res),
      taskStats: getInternalInfo(res),
    };
  };

  loadTask = async (searchParams?: SearchFormEntity) => {
    runInAction(() => {
      this._isTaskLoading = true;
    });

    // request server
    try {
      if (searchParams) this._searchForm = searchParams;

      const { task, taskStats } = await this.getTask(this._searchForm);
      runInAction(() => {
        this._tasks = task;
        this._tasksStats = taskStats;
      });
    } catch {
      runInAction(() => {
        this._tasks = null;
        this._tasksStats = null;
      });
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
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
      runInAction(() => {
        this._tasks = task;
        this._tasksStats = taskStats;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
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
      runInAction(() => {
        this._tasks = task;
        this._tasksStats = taskStats;
      });
    } catch {
      runInAction(() => {
        this._tasks = null;
        this._tasksStats = null;
      });
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
    }
  };
  deleteTask = async (taskId: TaskEntity["id"]) => {
    runInAction(() => {
      this._isTaskLoading = true;
    });
    //request server
    try {
      await TaskAgentInstance.deleteTask(taskId);
      const { task, taskStats } = await this.getTask(this._searchForm);
      runInAction(() => {
        this._tasks = task;
        this._tasksStats = taskStats;
      });
    } catch {
      runInAction(() => {
        this._tasks = null;
        this._tasksStats = null;
      });
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
    }
  };
}

export const TaskStoreInstance = new TaskStore();
