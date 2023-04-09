import * as Yup from "yup";
import { AddEditTaskEntity } from "domains/Task.entity";

export const DEFAULT_ADDTASK_FORM: AddEditTaskEntity = {
  name: "",
  info: "",
  isImportant: false,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Task name is required"),
  info: Yup.string().required("Description is required"),
});
