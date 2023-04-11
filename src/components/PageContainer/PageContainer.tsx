import React from "react";
import { PageContainerStyled } from "./PageContainer.styled";
import { PageContainerProps } from "./PageContainer.types";

export function PageContainer({ children }: PageContainerProps) {
  return <PageContainerStyled>{children}</PageContainerStyled>;
}
