import React from "react";
import { observer } from "mobx-react";
import { Task } from "../Task";
import { NotFound, TaskListStyled } from "./TasksList.styled";
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
    <TaskListStyled>
      <Loader isLoading={isTaskLoading}>
        {tasks?.length ? (
          <ul>
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
          <NotFound>not found</NotFound>
        )}
      </Loader>
    </TaskListStyled>
  );
}

export const TasksList = observer(TasksListProto);
