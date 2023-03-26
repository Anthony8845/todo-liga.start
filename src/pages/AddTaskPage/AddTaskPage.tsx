import React from "react";
import { PageContainer } from "components/PageContainer";
import { AddTask } from "modules/components/AddTask";

export const AddTaskPage = () => {
  return (
    <PageContainer>
      <h1 className="d-flex justify-content-center">TODO LIST | ADD TASK</h1>
      <AddTask />
    </PageContainer>
  );
};
