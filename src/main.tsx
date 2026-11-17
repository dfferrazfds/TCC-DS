import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource-variable/dm-sans";
import "@fontsource-variable/fraunces";
import App from "@/App";
import "@/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento #root não encontrado no documento.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
