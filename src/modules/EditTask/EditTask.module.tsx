import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { EditTaskStoreInstance } from "./store";
import { DEFAULT_EDITTASK_FORM, validationSchema } from "./EditTask.constans";
import { EditTaskStyled } from "./EditTask.styled";
import { AddEditTaskEntity } from "domains/index";
import {
  CheckboxComponent,
  Loader,
  TextFieldComponent,
} from "components/index";
import { PATH_LIST } from "constants/paths";

export const EditTaskProto = () => {
  const { taskId } = useParams();
  const { control, reset, handleSubmit, setValue, watch } =
    useForm<AddEditTaskEntity>({
      defaultValues: DEFAULT_EDITTASK_FORM,
      resolver: yupResolver(validationSchema),
    });

  const isDone = watch("isDone");
  const navigate = useNavigate();
  const { patchTask, task, isTaskLoading } = EditTaskStoreInstance;

  useEffect(() => {
    if (isDone) setValue("isImportant", false);
  }, [isDone]);

  useEffect(() => {
    EditTaskStoreInstance.taskId = taskId;
  }, [EditTaskStoreInstance, taskId]);

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task]);

  const onInputTaskName = (taskName: string): void => {
    setValue("name", taskName);
  };
  const onInputTaskDescription = (info: string): void => {
    setValue("info", info);
  };
  const onInputTaskImportant = (isImportant: boolean): void => {
    setValue("isImportant", isImportant);
  };
  const onInputTaskCompleted = (isDone: boolean): void => {
    setValue("isDone", isDone);
  };

  const onSubmit = async (task: AddEditTaskEntity) => {
    const data = await patchTask(task);
    if (data) navigate(PATH_LIST.ROOT);
  };

  return (
    <>
      <Typography mb={3} align="center" variant="h4" component={"h1"}>
        TODO LIST | EDIT TASK {taskId}
      </Typography>
      <EditTaskStyled onSubmit={handleSubmit(onSubmit)}>
        <Loader isLoading={isTaskLoading}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextFieldComponent
                label="Task name"
                value={field.value}
                onChange={onInputTaskName}
                errorText={error?.message}
              />
            )}
          />
          <Controller
            name="info"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextFieldComponent
                label="What to do (description)"
                value={field.value}
                onChange={onInputTaskDescription}
                errorText={error?.message}
              />
            )}
          />
          <Controller
            name="isImportant"
            control={control}
            render={({ field }) => (
              <CheckboxComponent
                label="Important"
                checked={field.value}
                disabled={isDone ? true : false}
                onChange={onInputTaskImportant}
              />
            )}
          />
          <Controller
            name="isDone"
            control={control}
            render={({ field }) => (
              <CheckboxComponent
                label="Completed"
                checked={field.value}
                onChange={onInputTaskCompleted}
              />
            )}
          />
        </Loader>
        <Button variant="contained" fullWidth color="primary" type="submit">
          Edit task
        </Button>
      </EditTaskStyled>
    </>
  );
};

export const EditTask = observer(EditTaskProto);
