import React, { ChangeEventHandler, MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, FormControl, Icon, Input, SvgIcon } from "@mui/material";
import { SearchInputStyled } from "./SearchInputStyled";
import { SearchInputProps } from "./SearchInput.types";

export function SearchInput({
  onChange,
  value,
  onReset,
  disabled,
}: SearchInputProps) {
  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) =>
    onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
  };

  return (
    <SearchInputStyled>
      <Input
        placeholder="search"
        disabled={disabled}
        onChange={onSearchInputChange}
        value={value}
      />
      <Button onClick={onResetBtnClick}>
        <SvgIcon>
          <CloseIcon />
        </SvgIcon>
      </Button>
    </SearchInputStyled>
  );
}
