import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "app/App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(<App />);
