import React, { MouseEvent, useState } from "react";
import { TextField } from "components/TextField";
import { Checkbox } from "components/Checkbox";

export const AddTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, SetTaskDescription] = useState<string>("");
  const [taskImportant, SetTaskImportant] = useState<boolean>(false);

  function onInputTaskName(e: string): void {
    setTaskName(e);
  }
  function onInputDescription(e: string): void {
    SetTaskDescription(e);
  }
  function onInputImportant(e: boolean): void {
    SetTaskImportant(e);
  }
  function onSubmit(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (!taskName || !taskDescription) {
      console.log("Заполните все поля");
      return;
    }
    console.log(taskName);
    console.log(taskDescription);
    console.log(taskImportant);
    setTaskName("");
    SetTaskDescription("");
    SetTaskImportant(false);
  }

  return (
    <form>
      <TextField
        label="Task name"
        inputType="text"
        value={taskName}
        placeholder="Clean room"
        onChange={(e) => onInputTaskName(e.target.value)}
      />
      <TextField
        placeholder="Clean my room"
        label="What to do (description)"
        value={taskDescription}
        onChange={(e) => onInputDescription(e.target.value)}
      />
      <Checkbox
        label="Important"
        checked={taskImportant}
        onChange={(e) => onInputImportant(e.target.checked)}
      />
      <button
        className="btn btn-secondary d-block ml-auto w-100"
        onClick={onSubmit}
      >
        Add task
      </button>
    </form>
  );
};
