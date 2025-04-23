import { queryClient } from "@/libs";
import { store } from "@/stores";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./NotificationsProvider";
import { ThemeProvider } from "./ThemeProvider";

export * from "./NotificationsProvider";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <BrowserRouter basename="/music">
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <NotificationsProvider>{children}</NotificationsProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};
