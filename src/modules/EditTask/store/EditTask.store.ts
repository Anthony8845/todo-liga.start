import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { AddEditTaskEntity, TaskEntity } from "domains/Task.entity";
import { getExternalTask, mapToInternalPatch } from "helpers/index";
import { EditTaskAgentInstanse } from "http/agent";

type PrivateFields = "_task" | "_isTaskLoading";

export class EditTaskStore {
  taskId: string | undefined = undefined;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      loadTask: action,
      patchTask: action,
      // convertTask: action,

      task: computed,
      isTaskLoading: computed,

      taskId: observable,
      _task: observable,
      _isTaskLoading: observable,
    });
    reaction(
      () => this.taskId,
      (): void => {
        this.loadTask(this.taskId);
      }
    );
  }

  private _isTaskLoading = true;
  private _task: TaskEntity | undefined = undefined;

  get isTaskLoading() {
    return this._isTaskLoading;
  }

  get task(): TaskEntity | undefined {
    return this._task;
  }

  async getTask(taskId: string) {
    const res = await EditTaskAgentInstanse.getTask(taskId);
    const data = getExternalTask(res);
    return data;
  }

  async loadTask(taskId: string | undefined) {
    runInAction(() => {
      this._isTaskLoading = true;
    });
    try {
      if (taskId) {
        const data = await this.getTask(taskId);
        runInAction(() => {
          this._task = data;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
    }
  }

  patchTask = async (task: AddEditTaskEntity | undefined) => {
    try {
      if (task) {
        const internalTask = mapToInternalPatch(task);
        const data = await EditTaskAgentInstanse.patchTask(
          internalTask,
          this.taskId
        );

        runInAction(() => {
          this._task = undefined;
          this.taskId = undefined;
        });
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export const EditTaskStoreInstance = new EditTaskStore();
