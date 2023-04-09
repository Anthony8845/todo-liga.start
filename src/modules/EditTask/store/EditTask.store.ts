import { action, computed, makeObservable, observable, reaction } from "mobx";
import { AddEditTaskEntity, TaskEntity } from "domains/Task.entity";
import { TasksMock } from "__mocks__/Tasks.mock";
import { delay } from "helpers/index";

type PrivateFields = "_task" | "_isTaskLoading" | "_isImportantDisabled";

export class EditTask {
  taskId: string | undefined = undefined;

  constructor() {
    makeObservable<this, PrivateFields>(this, {
      loadTask: action,
      postTask: action,
      toggleIsImportantTask: action,
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
  private _isImportantDisabled: boolean | undefined = true;

  get isImportantDisabled() {
    return this._isImportantDisabled;
  }

  private _isTaskLoading = true;

  get isTaskLoading() {
    return this._isTaskLoading;
  }
  private _task: TaskEntity | undefined = undefined;

  get task(): TaskEntity | undefined {
    return this._task;
  }

  toggleIsImportantTask(isDone: boolean) {
    // if (e === undefined) return;
    // this._isImportantDisabled = true;
    console.log(isDone);
  }

  async loadTask(id: string | undefined) {
    this._isTaskLoading = true;
    TasksMock.map((e) => {
      if (e.id === id) {
        return (this._task = e);
      }
    });
    await delay(300);
    this._isTaskLoading = false;
  }

  postTask(task: AddEditTaskEntity) {
    console.log(task);
  }
}

export const EditTaskInstance = new EditTask();
