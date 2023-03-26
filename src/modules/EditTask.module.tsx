import React from "react";
import { EditTaskForm } from "./components/EditTaskForm/input";
import { TasksMock } from "__mocks__/Tasks.mock";

export const EditTask = () => {
  return (
    <>
      <EditTaskForm task={TasksMock} />
    </>
  );
};
