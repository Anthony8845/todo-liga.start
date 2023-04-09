import React from "react";
import { LoaderProps } from "./Loader.types";

export function Loader({
  isLoading,
  children,
  variant = "circle",
}: LoaderProps) {
  const loaderClass =
    variant === "dot"
      ? "spinner-grow spinner-grow-sm my-3 align-self-center"
      : "spinner-border text-primary my-3 align-self-center";

  return isLoading ? (
    <div className={loaderClass} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>{children}</>
  );
}
