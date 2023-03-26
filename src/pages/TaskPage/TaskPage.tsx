import React from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "components/PageContainer";
import { Tasks } from "modules/index";
import { PATH_LIST } from "constants/index";

export const TaskPage = () => {
  return (
    <PageContainer>
      <h1>TODO APP</h1>
      <Tasks />
      <Link className="btn btn-secondary d-block ml-auto" to={PATH_LIST.ADD}>
        Add task
      </Link>
    </PageContainer>
  );
};
