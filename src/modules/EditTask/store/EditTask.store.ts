import { action, computed, makeObservable, observable, reaction } from "mobx";
import { AddEditTaskEntity, TaskEntity } from "domains/Task.entity";
import { getExternalTask, mapToInternalPatch } from "helpers/index";
import { EditTaskAgentInstanse } from "http/agent/EditTask.agent";

type PrivateFields = "_task" | "_isTaskLoading" | "_isImportantDisabled";

export class EditTask {
  taskId: string | undefined = undefined;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      loadTask: action,
      patchTask: action,
      convertTask: action,
      toggleImportantDisabled: action,

      task: computed,
      isTaskLoading: computed,

      taskId: observable,
      _task: observable,
      _isTaskLoading: observable,
      _isImportantDisabled: observable,
    });
    reaction(
      () => this.taskId,
      (): void => {
        this.loadTask(this.taskId);
      }
    );
  }
  private _isImportantDisabled: boolean | undefined = undefined;

  get isImportantDisabled() {
    return this._isImportantDisabled;
  }

  toggleImportantDisabled = (done: boolean) => {
    if (done) return (this._isImportantDisabled = true);
    else this._isImportantDisabled = false;
  };

  private _isTaskLoading = true;

  get isTaskLoading() {
    return this._isTaskLoading;
  }
  private _task: TaskEntity | undefined = undefined;

  get task(): TaskEntity | undefined {
    return this._task;
  }
  async getTask(taskId: string) {
    const res = await EditTaskAgentInstanse.getTask(taskId);
    const data = getExternalTask(res);
    return data;
  }

  async loadTask(taskId: string | undefined) {
    this._isTaskLoading = true;
    if (taskId) {
      const data = await this.getTask(taskId);
      this._task = data;
    }
    this._isTaskLoading = false;
  }
  convertTask = async (task: AddEditTaskEntity, taskId: string | undefined) => {
    const internalTask = mapToInternalPatch(task);
    const data = await EditTaskAgentInstanse.patchTask(internalTask, taskId);
    return data;
  };
  patchTask = async (task: AddEditTaskEntity | undefined) => {
    if (task) {
      await this.convertTask(task, this.taskId);
      this._task = undefined;
      this.taskId = undefined;
    }
  };
}

export const EditTaskInstance = new EditTask();
