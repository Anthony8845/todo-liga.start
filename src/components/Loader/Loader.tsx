import React from "react";
import { CircularProgress } from "@mui/material";
import { LoaderProps } from "./Loader.types";

export function Loader({ isLoading, children }: LoaderProps) {
  return isLoading ? <CircularProgress /> : <>{children}</>;
}
