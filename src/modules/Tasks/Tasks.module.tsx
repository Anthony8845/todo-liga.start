import { observer } from "mobx-react";
import { useEffect } from "react";
import { TasksStats, TasksList, SearchForm } from "./components";
import { TaskStoreInstance } from "./store";

export function TasksProto() {
  useEffect(() => {
    TaskStoreInstance.loadTask();
  }, []);
  return (
    <>
      <SearchForm />
      <TasksStats />
      <TasksList />
    </>
  );
}

export const Tasks = observer(TasksProto);
