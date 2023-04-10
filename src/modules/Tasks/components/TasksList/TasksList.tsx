import React from "react";
import { observer } from "mobx-react";
import { Task } from "../Task";
import { Loader } from "components/index";
import { TaskStoreInstance } from "modules/Tasks/store";

export function TasksListProto() {
  const {
    isTaskLoading,
    tasks,
    changeTaskImportance,
    deleteTask,
    changeTaskComplete,
  } = TaskStoreInstance;
  return (
    <div className="tasks-wrapper">
      <Loader isLoading={isTaskLoading}>
        {tasks?.length ? (
          <ul className="list-group todo-list mb-3">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <Task
                  key={task.id}
                  task={task}
                  changeTaskImportance={changeTaskImportance}
                  changeTaskComplete={changeTaskComplete}
                  deleteTask={deleteTask}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>not found</div>
        )}
      </Loader>
    </div>
  );
}

export const TasksList = observer(TasksListProto);
