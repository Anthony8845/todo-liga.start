import React, { ChangeEventHandler } from "react";
import { FormControlLabel, Checkbox, Box } from "@mui/material";
import { CheckboxProps } from "./Checkbox.types";

export function CheckboxComponent({
  label,
  checked,
  onChange,
  disabled,
}: CheckboxProps) {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.checked);
  return (
    <Box mb={2}>
      <FormControlLabel
        control={
          <Checkbox
            value=""
            id={label}
            disabled={disabled}
            checked={checked}
            onChange={onCheckboxChange}
          />
        }
        label={label}
      />
    </Box>
  );
}
