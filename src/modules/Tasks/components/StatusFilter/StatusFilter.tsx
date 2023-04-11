import React, { MouseEvent } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { StatusFilterProps } from "./StatusFilter.types";
import { FiltersType } from "domains/index";
import { FILTER_TYPES } from "constants/index";

export function StatusFilter({
  onChange,
  tasksType,
  disabled,
}: StatusFilterProps) {
  const onFilterChange = (
    evt: MouseEvent<HTMLDivElement> & { target: HTMLButtonElement }
  ) => {
    if (!disabled) onChange(evt.target.textContent as FiltersType);
  };

  return (
    <div onClick={onFilterChange}>
      <ButtonGroup size="small">
        <Button
          variant={tasksType === FILTER_TYPES.ALL ? "contained" : "outlined"}
        >
          {FILTER_TYPES.ALL}
        </Button>
        <Button
          variant={tasksType === FILTER_TYPES.ACTIVE ? "contained" : "outlined"}
        >
          {FILTER_TYPES.ACTIVE}
        </Button>
        <Button
          variant={tasksType === FILTER_TYPES.DONE ? "contained" : "outlined"}
        >
          {FILTER_TYPES.DONE}
        </Button>
        <Button
          variant={
            tasksType === FILTER_TYPES.IMPORTANT ? "contained" : "outlined"
          }
        >
          {FILTER_TYPES.IMPORTANT}
        </Button>
      </ButtonGroup>
    </div>
  );
}
