import { createRoot } from "react-dom/client";
import { App } from "./app";
import { ViewModelsProvider } from "mobx-view-model-react";
import { rootElement, vmStore } from "./shared/config";
import "./app.css";

createRoot(rootElement).render(
  <ViewModelsProvider value={vmStore}>
    <App />
  </ViewModelsProvider>
);
