import React, { useState, MouseEvent, ChangeEventHandler } from "react";
import { TaskProps } from "./EditTask.types";
import { Checkbox } from "components/Checkbox";
import { TextField } from "components/TextField";

export const EditTaskForm = ({ task }: TaskProps) => {
  const taskMock = task[0];
  const [taskName, setTaskName] = useState(taskMock.name);
  const [taskDescription, setTaskDescription] = useState(taskMock.info);
  const [taskImportant, setTaskImportant] = useState(taskMock.isImportant);
  const [taskCompleted, setTaskCompleted] = useState(taskMock.isDone);

  const onInputTaskName: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setTaskName(e.target.value);
  };
  const onInputTaskDescription: ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    setTaskDescription(e.target.value);
  };
  function onInputTaskImportant(e: boolean): void {
    setTaskImportant(e);
  }
  function onInputTaskCompleted(e: boolean): void {
    setTaskCompleted(e);
  }
  function onSubmit(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    console.log(taskName);
    console.log(taskDescription);
    console.log(taskImportant);
    console.log(taskCompleted);
  }
  return (
    <>
      <h1 className="d-flex justify-content-center">
        TODO LIST | EDIT TASK {taskMock.id}
      </h1>
      <form>
        <TextField
          label="Task name"
          value={taskName}
          onChange={onInputTaskName}
        />
        <TextField
          label="What to do (description)"
          value={taskDescription}
          onChange={onInputTaskDescription}
        />
        <Checkbox
          label="Important"
          checked={taskImportant}
          onChange={(e) => onInputTaskImportant(e.target.checked)}
        />
        <Checkbox
          label="Completed"
          checked={taskCompleted}
          onChange={(e) => onInputTaskCompleted(e.target.checked)}
        />
        <button
          className="btn btn-secondary d-block ml-auto w-100"
          onClick={onSubmit}
        >
          Edit task
        </button>
      </form>
    </>
  );
};
