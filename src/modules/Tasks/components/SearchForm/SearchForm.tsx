import React, { MouseEvent } from "react";
import { observer } from "mobx-react";
import { Controller, useForm } from "react-hook-form";
import { StatusFilter } from "../StatusFilter";
import { DEFAULT_SEARCH_FORM } from "./SearchForm.constants";
import { FiltersType, SearchFormEntity } from "domains/index";
import { SearchInput } from "components/SearchInput";
import { TaskStoreInstance } from "modules/Tasks/store";

export const SearchFormProto = () => {
  const { isTaskLoading, loadTask } = TaskStoreInstance;
  const { setValue, control, handleSubmit } = useForm<SearchFormEntity>({
    defaultValues: DEFAULT_SEARCH_FORM,
  });

  const onSearchInputChange = (searchText: string) => {
    setValue("searchValue", searchText);
  };

  const onFilterChange = (taskType: FiltersType) => {
    setValue("filterType", taskType);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleSubmit((form) => {
      console.log(form);
      loadTask(form);
    })();
  };
  const onReset = () => {
    setValue("searchValue", "");
  };

  return (
    <form className="search-form d-flex justify-content-between">
      <Controller
        control={control}
        name="searchValue"
        render={({ field }) => (
          <SearchInput
            disabled={isTaskLoading}
            value={field.value}
            onChange={onSearchInputChange}
            onReset={onReset}
          />
        )}
      />
      <Controller
        control={control}
        name="filterType"
        render={({ field }) => (
          <StatusFilter
            disabled={isTaskLoading}
            tasksType={field.value}
            onChange={onFilterChange}
          />
        )}
      />
      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        Find
      </button>
    </form>
  );
};

export const SearchForm = observer(SearchFormProto);
