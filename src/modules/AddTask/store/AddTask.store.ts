import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { AddEditTaskEntity } from "domains/Task.entity";
import { AddTaskAgentInstance } from "http/agent/AddTask.agent";
import { mapToInternalPost } from "helpers/mappers";

type PrivateFields = "_isTaskLoading";

class AddTask {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isTaskLoading: observable,

      isTaskLoading: computed,
      addTask: action,
    });
  }

  private _isTaskLoading = false;

  get isTaskLoading() {
    return this._isTaskLoading;
  }

  async getTask(task: AddEditTaskEntity) {
    const internalAddTask = mapToInternalPost(task);
    const res = await AddTaskAgentInstance.postTask(internalAddTask);
    return res;
  }

  addTask = async (data: AddEditTaskEntity) => {
    this._isTaskLoading = true;
    try {
      await this.getTask(data);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
    }
  };
}

export const AddTaskInstance = new AddTask();
