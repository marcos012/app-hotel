import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "../src/index.css";
import AppRoutes from "./routes/AppRoutes";
import { NotificationContainer } from "./components/shared";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NotificationContainer />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
