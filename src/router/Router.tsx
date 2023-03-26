import React from "react";
import { Route, Routes } from "react-router-dom";
import { TaskPage } from "pages/TaskPage";
import { PATH_LIST } from "constants/paths";
import { AddTaskPage } from "pages/AddTaskPage";
import { EditTaskPage } from "pages/EditTaskPage";

export const Router = () => {
  return (
    <Routes>
      <Route path={PATH_LIST.ROOT} element={<TaskPage />} />
      <Route path={PATH_LIST.ADD} element={<AddTaskPage />} />
      <Route path={PATH_LIST.EDIT} element={<EditTaskPage />} />
    </Routes>
  );
};
