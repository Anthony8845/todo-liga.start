import React, { ChangeEventHandler } from "react";
import { Alert, Box, TextField } from "@mui/material";
import { TextFieldProps } from "./TextField.types";
import "./TextField.css";

export function TextFieldComponent({
  label,
  placeholder,
  containerClassName = "",
  inputType,
  value,
  onChange,
  errorText,
}: TextFieldProps) {
  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    onChange(evt.target.value);
  };
  return (
    <>
      <TextField
        fullWidth
        label={label}
        id={label}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onFieldChange}
      />
      <Box height={55} component="div">
        {errorText && <Alert severity="error">{errorText}</Alert>}
      </Box>
    </>
  );
}
