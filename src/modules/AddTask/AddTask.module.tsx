import React from "react";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AddTaskInstance } from "./store";
import { DEFAULT_ADDTASK_FORM, validationSchema } from "./AddTask.constants";
import { TextField } from "components/TextField";
import { Checkbox } from "components/Checkbox";
import { AddEditTaskEntity } from "domains/Task.entity";
import { Loader } from "components/Loader";
import { PATH_LIST } from "constants/paths";

export const AddTaskProto = () => {
  const { addTask, isTaskLoading } = AddTaskInstance;
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
  function onInputImportant(importantCheck: boolean): void {
    setValue("isImportant", importantCheck);
  }
  function onSubmit(data: AddEditTaskEntity): void {
    addTask(data);
    reset();
    return navigate(PATH_LIST.ROOT);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Loader isLoading={isTaskLoading}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
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
            <TextField
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
            <Checkbox
              label="Important"
              checked={field.value}
              onChange={onInputImportant}
            />
          )}
        />
        <button
          className="btn btn-secondary d-block ml-auto w-100"
          type="submit"
        >
          Add task
        </button>
      </Loader>
    </form>
  );
};

export const AddTask = observer(AddTaskProto);
