import React, { ChangeEventHandler } from "react";
import { TextFieldProps } from "./TextField.types";
import "./TextField.css";

export function TextField({
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
    <div className={`mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onFieldChange}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
