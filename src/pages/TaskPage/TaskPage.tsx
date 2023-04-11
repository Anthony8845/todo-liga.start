import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { PageContainer } from "components/PageContainer";
import { Tasks } from "modules/index";
import { PATH_LIST } from "constants/index";

export const TaskPage = () => {
  return (
    <PageContainer>
      <Typography variant="h4" component={"h1"}>
        TODO APP
      </Typography>
      <Tasks />
      <Link to={PATH_LIST.ADD}>
        <Button variant="contained" fullWidth color="primary" type="submit">
          Add task
        </Button>
      </Link>
    </PageContainer>
  );
};
