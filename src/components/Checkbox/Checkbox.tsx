import React, { ChangeEventHandler } from "react";
import { CheckboxProps } from "./Checkbox.types";

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  containerClassName = "",
}: CheckboxProps) {
  const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.checked);
  return (
    <div className={`form-check mb-3 ${containerClassName}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={label}
        disabled={disabled}
        checked={checked}
        onChange={onCheckboxChange}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
