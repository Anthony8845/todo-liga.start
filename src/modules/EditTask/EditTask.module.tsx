import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditTaskInstance } from "./store";
import { DEFAULT_EDITTASK_FORM, validationSchema } from "./EditTask.constans";
import { AddEditTaskEntity } from "domains/index";
import { Checkbox, Loader, TextField } from "components/index";

export const EditTaskProto = () => {
  const { taskId } = useParams();
  const { control, reset, handleSubmit, setValue } = useForm<AddEditTaskEntity>(
    {
      defaultValues: DEFAULT_EDITTASK_FORM,
      resolver: yupResolver(validationSchema),
    }
  );
  const {
    postTask,
    task,
    isTaskLoading,
    isImportantDisabled,
    toggleIsImportantTask,
  } = EditTaskInstance;

  useEffect(() => {
    EditTaskInstance.taskId = taskId;
  }, [EditTaskInstance, taskId]);
  useEffect(() => {
    if (task) {
      setValue("name", task.name);
      setValue("info", task.info);
      setValue("isImportant", task.isImportant);
      setValue("isDone", task.isDone);
    }
  }, [task]);

  const onInputTaskName = (taskName: string): void => {
    setValue("name", taskName);
  };
  const onInputTaskDescription = (info: string): void => {
    setValue("info", info);
  };
  function onInputTaskImportant(isImportant: boolean): void {
    setValue("isImportant", isImportant);
  }
  function onInputTaskCompleted(isDone: boolean): void {
    setValue("isDone", isDone);
  }
  function onSubmit(e: AddEditTaskEntity): void {
    postTask(e);
  }

  return (
    <>
      <h1 className="d-flex justify-content-center">
        TODO LIST | EDIT TASK {taskId}
      </h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Loader isLoading={isTaskLoading}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Task name"
                value={field.value}
                onChange={onInputTaskName}
              />
            )}
          />
          <Controller
            name="info"
            control={control}
            render={({ field }) => (
              <TextField
                label="What to do (description)"
                value={field.value}
                onChange={onInputTaskDescription}
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
                disabled={isImportantDisabled}
                onChange={onInputTaskImportant}
              />
            )}
          />
          <Controller
            name="isDone"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Completed"
                checked={field.value}
                onChange={onInputTaskCompleted}
              />
            )}
          />
        </Loader>
        <button className="btn btn-secondary d-block ml-auto w-100">
          Edit task
        </button>
      </form>
    </>
  );
};

export const EditTask = observer(EditTaskProto);
