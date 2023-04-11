import React from "react";
import { observer } from "mobx-react";
import { TaskStatusStyled } from "./TaskStats.styled";
import { TaskStoreInstance } from "modules/Tasks/store";
import { Loader } from "components/index";

export function TasksStatsProto() {
  const { isTaskLoading, tasksStats } = TaskStoreInstance;
  return (
    <TaskStatusStyled>
      {tasksStats ? (
        <>
          <div>
            Total:
            <Loader isLoading={isTaskLoading}>
              <span>{tasksStats.total}</span>
            </Loader>
          </div>
          <div>
            Important:
            <Loader isLoading={isTaskLoading}>
              <span>{tasksStats.important}</span>
            </Loader>
          </div>
          <div>
            Done:
            <Loader isLoading={isTaskLoading}>
              <span>{tasksStats.done}</span>
            </Loader>
          </div>
        </>
      ) : (
        <p>Stats is not available</p>
      )}
    </TaskStatusStyled>
  );
}
export const TasksStats = observer(TasksStatsProto);
