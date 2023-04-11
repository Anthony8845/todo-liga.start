import React from "react";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AddTaskStoreInstance } from "./store";
import { DEFAULT_ADDTASK_FORM, validationSchema } from "./AddTask.constants";
import { TextFieldComponent } from "components/TextField";
import { CheckboxComponent } from "components/Checkbox";
import { AddEditTaskEntity } from "domains/Task.entity";
import { Loader } from "components/Loader";
import { PATH_LIST } from "constants/paths";

export const AddTaskProto = () => {
  const { addTask, isTaskLoading } = AddTaskStoreInstance;
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, reset } = useForm<AddEditTaskEntity>(
    {
      defaultValues: DEFAULT_ADDTASK_FORM,
      resolver: yupResolver(validationSchema),
    }
  );

  const onInputTaskName = (taskName: string): void => {
    setValue("name", taskName);
  };
  const onInputDescription = (taskInfo: string): void => {
    setValue("info", taskInfo);
  };
  const onInputImportant = (importantCheck: boolean): void => {
    setValue("isImportant", importantCheck);
  };

  const onSubmit = async (data: AddEditTaskEntity): Promise<void> => {
    const res = await addTask(data);
    reset();
    if (res) navigate(PATH_LIST.ROOT);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Loader isLoading={isTaskLoading}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextFieldComponent
              label="Task name"
              inputType="text"
              value={field.value}
              placeholder="Clean room"
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
              placeholder="Clean my room"
              label="What to do (description)"
              value={field.value}
              onChange={onInputDescription}
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
              onChange={onInputImportant}
            />
          )}
        />
        <Button variant="contained" fullWidth color="primary" type="submit">
          Add task
        </Button>
      </Loader>
    </form>
  );
};

export const AddTask = observer(AddTaskProto);
