import React from "react";
import { Link } from "react-router-dom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import { TaskProps } from "./Task.types";
import { TaskStyled, TaskText } from "./Task.styled";
import { EDIT, ROOT } from "constants/index";

export const Task = ({
  task,
  changeTaskImportance,
  deleteTask,
  changeTaskComplete,
}: TaskProps) => {
  const { name, info, isImportant, isDone, id } = task;

  const onBtnImportantClick = () => changeTaskImportance(id, isImportant);
  const onBtnCompleteClick = () => changeTaskComplete(id, isDone);
  const onBtnDeleteClick = () => deleteTask(id);

  return (
    <div>
      <TaskStyled>
        <TaskText
          variant="h6"
          color={isImportant ? "green" : "default"}
          textDecoration={isDone ? "line-through" : "none"}
          // sx={
          //   isDone
          //     ? { textDecoration: "line-through" }
          //     : { textDecoration: "none" }
          // }
        >
          {name}
        </TaskText>

        <div>
          <IconButton
            type="button"
            color={isImportant ? "success" : "default"}
            disabled={isDone}
            onClick={onBtnImportantClick}
          >
            <PriorityHighIcon fontSize="small" />
          </IconButton>

          <IconButton
            type="button"
            color={isDone ? "error" : "default"}
            onClick={onBtnCompleteClick}
          >
            <CheckBoxIcon />
          </IconButton>

          <IconButton type="button" onClick={onBtnDeleteClick}>
            <DeleteOutlineIcon />
          </IconButton>

          <Link to={`${ROOT}${EDIT}/${id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
      </TaskStyled>
      <Typography
        component="p"
        color={isImportant ? "green" : "default"}
        sx={
          isDone
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {info}
      </Typography>
    </div>
  );
};
