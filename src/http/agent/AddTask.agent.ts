import { BasicAgent } from "./Basic.agent";
import { PostTaskRequest } from "http/model";

export class AddTaskAgent extends BasicAgent {
  constructor() {
    super(process.env.APP_API as string);
  }

  async postTask(data: PostTaskRequest) {
    return await this._http.post("/tasks", data);
  }
}

export const AddTaskAgentInstance = new AddTaskAgent();
