import React from "react";
import { observer } from "mobx-react";
import { TaskStoreInstance } from "modules/Tasks/store";
import { Loader } from "components/index";

export function TasksStatsProto() {
  const { isTaskLoading, tasksStats } = TaskStoreInstance;
  return (
    <div className="d-flex w-100 justify-content-between mt-2">
      {tasksStats ? (
        <>
          <div>
            Total:
            <Loader isLoading={isTaskLoading}>
              <span className="badge bg-secondary">{tasksStats.total}</span>
            </Loader>
          </div>
          <div>
            Important:
            <Loader isLoading={isTaskLoading}>
              <span className="badge bg-secondary">{tasksStats.important}</span>
            </Loader>
          </div>
          <div>
            Done:
            <Loader isLoading={isTaskLoading}>
              <span className="badge bg-secondary">{tasksStats.done}</span>
            </Loader>
          </div>
        </>
      ) : (
        <p className="d-flex justify-content-center w-100">
          Stats is not available
        </p>
      )}
    </div>
  );
}
export const TasksStats = observer(TasksStatsProto);
