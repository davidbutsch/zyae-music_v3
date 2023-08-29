import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "./ThemeProvider";
import { store } from "@/stores";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <BrowserRouter basename="/music">
      <ReduxProvider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};
