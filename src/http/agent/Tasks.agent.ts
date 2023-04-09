import { BasicAgent } from "./Basic.agent";
import {
  GetAllTasksQuery,
  GetAllTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "http/model";

export class TasksAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async getAllTasks(params?: GetAllTasksQuery) {
    const { data } = await this._http.get<GetAllTasksResponse>(`/tasks`, {
      params,
    });
    return data;
  }

  async updateTask(taskId: string, newData: UpdateTaskRequest) {
    const { data } = await this._http.patch<UpdateTaskResponse>(
      `/tasks/${taskId}`,
      newData
    );
    return data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await this._http.delete(`/tasks/${taskId}`);
  }
}

export const TaskAgentInstance = new TasksAgent();
