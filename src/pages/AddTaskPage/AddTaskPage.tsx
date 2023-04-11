import React from "react";
import { Typography } from "@mui/material";
import { PageContainer } from "components/PageContainer";
import { AddTask } from "modules/index";

export const AddTaskPage = () => {
  return (
    <PageContainer>
      <Typography align="center" variant="h4" mb={2} component={"h1"}>
        TODO LIST | ADD TASK
      </Typography>
      <AddTask />
    </PageContainer>
  );
};
