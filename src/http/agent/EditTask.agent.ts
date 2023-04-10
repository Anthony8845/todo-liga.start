import { BasicAgent } from "./Basic.agent";
import {
  GetTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "http/model";

export class EditTaskAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }
  async getTask(taskId: string) {
    const { data } = await this._http.get<GetTaskResponse>(`/tasks/${taskId}`);
    return data;
  }
  async patchTask(task: UpdateTaskRequest, taskId: string | undefined) {
    const { data } = await this._http.patch<UpdateTaskResponse>(
      `/tasks/${taskId}`,
      task
    );
    return data;
  }
}

export const EditTaskAgentInstanse = new EditTaskAgent();
