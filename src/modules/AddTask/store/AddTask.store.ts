import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { AddEditTaskEntity } from "domains/Task.entity";
import { AddTaskAgentInstance } from "http/agent";
import { mapToInternalPost } from "helpers/mappers";

type PrivateFields = "_isTaskLoading";

class AddTaskStore {
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
    return await AddTaskAgentInstance.postTask(internalAddTask);
  }

  addTask = async (data: AddEditTaskEntity) => {
    runInAction(() => {
      this._isTaskLoading = true;
    });
    try {
      return await this.getTask(data);
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this._isTaskLoading = false;
      });
    }
  };
}

export const AddTaskStoreInstance = new AddTaskStore();
